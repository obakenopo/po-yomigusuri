import { useState, useRef, useEffect } from "react";

const T = {
  night: "#181726",
  window: "#221F38",
  frame: "#F2EFFB",
  moon: "#BFB3E8",
  lamp: "#F0CE8C",
  paper: "#F6F1E0",
  ink: "#2E2B3E",
  mist: "#8E8AA8",
  stamp: "#C95A50",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');`;

const FRAGMENTS = [
  { ch: "だいいっしょう", text: "ぼく、いつから ここに いるんだっけ。…ひとつだけ、ずっと もってる ものが あるんだけど。…やっぱ なんでもない。" },
  { ch: "だいいっしょう", text: "ほんやさんに はいったこと ないのに、よるの ほんやさんの においを しってるんだ。へんだよね。なんでだろうね。" },
  { ch: "だいいっしょう", text: "これ、しおり。ぼくの たからもの。…どの ほんの しおりだったか、わすれちゃったんだけどね。" },
  { ch: "だいにしょう", text: "ゆうべ、ページを めくる おとの ゆめを みた。ゆめのなかで、だれかが ないてた。…ぼくだったのかも。" },
  { ch: "だいにしょう", text: "おもいだした。ぼくを うんだのは、だれかの ためいき。すごく つかれた、でも やさしい ためいき。…そのひとの かおは、まだ おもいだせない。" },
  { ch: "だいにしょう", text: "あのひと、まいばん おなじ ほんを よんでた きがする。さいごまで よんだのかな。…どうして ぼく、それが きになるんだろう。" },
  { ch: "だいさんしょう", text: "しおりの ことで、ひとつ おもいだした。これ、ぼくが もらったんじゃ ない。——あずかったんだ。" },
  { ch: "だいさんしょう", text: "あのひとは いってた。『これが おくすり』って、ほんを ゆびさして。…その ほんの なまえが、でてこない。のどまで でてるのに。" },
  { ch: "だいさんしょう", text: "あるよるから、あのひとの ためいきが きこえなくなった。…ねえ、きょうは ここまでに しよ。これいじょうは、まだ ぼくが むり。" },
  { ch: "だいよんしょう", text: "あのひとの さいごの ためいきは、かなしい ためいきじゃ なかった。なにかを ぼくに たのむみたいな…そう、たのまれたんだ。ぼく。" },
  { ch: "だいよんしょう", text: "おもいだした。『この しおりの つづきを、だれかに よんでもらって』——それが、あのひとの さいごの ことば。だから ぼくは、つかれた ひとの へやを まわってる。" },
  { ch: "さいしゅうしょう", text: "きみの ためいきが、あのひとのに にてたから、ぼくは この へやに きた。それでね…ずっと おもいだせなかった、しおりの ほんの なまえ。きのう、きみが ねたあとに、おもいだしたんだ。——こんど、その ほんを きみに しょほうする ね。" },
];

async function callPo(history) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  const raw = await res.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch (_) {
    throw new Error(`status ${res.status} / ${raw.slice(0, 120)}`);
  }
  if (data.error) {
    throw new Error(`status ${res.status} / ${data.error.message || "error"}`);
  }
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
  if (!text) throw new Error(`status ${res.status} / 中身が空`);

  const stripped = text.replace(/```json|```/g, "").trim();
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(stripped.slice(start, end + 1));
    } catch (_) {}
  }
  return { type: "message", text: stripped };
}

const STORE_KEY = "po-omoide";
function loadOmoide() {
  try {
    const r = localStorage.getItem(STORE_KEY);
    return r ? JSON.parse(r) : { visits: 0, unlocked: 0 };
  } catch (_) {
    return { visits: 0, unlocked: 0 };
  }
}
function saveOmoide(s) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch (_) {}
}

const PO_SPRITE = [
  "..oooooooo..",
  ".owwwwwwwwo.",
  "owwwwwwwwwwo",
  "owwwwwwwwwwo",
  "owwewwwwewwo",
  "owpwwoowwpwo",
  "owwwwwwwwwwo",
  "owwwwwwwwwwo",
  "owwwwwwwwwwo",
  "owwwwwwwwwwo",
  "owwoowwoowwo",
  ".oo..oo..oo.",
];
const PO_COLORS = { o: "#3A3650", w: "#F4F2FA", e: "#3A3650", p: "#EFB7BC" };

function PoDot({ px = 6, style = {} }) {
  const rects = [];
  PO_SPRITE.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c !== ".") {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PO_COLORS[c]} />);
      }
    });
  });
  return (
    <svg
      width={12 * px}
      height={12 * px}
      viewBox="0 0 12 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges", ...style }}
      aria-hidden
    >
      {rects}
    </svg>
  );
}

function Stars() {
  const stars = [
    [8, 12], [22, 30], [40, 8], [62, 18], [78, 6], [90, 26], [50, 34], [14, 44], [84, 46],
  ];
  return (
    <svg
      width="100%"
      height="120"
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, opacity: 0.7, pointerEvents: "none" }}
      aria-hidden
    >
      {stars.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={0.8}
          height={0.8}
          fill={i % 3 === 0 ? T.lamp : T.moon}
          style={{ animation: `blink ${2 + (i % 3)}s steps(2) infinite` }}
        />
      ))}
    </svg>
  );
}

const rpgWindow = {
  background: T.window,
  border: `3px solid ${T.frame}`,
  borderRadius: 2,
  boxShadow: `0 0 0 3px ${T.night}, 4px 4px 0 3px rgba(0,0,0,0.45)`,
};

function PrescriptionCard({ book, index }) {
  return (
    <div
      style={{
        background: T.paper,
        color: T.ink,
        border: `3px solid ${T.ink}`,
        borderRadius: 2,
        boxShadow: "4px 4px 0 rgba(0,0,0,0.45)",
        padding: "16px 14px 14px",
        position: "relative",
        animation: `rise .4s steps(4) ${index * 0.15}s both`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          border: `3px solid ${T.stamp}`,
          color: T.stamp,
          fontSize: 12,
          padding: "5px 4px",
          lineHeight: 1.2,
          writingMode: "vertical-rl",
          opacity: 0.9,
        }}
      >
        ぽー印
      </div>
      <div style={{ fontSize: 11, color: "#8B8470", marginBottom: 6 }}>
        ▼ よみぐすり だい{["いち", "に", "さん"][index]}ごう
      </div>
      <div style={{ fontSize: 17, lineHeight: 1.5, marginBottom: 2, paddingRight: 40 }}>{book.title}</div>
      <div style={{ fontSize: 12, color: "#76705F", marginBottom: 10 }}>{book.author}</div>
      <p style={{ fontSize: 13, lineHeight: 1.9, margin: "0 0 12px" }}>{book.reason}</p>
      <div style={{ borderTop: `2px dashed #BBB29A`, paddingTop: 8, display: "grid", gap: 4 }}>
        <div style={{ fontSize: 12 }}>
          <span style={{ color: "#8B8470", marginRight: 8 }}>のみかた</span>
          {book.dose}
        </div>
        <div style={{ fontSize: 12 }}>
          <span style={{ color: "#8B8470", marginRight: 8 }}>ききめ</span>
          {book.effect}
        </div>
      </div>
    </div>
  );
}

function KakeraCard({ index }) {
  const f = FRAGMENTS[index];
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #2A2740, #221F38)",
        border: `3px solid ${T.moon}`,
        borderRadius: 2,
        boxShadow: `4px 4px 0 rgba(0,0,0,0.45)`,
        padding: "16px 14px",
        animation: "rise .5s steps(4) .3s both",
      }}
    >
      <div style={{ textAlign: "center", color: T.lamp, fontSize: 12, marginBottom: 10, letterSpacing: "0.1em" }}>
        ＊おもいでの かけら {index + 1}／12 を みつけた！＊
      </div>
      <div style={{ fontSize: 11, color: T.mist, marginBottom: 6 }}>🔖 {f.ch}</div>
      <p style={{ fontSize: 13, lineHeight: 2.1, margin: 0, color: "#EAE7F4" }}>{f.text}</p>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("title");
  const [omoide, setOmoide] = useState({ visits: 0, unlocked: 0 });
  const [history, setHistory] = useState([]);
  const [feed, setFeed] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setOmoide(loadOmoide());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [feed, loading]);

  async function send(userText, baseHistory, baseFeed) {
    setLoading(true);
    setError(null);
    const newHistory = [...baseHistory, { role: "user", content: userText }];
    try {
      const reply = await callPo(newHistory);
      if (reply.type === "goodnight") {
        setHistory([...newHistory, { role: "assistant", content: JSON.stringify(reply) }]);
        setFeed([...baseFeed, { kind: "goodnight", text: reply.text }]);
        setDone(true);
      } else if (reply.type === "prescription") {
        setHistory([...newHistory, { role: "assistant", content: JSON.stringify(reply) }]);
        const items = [
          ...baseFeed,
          { kind: "ai", text: reply.intro || "これ、きみにきくとおもう…" },
          { kind: "rx", books: reply.books },
        ];
        if (omoide.unlocked < FRAGMENTS.length) {
          const next = { ...omoide, unlocked: omoide.unlocked + 1 };
          setOmoide(next);
          saveOmoide(next);
          items.push({ kind: "kakera", index: omoide.unlocked });
        }
        setFeed(items);
        setDone(true);
      } else {
        setHistory([...newHistory, { role: "assistant", content: JSON.stringify(reply) }]);
        setFeed([...baseFeed, { kind: "ai", text: reply.text }]);
      }
    } catch (e) {
      setError(`つながらなかったみたい…（${e.message}）もういちど「おくる」をおしてみて。`);
      setFeed(baseFeed);
      setInput(userText);
    }
    setLoading(false);
  }

  function handleStart() {
    const next = { ...omoide, visits: omoide.visits + 1 };
    setOmoide(next);
    saveOmoide(next);
    setScreen("chat");
    const opening =
      next.visits <= 1
        ? "…おかえり。はじめまして、かな。ぼく、ぽー。きみの へやに すんでる。ためいきは ぼくの ごはんだから、えんりょなく どうぞ。きょうは、どんな よるだった？"
        : next.visits >= 7
        ? `…おかえり。また きてくれたんだ。${next.visits}かいめの よるだね。きょうは どんな つかれ？`
        : `…おかえり。${next.visits}かいめの よるだね。きょうは どうだった？`;
    setHistory([
      { role: "assistant", content: JSON.stringify({ type: "message", text: opening }) },
    ]);
    setFeed([{ kind: "ai", text: opening }]);
    setDone(false);
  }

  function handleSend() {
    const text = input.trim();
    if (!text || loading || done) return;
    const newFeed = [...feed, { kind: "user", text }];
    setFeed(newFeed);
    setInput("");
    send(text, history, newFeed);
  }

  function backToTitle() {
    setScreen("title");
    setHistory([]);
    setFeed([]);
    setDone(false);
    setInput("");
    setError(null);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.night,
        color: "#EAE7F4",
        fontFamily: "'DotGothic16', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        @keyframes rise { from { opacity:0; transform: translateY(10px);} to { opacity:1; transform:none;} }
        @keyframes floatPx { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-6px);} }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:.15 } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
        textarea:focus, button:focus-visible { outline: 3px solid ${T.lamp}; outline-offset: 2px; }
      `}</style>

      <Stars />

      {screen === "title" && (
        <div style={{ maxWidth: 520, padding: "10vh 24px 60px", textAlign: "center", position: "relative" }}>
          <div style={{ animation: "floatPx 3s steps(3) infinite", marginBottom: 22, display: "inline-block" }}>
            <PoDot px={9} />
          </div>
          <h1 style={{ fontSize: 30, letterSpacing: "0.12em", margin: "0 0 16px", fontWeight: 400 }}>
            ぽーの よみぐすり
          </h1>
          <p style={{ color: T.mist, lineHeight: 2.2, fontSize: 13, margin: "0 0 34px" }}>
            きみの へやに すんでる おばけの ぽーが、
            <br />
            きょうの つかれに きく ほんを しょほうします。
            <br />
            ためいきは、ぽーの ごはんです。
          </p>
          <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
            <button
              onClick={handleStart}
              style={{
                ...rpgWindow,
                color: "#EAE7F4",
                padding: "13px 36px",
                fontSize: 15,
                letterSpacing: "0.1em",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <span style={{ color: T.lamp, marginRight: 10, animation: "blink 1.2s steps(2) infinite" }}>▶</span>
              でんきを けす
            </button>
            <button
              onClick={() => setScreen("drawer")}
              style={{
                ...rpgWindow,
                color: T.mist,
                padding: "11px 28px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              🔖 おもいでの ひきだし（{omoide.unlocked}／12）
            </button>
          </div>
          {omoide.visits > 0 && (
            <p style={{ color: T.mist, fontSize: 11, marginTop: 26 }}>
              ぽーと すごした よる：{omoide.visits}かい
            </p>
          )}
          <p style={{ color: "#4A4760", fontSize: 10, marginTop: 28, lineHeight: 1.8, maxWidth: 300, textAlign: "center" }}>
            本サービスは医療行為・心理療法ではありません。<br />
            こころの専門的なサポートが必要な方は<br />
            よりそいホットライン（0120-279-338）へ。
          </p>
        </div>
      )}

      {screen === "drawer" && (
        <div style={{ width: "100%", maxWidth: 560, padding: "28px 16px 60px", boxSizing: "border-box", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 14, letterSpacing: "0.18em", color: T.moon }}>
              − おもいでの ひきだし −
            </span>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {FRAGMENTS.map((f, i) =>
              i < omoide.unlocked ? (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px" }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>
                    🔖 かけら{i + 1}・{f.ch}
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 2, margin: 0 }}>{f.text}</p>
                </div>
              ) : (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px", opacity: 0.45 }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>かけら{i + 1}</div>
                  <p style={{ fontSize: 13, margin: 0, color: T.mist, letterSpacing: "0.3em" }}>？？？？？？</p>
                </div>
              )
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              onClick={() => setScreen("title")}
              style={{
                ...rpgWindow,
                color: T.mist,
                padding: "10px 26px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ◀ もどる
            </button>
          </div>
        </div>
      )}

      {screen === "chat" && (
        <div style={{ width: "100%", maxWidth: 560, padding: "24px 16px 120px", boxSizing: "border-box", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <span style={{ fontSize: 13, letterSpacing: "0.18em", color: T.moon }}>
              − ぽーの よみぐすり −
            </span>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {feed.map((m, i) =>
              m.kind === "rx" ? (
                <div key={i} style={{ display: "grid", gap: 16, marginTop: 6 }}>
                  {m.books.map((b, j) => (
                    <PrescriptionCard key={j} book={b} index={j} />
                  ))}
                </div>
              ) : m.kind === "goodnight" ? (
                <div key={i} style={{ display: "grid", gap: 14, justifyItems: "center", marginTop: 8 }}>
                  <div style={{ animation: "floatPx 3s steps(3) infinite" }}>
                    <PoDot px={5} />
                  </div>
                  <div style={{ ...rpgWindow, padding: "14px 18px", fontSize: 14, lineHeight: 2, textAlign: "center", maxWidth: 280 }}>
                    {m.text}
                  </div>
                  <div style={{ color: T.mist, fontSize: 11, letterSpacing: "0.1em" }}>
                    ＊ ぽーは てんじょうに かえりました ＊
                  </div>
                  <button
                    onClick={backToTitle}
                    style={{ ...rpgWindow, color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}
                  >
                    ▶ また あした くる
                  </button>
                </div>
              ) : m.kind === "kakera" ? (
                <div key={i} style={{ display: "grid", gap: 12 }}>
                  <KakeraCard index={m.index} />
                  <div style={{ textAlign: "center", color: T.mist, fontSize: 12, lineHeight: 1.9 }}>
                    おだいじに。ぼくは てんじょうに いるから。
                  </div>
                  <button
                    onClick={backToTitle}
                    style={{ ...rpgWindow, justifySelf: "center", color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    ▶ また あした くる
                  </button>
                </div>
              ) : (
                <div
                  key={i}
                  style={{ justifySelf: m.kind === "user" ? "end" : "start", display: "flex", alignItems: "flex-end", gap: 8, maxWidth: "90%" }}
                >
                  {m.kind === "ai" && (
                    <div style={{ flexShrink: 0, marginBottom: 2 }}>
                      <PoDot px={3.5} />
                    </div>
                  )}
                  <div
                    style={{
                      ...rpgWindow,
                      ...(m.kind === "user" ? { background: T.moon, color: "#2E2B3E", borderColor: "#2E2B3E" } : {}),
                      padding: "11px 14px",
                      fontSize: 13,
                      lineHeight: 2,
                      animation: "rise .3s steps(3) both",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              )
            )}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.mist, fontSize: 12 }}>
                <PoDot px={2.5} style={{ animation: "floatPx 2s steps(2) infinite" }} />
                ぽーが ほんだなを みてる
                <span style={{ animation: "blink 1s steps(2) infinite" }}>…</span>
              </div>
            )}
            {error && <div style={{ color: "#E8A199", fontSize: 12, lineHeight: 1.8 }}>{error}</div>}
            <div ref={bottomRef} />
          </div>

          {!done && (
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                padding: "14px 16px 20px",
                background: `linear-gradient(transparent, ${T.night} 40%)`,
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", gap: 10, width: "100%", maxWidth: 528 }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder="ためいきでも、ひとことでも…"
                  style={{
                    ...rpgWindow,
                    flex: 1,
                    resize: "none",
                    color: "#EAE7F4",
                    padding: "12px 14px",
                    fontSize: 13,
                    fontFamily: "inherit",
                    lineHeight: 1.6,
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  style={{
                    ...rpgWindow,
                    background: input.trim() && !loading ? T.lamp : T.window,
                    color: input.trim() && !loading ? "#3A3650" : T.mist,
                    borderColor: input.trim() && !loading ? "#3A3650" : T.frame,
                    padding: "0 18px",
                    fontSize: 13,
                    cursor: input.trim() && !loading ? "pointer" : "default",
                    fontFamily: "inherit",
                  }}
                >
                  おくる
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
