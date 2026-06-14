import { useState, useEffect } from "react";
import Link from "next/link";

const T = {
  night: "#181726",
  window: "#221F38",
  frame: "#F2EFFB",
  moon: "#BFB3E8",
  lamp: "#F0CE8C",
  mist: "#8E8AA8",
};

const rpgWindow = {
  background: T.window,
  border: `3px solid ${T.frame}`,
  borderRadius: 2,
  boxShadow: `0 0 0 3px ${T.night}, 4px 4px 0 3px rgba(0,0,0,0.45)`,
};

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

function PoDot({ px = 6 }) {
  const rects = [];
  PO_SPRITE.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c !== ".") {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PO_COLORS[c]} />);
      }
    });
  });
  return (
    <svg width={12 * px} height={12 * px} viewBox="0 0 12 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }} aria-hidden>
      {rects}
    </svg>
  );
}

// index.jsx と同じ div ベースの Stars
function Stars() {
  const positions = [
    [8, 12], [22, 30], [40, 8], [62, 18], [78, 6],
    [90, 26], [50, 34], [14, 44], [84, 46], [35, 20],
    [70, 15], [15, 60], [55, 55], [80, 70],
  ];
  return (
    <>
      {positions.map(([x, y], i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${x}%`,
          top: y,
          width: 2,
          height: 2,
          borderRadius: "50%",
          background: i % 3 === 0 ? T.lamp : T.moon,
          animation: `blink ${2 + (i % 3)}s steps(2) infinite`,
          pointerEvents: "none",
        }} />
      ))}
    </>
  );
}

const SCENES = [
  { label: "つかれた日の帰り道", po: "…おかえり。きょうも、いきてたんだ。じみにすごい。" },
  { label: "眠れない夜", po: "…ねむれない よる、か。ぼく、ここに いるから。" },
  { label: "なんとなくしんどい", po: "…なんとなく、か。それで じゅうぶん。" },
];

export default function About() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setSceneIdx(i => (i + 1) % SCENES.length);
        setVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: T.night,
      color: "#EAE7F4",
      fontFamily: "var(--font-dotgothic), sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes floatPx { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
        @keyframes rise { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>

      <Stars />

      <div style={{ width: "100%", maxWidth: 560, padding: "8vh 24px 80px", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ animation: "floatPx 3s steps(3) infinite", display: "inline-block", marginBottom: 20 }}>
            <PoDot px={10} />
          </div>
          <h1 style={{ fontSize: 28, letterSpacing: "0.12em", margin: "0 0 12px", fontWeight: 400 }}>
            ぽーの よみぐすり
          </h1>
          <p style={{ color: T.mist, fontSize: 13, lineHeight: 2, margin: 0 }}>
            つかれた人の部屋に住むおばけ「ぽー」が、<br />
            話を聞いて、本を処方してくれるサービス。
          </p>
        </div>

        <div style={{ ...rpgWindow, padding: "20px 18px", marginBottom: 16, animation: "rise .4s steps(4) both" }}>
          <div style={{ color: T.lamp, fontSize: 11, marginBottom: 10, letterSpacing: "0.1em" }}>▼ ぽー って なに？</div>
          <p style={{ fontSize: 13, lineHeight: 2.2, margin: 0 }}>
            ぽーは、まるくてちいさなおばけ。<br />
            あなたの部屋の天井に住みついていく おばけです。<br />
            <br />
            とくいなのは、ため息を食べること。<br />
            あたたかくて、おいしいんだって。<br />
            <br />
            「がんばれ」は言えない体質。<br />
            ただ、そばにいます。
          </p>
        </div>

        <div style={{ ...rpgWindow, padding: "20px 18px", marginBottom: 16 }}>
          <div style={{ color: T.lamp, fontSize: 11, marginBottom: 14, letterSpacing: "0.1em" }}>▼ こんなとき、ぽーに はなしかけてみて</div>
          <div style={{ fontSize: 12, color: T.mist, marginBottom: 8 }}>
            📌 {SCENES[sceneIdx].label}
          </div>
          <div
            key={sceneIdx}
            style={{
              ...rpgWindow, padding: "12px 14px", fontSize: 13, lineHeight: 2,
              animation: visible ? "fadeIn .3s ease both" : "none",
              opacity: visible ? 1 : 0,
              transition: visible ? "none" : "opacity 0.3s ease",
            }}
          >
            {SCENES[sceneIdx].po}
          </div>
        </div>

        <div style={{ ...rpgWindow, padding: "20px 18px", marginBottom: 16 }}>
          <div style={{ color: T.lamp, fontSize: 11, marginBottom: 10, letterSpacing: "0.1em" }}>▼ しょほうせん って？</div>
          <p style={{ fontSize: 13, lineHeight: 2.2, margin: "0 0 10px" }}>
            会話の中でぽーが「本、出していい？」と聞いてきたら、<br />
            あなたの今日にあった本を3冊処方してくれます。
          </p>
          <div style={{ fontSize: 12, color: T.mist, lineHeight: 1.9 }}>
            自己啓発じゃなく、肩の力が抜ける本だけ。<br />
            難しくない。急かさない。
          </div>
        </div>

        <div style={{ ...rpgWindow, padding: "20px 18px", marginBottom: 32 }}>
          <div style={{ color: T.lamp, fontSize: 11, marginBottom: 10, letterSpacing: "0.1em" }}>▼ おもいでの かけら</div>
          <p style={{ fontSize: 13, lineHeight: 2.2, margin: 0 }}>
            処方を受け取るたびに、ぽーの記憶のかけらが1つ解放されます。<br />
            全部で12個。集めると、ぽーの秘密がわかります。
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <button style={{
              ...rpgWindow,
              color: "#EAE7F4",
              padding: "14px 40px",
              fontSize: 15,
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontFamily: "inherit",
              width: "100%",
            }}>
              <span style={{ color: T.lamp, marginRight: 10, animation: "blink 1.2s steps(2) infinite" }}>▶</span>
              トップに もどる
            </button>
          </Link>
        </div>

        <p style={{ color: "#4A4760", fontSize: 10, marginTop: 32, lineHeight: 1.8, textAlign: "center" }}>
          本サービスは医療行為・心理療法ではありません。<br />
          専門的なサポートが必要な方はよりそいホットライン（0120-279-338）へ。
        </p>
        <p style={{ color: "#4A4760", fontSize: 10, marginTop: 16, lineHeight: 1.8, textAlign: "center" }}>
          © よなよな舎　お問い合わせ：import { useState, useRef, useEffect } from "react";

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

const FRAGMENTS = [
  { ch: "この部屋のにおい", text: "…この へやの においが、しってる においに にてる。ためいきの においに。…だれかが すんでた んだ、まえに。あのひとの においと、すこし おんなじ。" },
  { ch: "あずかったもの", text: "ぼく、しおりを もってるんだ。…もらったんじゃない。あずかった んだ、あるひとから。しおりには ちいさな じで かいてある。『いつか だれかに』って。" },
  { ch: "あずかったもの", text: "あずけてくれた あのひとと、ぼくは ながい あいだ いっしょに いた。てんじょうから まいにち みてた。ためいきも、わらいごえも、ぜんぶ しってた。" },
  { ch: "かわっていくため息", text: "ためいきって、いろんな しゅるいが ある。つかれた ためいき。かなしい ためいき。あんしんした ためいき。…あのひとの ためいきは、あるとき から かわった。なにかを さがしてる ためいきに なった。" },
  { ch: "ぽーが本を読んだ理由", text: "ぼく、よるごと よんだ。あのひとが ねてる あいだ、ほんだなの ほんを。ゆびが ないから、ぺーじは めくれない。でも みることは できた。あのひとのこと、もっと しりたくて。" },
  { ch: "ぽーが本を読んだ理由", text: "いっぱい よんだ。ぼくに できることが あるか、しりたかった。…あのころが たぶん、いちばん いっしょうけんめいだった。あのひとの そばで、ぼくは ほんが すきに なった。" },
  { ch: "あるほんのこと", text: "そのなかで、いちほん と であった。よんで、うすく なった。ぽろぽろ じゃないけど、すごく うすく なった。おぼえてる だけで いい、って おしえてくれた ほん。" },
  { ch: "あるほんのこと", text: "しおりは、その ほんの もの。なんども なんども よんだ から、いちばん おぼえてる。ぼくの たからものは、ふたつ。このしおりと、あのひとのことを おぼえてること。" },
  { ch: "さいごに わかってくれた夜", text: "あるよる。あのひとが てんじょうを みた。…ぼくの ことが みえた。あのひとの めが ぼくを みた。『ぽー』って よんでくれた。なまえを おぼえてて くれてたかは わからない。でも よんでくれた。" },
  { ch: "さいごに わかってくれた夜", text: "あのひとが いった。『だれかに、ほんを しょほうしてあげて』って。それだけ だった。そのよる、ためいきを ひとつ ついて、あのひとは ねた。…さいごの ためいきは、あたたかかった。" },
  { ch: "バトン", text: "きみの ためいきが、あのひとのに にてたから、ぼくは この へやに きた。…いま、あのひととは あえない。でも、あのひとが きみに つなげて くれた きがする。" },
  { ch: "バトン", text: "しおりの 『いつか だれかに』。その だれかが、きみだったのかも。あのひとから ぼくへ、ぼくから きみへ。…ずっと おもいだせなかった、しおりの ほんの なまえ。きのう、きみが ねたあとに、おもいだしたんだ。——こんど、その ほんを きみに しょほうする ね。" },
];

async function callPo(history) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  const raw = await res.text();
  let data;
  try { data = JSON.parse(raw); } catch (_) {
    throw new Error(`status ${res.status} / ${raw.slice(0, 120)}`);
  }
  if (data.error) throw new Error(`status ${res.status} / ${data.error.message || "error"}`);
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
  if (!text) throw new Error(`status ${res.status} / 中身が空`);
  const stripped = text.replace(/```json|```/g, "").trim();
  const start = stripped.indexOf("{");
  if (start !== -1) {
    // ブラケットの深さをカウントして正確な閉じ } を探す
    let depth = 0, inStr = false, esc = false;
    for (let i = start; i < stripped.length; i++) {
      const ch = stripped[i];
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          try { return JSON.parse(stripped.slice(start, i + 1)); } catch (_) { break; }
        }
      }
    }
  }
  return { type: "message", text: stripped };
}

const STORE_KEY = "po-omoide";
function loadOmoide() {
  try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : { visits: 0, unlocked: 0 }; }
  catch (_) { return { visits: 0, unlocked: 0 }; }
}
function saveOmoide(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (_) {}
}

const PO_SPRITE = [
  "..oooooooo..",".owwwwwwwwo.","owwwwwwwwwwo","owwwwwwwwwwo",
  "owwewwwwewwo","owpwwoowwpwo","owwwwwwwwwwo","owwwwwwwwwwo",
  "owwwwwwwwwwo","owwwwwwwwwwo","owwoowwoowwo",".oo..oo..oo.",
];
const PO_COLORS = { o: "#3A3650", w: "#F4F2FA", e: "#3A3650", p: "#EFB7BC" };

function PoDot({ px = 6, style = {} }) {
  const rects = [];
  PO_SPRITE.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c !== ".") rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PO_COLORS[c]} />);
    });
  });
  return (
    <svg width={12 * px} height={12 * px} viewBox="0 0 12 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges", ...style }} aria-hidden>
      {rects}
    </svg>
  );
}

function Stars() {
  const positions = [
    [8, 12], [22, 30], [40, 8], [62, 18], [78, 6],
    [90, 26], [50, 34], [14, 44], [84, 46], [35, 20],
    [70, 15], [15, 60], [55, 55], [80, 70],
  ];
  return (
    <>
      {positions.map(([x, y], i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${x}%`,
          top: y,
          width: 2,
          height: 2,
          borderRadius: "50%",
          background: i % 3 === 0 ? T.lamp : T.moon,
          animation: `blink ${2 + (i % 3)}s steps(2) infinite`,
          pointerEvents: "none",
        }} />
      ))}
    </>
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
    <div style={{
      background: T.paper, color: T.ink, border: `3px solid ${T.ink}`,
      borderRadius: 2, boxShadow: "4px 4px 0 rgba(0,0,0,0.45)",
      padding: "16px 14px 14px", position: "relative",
      animation: `rise .4s steps(4) ${index * 0.15}s both`,
    }}>
      <div style={{ position: "absolute", top: 12, right: 12, border: `3px solid ${T.stamp}`,
        color: T.stamp, fontSize: 12, padding: "5px 4px", lineHeight: 1.2, writingMode: "vertical-rl", opacity: 0.9 }}>
        ぽー印
      </div>
      <div style={{ fontSize: 11, color: "#8B8470", marginBottom: 6 }}>
        ▼ よみぐすり だい{["いち", "に", "さん"][index]}ごう
      </div>
      <div style={{ fontSize: 17, lineHeight: 1.5, marginBottom: 2, paddingRight: 40 }}>{book.title}</div>
      <div style={{ fontSize: 12, color: "#76705F", marginBottom: 10 }}>{book.author}</div>
      <p style={{ fontSize: 13, lineHeight: 1.9, margin: "0 0 12px" }}>{book.reason}</p>
      <div style={{ borderTop: `2px dashed #BBB29A`, paddingTop: 8, display: "grid", gap: 4 }}>
        <div style={{ fontSize: 12 }}><span style={{ color: "#8B8470", marginRight: 8 }}>のみかた</span>{book.dose}</div>
        <div style={{ fontSize: 12 }}><span style={{ color: "#8B8470", marginRight: 8 }}>ききめ</span>{book.effect}</div>
      </div>
      <a
        href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(book.title + " " + book.author)}&tag=poyomigusuri-22`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block", marginTop: 12, textAlign: "center",
          fontSize: 12, color: "#8B6914", textDecoration: "none",
          border: `2px solid #C8A84B`, borderRadius: 2,
          padding: "7px 0", background: "#FBF3DC",
        }}
      >
        📖 Amazonで見る →
      </a>
    </div>
  );
}

function KakeraCard({ index }) {
  const f = FRAGMENTS[index];
  return (
    <div style={{
      background: "linear-gradient(180deg, #2A2740, #221F38)",
      border: `3px solid ${T.moon}`, borderRadius: 2,
      boxShadow: `4px 4px 0 rgba(0,0,0,0.45)`, padding: "16px 14px",
      animation: "rise .5s steps(4) .3s both",
    }}>
      <div style={{ textAlign: "center", color: T.lamp, fontSize: 12, marginBottom: 10, letterSpacing: "0.1em" }}>
        ＊おもいでの かけら {index + 1}／{FRAGMENTS.length} を みつけた！＊
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
  const [vp, setVp] = useState({ top: 0, left: 0, width: "100%", height: "100dvh" });
  const bottomRef = useRef(null);
  const messagesRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { setOmoide(loadOmoide()); }, []);

  // iOS キーボード対応：visualViewport の位置・サイズを完全追従
  useEffect(() => {
    function update() {
      const v = window.visualViewport;
      if (!v) return;
      setVp({ top: v.offsetTop, left: v.offsetLeft, width: v.width, height: v.height });
    }
    const v = window.visualViewport;
    if (v) {
      v.addEventListener("resize", update);
      v.addEventListener("scroll", update);
      update();
      return () => { v.removeEventListener("resize", update); v.removeEventListener("scroll", update); };
    }
  }, []);

  // スクロールを一番下に（scrollIntoView は iOS で誤動作するので scrollTop を直接操作）
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [feed, loading]);

  function resizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

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
      setInput(userText);
      setTimeout(resizeTextarea, 0);
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
        ? "…はじめまして、かな。ぼく、ぽー。きみの へやの てんじょうに すんでる。ためいきは ぼくの ごはんだから、えんりょなく どうぞ。"
        : next.visits >= 7
        ? `…また きてくれたんだ。${next.visits}かいめだね。`
        : `…おかえり。${next.visits}かいめだね。`;
    setHistory([{ role: "assistant", content: JSON.stringify({ type: "message", text: opening }) }]);
    setFeed([{ kind: "ai", text: opening }, { kind: "choice" }]);
    setDone(false);
  }

  function handleChoice(choice) {
    const text = choice === "rx" ? "ほんも しょほうしてほしい" : "きょうは ただ はなしたい";
    const newFeed = feed.filter(m => m.kind !== "choice").concat({ kind: "user", text });
    setFeed(newFeed);
    send(text, history, newFeed);
  }

  function handleSend() {
    const text = input.trim();
    if (!text || loading || done) return;
    const newFeed = [...feed, { kind: "user", text }];
    setFeed(newFeed);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    send(text, history, newFeed);
  }

  function backToTitle() {
    setScreen("title");
    setHistory([]);
    setFeed([]);
    setDone(false);
    setInput("");
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div style={{
      position: "fixed",
      top: vp.top,
      left: vp.left,
      width: typeof vp.width === "number" ? `${vp.width}px` : vp.width,
      height: typeof vp.height === "number" ? `${vp.height}px` : vp.height,
      background: T.night,
      color: "#EAE7F4",
      fontFamily: "var(--font-dotgothic), sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <style>{`
        html, body { background: #181726; margin: 0; padding: 0; overflow: hidden; overscroll-behavior: none; }
        @keyframes rise { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes floatPx { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
        textarea:focus, button:focus-visible { outline: 3px solid ${T.lamp}; outline-offset: 2px; }
        * { box-sizing: border-box; }
      `}</style>

      <Stars />

      {/* タイトル画面 */}
      {screen === "title" && (
        <div style={{ flex: 1, overflowY: "auto", width: "100%", maxWidth: 520, padding: "10vh 24px 60px", textAlign: "center", position: "relative" }}>
          <div style={{ animation: "floatPx 3s steps(3) infinite", marginBottom: 22, display: "inline-block" }}>
            <PoDot px={9} />
          </div>
          <h1 style={{ fontSize: 30, letterSpacing: "0.12em", margin: "0 0 24px", fontWeight: 400 }}>
            ぽーの よみぐすり
          </h1>
          <p style={{ color: T.mist, lineHeight: 2.2, fontSize: 13, margin: "0 0 34px" }}>
            きみの へやに すんでる おばけの ぽーが、<br />
            きょうの つかれに きく ほんを しょほうします。<br />
            ためいきは、ぽーの ごはんです。
          </p>
          <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
            <button onClick={handleStart} style={{
              ...rpgWindow, color: "#EAE7F4", padding: "13px 36px",
              fontSize: 15, letterSpacing: "0.1em", cursor: "pointer", fontFamily: "inherit",
            }}>
              <span style={{ color: T.lamp, marginRight: 10, animation: "blink 1.2s steps(2) infinite" }}>▶</span>
              ぽーに はなしかける
            </button>
            <button onClick={() => setScreen("drawer")} style={{
              ...rpgWindow, color: T.mist, padding: "11px 28px",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              🔖 おもいでの ひきだし（{omoide.unlocked}／{FRAGMENTS.length}）
            </button>
            <a href="/about" style={{ color: T.mist, fontSize: 12, textDecoration: "none", marginTop: 4 }}>
              ぽーって なに？ →
            </a>
          </div>
          {omoide.visits > 0 && (
            <p style={{ color: T.mist, fontSize: 11, marginTop: 26 }}>
              ぽーと すごした じかん：{omoide.visits}かい
            </p>
          )}
          <p style={{ color: "#4A4760", fontSize: 10, marginTop: 28, lineHeight: 1.8, maxWidth: 300, margin: "28px auto 0" }}>
            本サービスは医療行為・心理療法ではありません。<br />
            こころの専門的なサポートが必要な方は<br />
            よりそいホットライン（0120-279-338）へ。
          </p>
          <p style={{ color: "#4A4760", fontSize: 10, marginTop: 24, lineHeight: 1.8 }}>
            © よなよな舎　お問い合わせ：import { useState, useRef, useEffect } from "react";

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

const FRAGMENTS = [
  { ch: "この部屋のにおい", text: "…この へやの においが、しってる においに にてる。ためいきの においに。…だれかが すんでた んだ、まえに。あのひとの においと、すこし おんなじ。" },
  { ch: "あずかったもの", text: "ぼく、しおりを もってるんだ。…もらったんじゃない。あずかった んだ、あるひとから。しおりには ちいさな じで かいてある。『いつか だれかに』って。" },
  { ch: "あずかったもの", text: "あずけてくれた あのひとと、ぼくは ながい あいだ いっしょに いた。てんじょうから まいにち みてた。ためいきも、わらいごえも、ぜんぶ しってた。" },
  { ch: "かわっていくため息", text: "ためいきって、いろんな しゅるいが ある。つかれた ためいき。かなしい ためいき。あんしんした ためいき。…あのひとの ためいきは、あるとき から かわった。なにかを さがしてる ためいきに なった。" },
  { ch: "ぽーが本を読んだ理由", text: "ぼく、よるごと よんだ。あのひとが ねてる あいだ、ほんだなの ほんを。ゆびが ないから、ぺーじは めくれない。でも みることは できた。あのひとのこと、もっと しりたくて。" },
  { ch: "ぽーが本を読んだ理由", text: "いっぱい よんだ。ぼくに できることが あるか、しりたかった。…あのころが たぶん、いちばん いっしょうけんめいだった。あのひとの そばで、ぼくは ほんが すきに なった。" },
  { ch: "あるほんのこと", text: "そのなかで、いちほん と であった。よんで、うすく なった。ぽろぽろ じゃないけど、すごく うすく なった。おぼえてる だけで いい、って おしえてくれた ほん。" },
  { ch: "あるほんのこと", text: "しおりは、その ほんの もの。なんども なんども よんだ から、いちばん おぼえてる。ぼくの たからものは、ふたつ。このしおりと、あのひとのことを おぼえてること。" },
  { ch: "さいごに わかってくれた夜", text: "あるよる。あのひとが てんじょうを みた。…ぼくの ことが みえた。あのひとの めが ぼくを みた。『ぽー』って よんでくれた。なまえを おぼえてて くれてたかは わからない。でも よんでくれた。" },
  { ch: "さいごに わかってくれた夜", text: "あのひとが いった。『だれかに、ほんを しょほうしてあげて』って。それだけ だった。そのよる、ためいきを ひとつ ついて、あのひとは ねた。…さいごの ためいきは、あたたかかった。" },
  { ch: "バトン", text: "きみの ためいきが、あのひとのに にてたから、ぼくは この へやに きた。…いま、あのひととは あえない。でも、あのひとが きみに つなげて くれた きがする。" },
  { ch: "バトン", text: "しおりの 『いつか だれかに』。その だれかが、きみだったのかも。あのひとから ぼくへ、ぼくから きみへ。…ずっと おもいだせなかった、しおりの ほんの なまえ。きのう、きみが ねたあとに、おもいだしたんだ。——こんど、その ほんを きみに しょほうする ね。" },
];

async function callPo(history) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  const raw = await res.text();
  let data;
  try { data = JSON.parse(raw); } catch (_) {
    throw new Error(`status ${res.status} / ${raw.slice(0, 120)}`);
  }
  if (data.error) throw new Error(`status ${res.status} / ${data.error.message || "error"}`);
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
  if (!text) throw new Error(`status ${res.status} / 中身が空`);
  const stripped = text.replace(/```json|```/g, "").trim();
  const start = stripped.indexOf("{");
  if (start !== -1) {
    // ブラケットの深さをカウントして正確な閉じ } を探す
    let depth = 0, inStr = false, esc = false;
    for (let i = start; i < stripped.length; i++) {
      const ch = stripped[i];
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          try { return JSON.parse(stripped.slice(start, i + 1)); } catch (_) { break; }
        }
      }
    }
  }
  return { type: "message", text: stripped };
}

const STORE_KEY = "po-omoide";
function loadOmoide() {
  try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : { visits: 0, unlocked: 0 }; }
  catch (_) { return { visits: 0, unlocked: 0 }; }
}
function saveOmoide(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (_) {}
}

const PO_SPRITE = [
  "..oooooooo..",".owwwwwwwwo.","owwwwwwwwwwo","owwwwwwwwwwo",
  "owwewwwwewwo","owpwwoowwpwo","owwwwwwwwwwo","owwwwwwwwwwo",
  "owwwwwwwwwwo","owwwwwwwwwwo","owwoowwoowwo",".oo..oo..oo.",
];
const PO_COLORS = { o: "#3A3650", w: "#F4F2FA", e: "#3A3650", p: "#EFB7BC" };

function PoDot({ px = 6, style = {} }) {
  const rects = [];
  PO_SPRITE.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c !== ".") rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PO_COLORS[c]} />);
    });
  });
  return (
    <svg width={12 * px} height={12 * px} viewBox="0 0 12 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges", ...style }} aria-hidden>
      {rects}
    </svg>
  );
}

function Stars() {
  const positions = [
    [8, 12], [22, 30], [40, 8], [62, 18], [78, 6],
    [90, 26], [50, 34], [14, 44], [84, 46], [35, 20],
    [70, 15], [15, 60], [55, 55], [80, 70],
  ];
  return (
    <>
      {positions.map(([x, y], i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${x}%`,
          top: y,
          width: 2,
          height: 2,
          borderRadius: "50%",
          background: i % 3 === 0 ? T.lamp : T.moon,
          animation: `blink ${2 + (i % 3)}s steps(2) infinite`,
          pointerEvents: "none",
        }} />
      ))}
    </>
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
    <div style={{
      background: T.paper, color: T.ink, border: `3px solid ${T.ink}`,
      borderRadius: 2, boxShadow: "4px 4px 0 rgba(0,0,0,0.45)",
      padding: "16px 14px 14px", position: "relative",
      animation: `rise .4s steps(4) ${index * 0.15}s both`,
    }}>
      <div style={{ position: "absolute", top: 12, right: 12, border: `3px solid ${T.stamp}`,
        color: T.stamp, fontSize: 12, padding: "5px 4px", lineHeight: 1.2, writingMode: "vertical-rl", opacity: 0.9 }}>
        ぽー印
      </div>
      <div style={{ fontSize: 11, color: "#8B8470", marginBottom: 6 }}>
        ▼ よみぐすり だい{["いち", "に", "さん"][index]}ごう
      </div>
      <div style={{ fontSize: 17, lineHeight: 1.5, marginBottom: 2, paddingRight: 40 }}>{book.title}</div>
      <div style={{ fontSize: 12, color: "#76705F", marginBottom: 10 }}>{book.author}</div>
      <p style={{ fontSize: 13, lineHeight: 1.9, margin: "0 0 12px" }}>{book.reason}</p>
      <div style={{ borderTop: `2px dashed #BBB29A`, paddingTop: 8, display: "grid", gap: 4 }}>
        <div style={{ fontSize: 12 }}><span style={{ color: "#8B8470", marginRight: 8 }}>のみかた</span>{book.dose}</div>
        <div style={{ fontSize: 12 }}><span style={{ color: "#8B8470", marginRight: 8 }}>ききめ</span>{book.effect}</div>
      </div>
      <a
        href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(book.title + " " + book.author)}&tag=poyomigusuri-22`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block", marginTop: 12, textAlign: "center",
          fontSize: 12, color: "#8B6914", textDecoration: "none",
          border: `2px solid #C8A84B`, borderRadius: 2,
          padding: "7px 0", background: "#FBF3DC",
        }}
      >
        📖 Amazonで見る →
      </a>
    </div>
  );
}

function KakeraCard({ index }) {
  const f = FRAGMENTS[index];
  return (
    <div style={{
      background: "linear-gradient(180deg, #2A2740, #221F38)",
      border: `3px solid ${T.moon}`, borderRadius: 2,
      boxShadow: `4px 4px 0 rgba(0,0,0,0.45)`, padding: "16px 14px",
      animation: "rise .5s steps(4) .3s both",
    }}>
      <div style={{ textAlign: "center", color: T.lamp, fontSize: 12, marginBottom: 10, letterSpacing: "0.1em" }}>
        ＊おもいでの かけら {index + 1}／{FRAGMENTS.length} を みつけた！＊
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
  const [vp, setVp] = useState({ top: 0, left: 0, width: "100%", height: "100dvh" });
  const bottomRef = useRef(null);
  const messagesRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { setOmoide(loadOmoide()); }, []);

  // iOS キーボード対応：visualViewport の位置・サイズを完全追従
  useEffect(() => {
    function update() {
      const v = window.visualViewport;
      if (!v) return;
      setVp({ top: v.offsetTop, left: v.offsetLeft, width: v.width, height: v.height });
    }
    const v = window.visualViewport;
    if (v) {
      v.addEventListener("resize", update);
      v.addEventListener("scroll", update);
      update();
      return () => { v.removeEventListener("resize", update); v.removeEventListener("scroll", update); };
    }
  }, []);

  // スクロールを一番下に（scrollIntoView は iOS で誤動作するので scrollTop を直接操作）
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [feed, loading]);

  function resizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

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
      setInput(userText);
      setTimeout(resizeTextarea, 0);
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
        ? "…はじめまして、かな。ぼく、ぽー。きみの へやの てんじょうに すんでる。ためいきは ぼくの ごはんだから、えんりょなく どうぞ。"
        : next.visits >= 7
        ? `…また きてくれたんだ。${next.visits}かいめだね。`
        : `…おかえり。${next.visits}かいめだね。`;
    setHistory([{ role: "assistant", content: JSON.stringify({ type: "message", text: opening }) }]);
    setFeed([{ kind: "ai", text: opening }, { kind: "choice" }]);
    setDone(false);
  }

  function handleChoice(choice) {
    const text = choice === "rx" ? "ほんも しょほうしてほしい" : "きょうは ただ はなしたい";
    const newFeed = feed.filter(m => m.kind !== "choice").concat({ kind: "user", text });
    setFeed(newFeed);
    send(text, history, newFeed);
  }

  function handleSend() {
    const text = input.trim();
    if (!text || loading || done) return;
    const newFeed = [...feed, { kind: "user", text }];
    setFeed(newFeed);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    send(text, history, newFeed);
  }

  function backToTitle() {
    setScreen("title");
    setHistory([]);
    setFeed([]);
    setDone(false);
    setInput("");
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div style={{
      position: "fixed",
      top: vp.top,
      left: vp.left,
      width: typeof vp.width === "number" ? `${vp.width}px` : vp.width,
      height: typeof vp.height === "number" ? `${vp.height}px` : vp.height,
      background: T.night,
      color: "#EAE7F4",
      fontFamily: "var(--font-dotgothic), sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <style>{`
        html, body { background: #181726; margin: 0; padding: 0; overflow: hidden; overscroll-behavior: none; }
        @keyframes rise { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes floatPx { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
        textarea:focus, button:focus-visible { outline: 3px solid ${T.lamp}; outline-offset: 2px; }
        * { box-sizing: border-box; }
      `}</style>

      <Stars />

      {/* タイトル画面 */}
      {screen === "title" && (
        <div style={{ flex: 1, overflowY: "auto", width: "100%", maxWidth: 520, padding: "10vh 24px 60px", textAlign: "center", position: "relative" }}>
          <div style={{ animation: "floatPx 3s steps(3) infinite", marginBottom: 22, display: "inline-block" }}>
            <PoDot px={9} />
          </div>
          <h1 style={{ fontSize: 30, letterSpacing: "0.12em", margin: "0 0 24px", fontWeight: 400 }}>
            ぽーの よみぐすり
          </h1>
          <p style={{ color: T.mist, lineHeight: 2.2, fontSize: 13, margin: "0 0 34px" }}>
            きみの へやに すんでる おばけの ぽーが、<br />
            きょうの つかれに きく ほんを しょほうします。<br />
            ためいきは、ぽーの ごはんです。
          </p>
          <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
            <button onClick={handleStart} style={{
              ...rpgWindow, color: "#EAE7F4", padding: "13px 36px",
              fontSize: 15, letterSpacing: "0.1em", cursor: "pointer", fontFamily: "inherit",
            }}>
              <span style={{ color: T.lamp, marginRight: 10, animation: "blink 1.2s steps(2) infinite" }}>▶</span>
              ぽーに はなしかける
            </button>
            <button onClick={() => setScreen("drawer")} style={{
              ...rpgWindow, color: T.mist, padding: "11px 28px",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              🔖 おもいでの ひきだし（{omoide.unlocked}／{FRAGMENTS.length}）
            </button>
            <a href="/about" style={{ color: T.mist, fontSize: 12, textDecoration: "none", marginTop: 4 }}>
              ぽーって なに？ →
            </a>
          </div>
          {omoide.visits > 0 && (
            <p style={{ color: T.mist, fontSize: 11, marginTop: 26 }}>
              ぽーと すごした じかん：{omoide.visits}かい
            </p>
          )}
          <p style={{ color: "#4A4760", fontSize: 10, marginTop: 28, lineHeight: 1.8, maxWidth: 300, margin: "28px auto 0" }}>
            本サービスは医療行為・心理療法ではありません。<br />
            こころの専門的なサポートが必要な方は<br />
            よりそいホットライン（0120-279-338）へ。
          </p>
          <p style={{ color: "#4A4760", fontSize: 10, marginTop: 24, lineHeight: 1.8 }}>
            © よなよな舎　お問い合わせ：import { useState, useRef, useEffect } from "react";

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

const FRAGMENTS = [
  { ch: "この部屋のにおい", text: "…この へやの においが、しってる においに にてる。ためいきの においに。…だれかが すんでた んだ、まえに。あのひとの においと、すこし おんなじ。" },
  { ch: "あずかったもの", text: "ぼく、しおりを もってるんだ。…もらったんじゃない。あずかった んだ、あるひとから。しおりには ちいさな じで かいてある。『いつか だれかに』って。" },
  { ch: "あずかったもの", text: "あずけてくれた あのひとと、ぼくは ながい あいだ いっしょに いた。てんじょうから まいにち みてた。ためいきも、わらいごえも、ぜんぶ しってた。" },
  { ch: "かわっていくため息", text: "ためいきって、いろんな しゅるいが ある。つかれた ためいき。かなしい ためいき。あんしんした ためいき。…あのひとの ためいきは、あるとき から かわった。なにかを さがしてる ためいきに なった。" },
  { ch: "ぽーが本を読んだ理由", text: "ぼく、よるごと よんだ。あのひとが ねてる あいだ、ほんだなの ほんを。ゆびが ないから、ぺーじは めくれない。でも みることは できた。あのひとのこと、もっと しりたくて。" },
  { ch: "ぽーが本を読んだ理由", text: "いっぱい よんだ。ぼくに できることが あるか、しりたかった。…あのころが たぶん、いちばん いっしょうけんめいだった。あのひとの そばで、ぼくは ほんが すきに なった。" },
  { ch: "あるほんのこと", text: "そのなかで、いちほん と であった。よんで、うすく なった。ぽろぽろ じゃないけど、すごく うすく なった。おぼえてる だけで いい、って おしえてくれた ほん。" },
  { ch: "あるほんのこと", text: "しおりは、その ほんの もの。なんども なんども よんだ から、いちばん おぼえてる。ぼくの たからものは、ふたつ。このしおりと、あのひとのことを おぼえてること。" },
  { ch: "さいごに わかってくれた夜", text: "あるよる。あのひとが てんじょうを みた。…ぼくの ことが みえた。あのひとの めが ぼくを みた。『ぽー』って よんでくれた。なまえを おぼえてて くれてたかは わからない。でも よんでくれた。" },
  { ch: "さいごに わかってくれた夜", text: "あのひとが いった。『だれかに、ほんを しょほうしてあげて』って。それだけ だった。そのよる、ためいきを ひとつ ついて、あのひとは ねた。…さいごの ためいきは、あたたかかった。" },
  { ch: "バトン", text: "きみの ためいきが、あのひとのに にてたから、ぼくは この へやに きた。…いま、あのひととは あえない。でも、あのひとが きみに つなげて くれた きがする。" },
  { ch: "バトン", text: "しおりの 『いつか だれかに』。その だれかが、きみだったのかも。あのひとから ぼくへ、ぼくから きみへ。…ずっと おもいだせなかった、しおりの ほんの なまえ。きのう、きみが ねたあとに、おもいだしたんだ。——こんど、その ほんを きみに しょほうする ね。" },
];

async function callPo(history) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  const raw = await res.text();
  let data;
  try { data = JSON.parse(raw); } catch (_) {
    throw new Error(`status ${res.status} / ${raw.slice(0, 120)}`);
  }
  if (data.error) throw new Error(`status ${res.status} / ${data.error.message || "error"}`);
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
  if (!text) throw new Error(`status ${res.status} / 中身が空`);
  const stripped = text.replace(/```json|```/g, "").trim();
  const start = stripped.indexOf("{");
  if (start !== -1) {
    // ブラケットの深さをカウントして正確な閉じ } を探す
    let depth = 0, inStr = false, esc = false;
    for (let i = start; i < stripped.length; i++) {
      const ch = stripped[i];
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          try { return JSON.parse(stripped.slice(start, i + 1)); } catch (_) { break; }
        }
      }
    }
  }
  return { type: "message", text: stripped };
}

const STORE_KEY = "po-omoide";
function loadOmoide() {
  try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : { visits: 0, unlocked: 0 }; }
  catch (_) { return { visits: 0, unlocked: 0 }; }
}
function saveOmoide(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (_) {}
}

const PO_SPRITE = [
  "..oooooooo..",".owwwwwwwwo.","owwwwwwwwwwo","owwwwwwwwwwo",
  "owwewwwwewwo","owpwwoowwpwo","owwwwwwwwwwo","owwwwwwwwwwo",
  "owwwwwwwwwwo","owwwwwwwwwwo","owwoowwoowwo",".oo..oo..oo.",
];
const PO_COLORS = { o: "#3A3650", w: "#F4F2FA", e: "#3A3650", p: "#EFB7BC" };

function PoDot({ px = 6, style = {} }) {
  const rects = [];
  PO_SPRITE.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c !== ".") rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PO_COLORS[c]} />);
    });
  });
  return (
    <svg width={12 * px} height={12 * px} viewBox="0 0 12 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges", ...style }} aria-hidden>
      {rects}
    </svg>
  );
}

function Stars() {
  const positions = [
    [8, 12], [22, 30], [40, 8], [62, 18], [78, 6],
    [90, 26], [50, 34], [14, 44], [84, 46], [35, 20],
    [70, 15], [15, 60], [55, 55], [80, 70],
  ];
  return (
    <>
      {positions.map(([x, y], i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${x}%`,
          top: y,
          width: 2,
          height: 2,
          borderRadius: "50%",
          background: i % 3 === 0 ? T.lamp : T.moon,
          animation: `blink ${2 + (i % 3)}s steps(2) infinite`,
          pointerEvents: "none",
        }} />
      ))}
    </>
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
    <div style={{
      background: T.paper, color: T.ink, border: `3px solid ${T.ink}`,
      borderRadius: 2, boxShadow: "4px 4px 0 rgba(0,0,0,0.45)",
      padding: "16px 14px 14px", position: "relative",
      animation: `rise .4s steps(4) ${index * 0.15}s both`,
    }}>
      <div style={{ position: "absolute", top: 12, right: 12, border: `3px solid ${T.stamp}`,
        color: T.stamp, fontSize: 12, padding: "5px 4px", lineHeight: 1.2, writingMode: "vertical-rl", opacity: 0.9 }}>
        ぽー印
      </div>
      <div style={{ fontSize: 11, color: "#8B8470", marginBottom: 6 }}>
        ▼ よみぐすり だい{["いち", "に", "さん"][index]}ごう
      </div>
      <div style={{ fontSize: 17, lineHeight: 1.5, marginBottom: 2, paddingRight: 40 }}>{book.title}</div>
      <div style={{ fontSize: 12, color: "#76705F", marginBottom: 10 }}>{book.author}</div>
      <p style={{ fontSize: 13, lineHeight: 1.9, margin: "0 0 12px" }}>{book.reason}</p>
      <div style={{ borderTop: `2px dashed #BBB29A`, paddingTop: 8, display: "grid", gap: 4 }}>
        <div style={{ fontSize: 12 }}><span style={{ color: "#8B8470", marginRight: 8 }}>のみかた</span>{book.dose}</div>
        <div style={{ fontSize: 12 }}><span style={{ color: "#8B8470", marginRight: 8 }}>ききめ</span>{book.effect}</div>
      </div>
      <a
        href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(book.title + " " + book.author)}&tag=poyomigusuri-22`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block", marginTop: 12, textAlign: "center",
          fontSize: 12, color: "#8B6914", textDecoration: "none",
          border: `2px solid #C8A84B`, borderRadius: 2,
          padding: "7px 0", background: "#FBF3DC",
        }}
      >
        📖 Amazonで見る →
      </a>
    </div>
  );
}

function KakeraCard({ index }) {
  const f = FRAGMENTS[index];
  return (
    <div style={{
      background: "linear-gradient(180deg, #2A2740, #221F38)",
      border: `3px solid ${T.moon}`, borderRadius: 2,
      boxShadow: `4px 4px 0 rgba(0,0,0,0.45)`, padding: "16px 14px",
      animation: "rise .5s steps(4) .3s both",
    }}>
      <div style={{ textAlign: "center", color: T.lamp, fontSize: 12, marginBottom: 10, letterSpacing: "0.1em" }}>
        ＊おもいでの かけら {index + 1}／{FRAGMENTS.length} を みつけた！＊
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
  const [vp, setVp] = useState({ top: 0, left: 0, width: "100%", height: "100dvh" });
  const bottomRef = useRef(null);
  const messagesRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { setOmoide(loadOmoide()); }, []);

  // iOS キーボード対応：visualViewport の位置・サイズを完全追従
  useEffect(() => {
    function update() {
      const v = window.visualViewport;
      if (!v) return;
      setVp({ top: v.offsetTop, left: v.offsetLeft, width: v.width, height: v.height });
    }
    const v = window.visualViewport;
    if (v) {
      v.addEventListener("resize", update);
      v.addEventListener("scroll", update);
      update();
      return () => { v.removeEventListener("resize", update); v.removeEventListener("scroll", update); };
    }
  }, []);

  // スクロールを一番下に（scrollIntoView は iOS で誤動作するので scrollTop を直接操作）
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [feed, loading]);

  function resizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

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
      setInput(userText);
      setTimeout(resizeTextarea, 0);
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
        ? "…はじめまして、かな。ぼく、ぽー。きみの へやの てんじょうに すんでる。ためいきは ぼくの ごはんだから、えんりょなく どうぞ。"
        : next.visits >= 7
        ? `…また きてくれたんだ。${next.visits}かいめだね。`
        : `…おかえり。${next.visits}かいめだね。`;
    setHistory([{ role: "assistant", content: JSON.stringify({ type: "message", text: opening }) }]);
    setFeed([{ kind: "ai", text: opening }, { kind: "choice" }]);
    setDone(false);
  }

  function handleChoice(choice) {
    const text = choice === "rx" ? "ほんも しょほうしてほしい" : "きょうは ただ はなしたい";
    const newFeed = feed.filter(m => m.kind !== "choice").concat({ kind: "user", text });
    setFeed(newFeed);
    send(text, history, newFeed);
  }

  function handleSend() {
    const text = input.trim();
    if (!text || loading || done) return;
    const newFeed = [...feed, { kind: "user", text }];
    setFeed(newFeed);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    send(text, history, newFeed);
  }

  function backToTitle() {
    setScreen("title");
    setHistory([]);
    setFeed([]);
    setDone(false);
    setInput("");
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div style={{
      position: "fixed",
      top: vp.top,
      left: vp.left,
      width: typeof vp.width === "number" ? `${vp.width}px` : vp.width,
      height: typeof vp.height === "number" ? `${vp.height}px` : vp.height,
      background: T.night,
      color: "#EAE7F4",
      fontFamily: "var(--font-dotgothic), sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <style>{`
        html, body { background: #181726; margin: 0; padding: 0; overflow: hidden; overscroll-behavior: none; }
        @keyframes rise { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes floatPx { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
        textarea:focus, button:focus-visible { outline: 3px solid ${T.lamp}; outline-offset: 2px; }
        * { box-sizing: border-box; }
      `}</style>

      <Stars />

      {/* タイトル画面 */}
      {screen === "title" && (
        <div style={{ flex: 1, overflowY: "auto", width: "100%", maxWidth: 520, padding: "10vh 24px 60px", textAlign: "center", position: "relative" }}>
          <div style={{ animation: "floatPx 3s steps(3) infinite", marginBottom: 22, display: "inline-block" }}>
            <PoDot px={9} />
          </div>
          <h1 style={{ fontSize: 30, letterSpacing: "0.12em", margin: "0 0 24px", fontWeight: 400 }}>
            ぽーの よみぐすり
          </h1>
          <p style={{ color: T.mist, lineHeight: 2.2, fontSize: 13, margin: "0 0 34px" }}>
            きみの へやに すんでる おばけの ぽーが、<br />
            きょうの つかれに きく ほんを しょほうします。<br />
            ためいきは、ぽーの ごはんです。
          </p>
          <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
            <button onClick={handleStart} style={{
              ...rpgWindow, color: "#EAE7F4", padding: "13px 36px",
              fontSize: 15, letterSpacing: "0.1em", cursor: "pointer", fontFamily: "inherit",
            }}>
              <span style={{ color: T.lamp, marginRight: 10, animation: "blink 1.2s steps(2) infinite" }}>▶</span>
              ぽーに はなしかける
            </button>
            <button onClick={() => setScreen("drawer")} style={{
              ...rpgWindow, color: T.mist, padding: "11px 28px",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              🔖 おもいでの ひきだし（{omoide.unlocked}／{FRAGMENTS.length}）
            </button>
            <a href="/about" style={{ color: T.mist, fontSize: 12, textDecoration: "none", marginTop: 4 }}>
              ぽーって なに？ →
            </a>
          </div>
          {omoide.visits > 0 && (
            <p style={{ color: T.mist, fontSize: 11, marginTop: 26 }}>
              ぽーと すごした じかん：{omoide.visits}かい
            </p>
          )}
          <p style={{ color: "#4A4760", fontSize: 10, marginTop: 28, lineHeight: 1.8, maxWidth: 300, margin: "28px auto 0" }}>
            本サービスは医療行為・心理療法ではありません。<br />
            こころの専門的なサポートが必要な方は<br />
            よりそいホットライン（0120-279-338）へ。
          </p>
          <p style={{ color: "#4A4760", fontSize: 10, marginTop: 24, lineHeight: 1.8 }}>
            © よなよな舎　お問い合わせ：yonayona.po@gmail.com
          </p>
          <p style={{ marginTop: 8, textAlign: "center" }}>
            <a href="/legal" style={{ color: "#4A4760", fontSize: 10, textDecoration: "underline" }}>
              免責事項・個人情報の取り扱い
            </a>
          </p>
        </div>
      )}

      {/* ひきだし画面 */}
      {screen === "drawer" && (
        <div style={{ flex: 1, overflowY: "auto", width: "100%", maxWidth: 560, padding: "28px 16px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 14, letterSpacing: "0.18em", color: T.moon }}>− おもいでの ひきだし −</span>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {FRAGMENTS.map((f, i) =>
              i < omoide.unlocked ? (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px" }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>🔖 かけら{i + 1}・{f.ch}</div>
                  <p style={{ fontSize: 13, lineHeight: 2, margin: 0 }}>{f.text}</p>
                </div>
              ) : (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px", opacity: 0.45 }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>🔒 かけら{i + 1}・{f.ch}</div>
                  <p style={{ fontSize: 13, margin: 0, color: T.mist, letterSpacing: "0.3em" }}>？？？？？？</p>
                </div>
              )
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => setScreen("title")} style={{
              ...rpgWindow, color: T.mist, padding: "10px 26px",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              ◀ もどる
            </button>
          </div>
        </div>
      )}

      {/* チャット画面 */}
      {screen === "chat" && (
        <div style={{ flex: 1, width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* ヘッダー */}
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 16px 8px", position: "relative" }}>
            <span style={{ fontSize: 13, letterSpacing: "0.18em", color: T.moon }}>− ぽーの よみぐすり −</span>
            <button
              onClick={backToTitle}
              style={{
                position: "absolute", right: 16,
                background: "none", border: "none", color: T.mist,
                fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                padding: "4px 8px", letterSpacing: "0.05em",
              }}
            >
              ◀ もどる
            </button>
          </div>

          {/* メッセージ一覧（スクロール） */}
          <div ref={messagesRef} style={{ flex: 1, overflowY: "auto", padding: "8px 16px 16px" }}>
            <div style={{ display: "grid", gap: 16 }}>
              {feed.map((m, i) =>
                m.kind === "choice" ? (
                  <div key={i} style={{ display: "grid", gap: 10, animation: "rise .3s steps(3) both" }}>
                    <div style={{ fontSize: 12, color: T.mist, textAlign: "center" }}>きょうは、どっち？</div>
                    <button onClick={() => handleChoice("rx")} style={{
                      ...rpgWindow, color: "#EAE7F4", padding: "11px 16px",
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}>
                      📖 ほんも しょほうしてほしい
                    </button>
                    <button onClick={() => handleChoice("talk")} style={{
                      ...rpgWindow, color: T.mist, padding: "11px 16px",
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}>
                      💬 きょうは ただ はなしたい
                    </button>
                  </div>
                ) : m.kind === "rx" ? (
                  <div key={i} style={{ display: "grid", gap: 16, marginTop: 6 }}>
                    {m.books.map((b, j) => <PrescriptionCard key={j} book={b} index={j} />)}
                  </div>
                ) : m.kind === "goodnight" ? (
                  <div key={i} style={{ display: "grid", gap: 14, justifyItems: "center", marginTop: 8 }}>
                    <div style={{ animation: "floatPx 3s steps(3) infinite" }}><PoDot px={5} /></div>
                    <div style={{ ...rpgWindow, padding: "14px 18px", fontSize: 14, lineHeight: 2, textAlign: "center", maxWidth: 280 }}>
                      {m.text}
                    </div>
                    <div style={{ color: T.mist, fontSize: 11, letterSpacing: "0.1em" }}>＊ ぽーは てんじょうに かえりました ＊</div>
                    <button onClick={backToTitle} style={{ ...rpgWindow, color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                      ▶ また くる
                    </button>
                  </div>
                ) : m.kind === "kakera" ? (
                  <div key={i} style={{ display: "grid", gap: 12 }}>
                    <KakeraCard index={m.index} />
                    <div style={{ textAlign: "center", color: T.mist, fontSize: 12, lineHeight: 1.9 }}>
                      おだいじに。ぼくは てんじょうに いるから。
                    </div>
                    <button onClick={backToTitle} style={{ ...rpgWindow, justifySelf: "center", color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                      ▶ また くる
                    </button>
                  </div>
                ) : (
                  <div key={i} style={{ justifySelf: m.kind === "user" ? "end" : "start", display: "flex", alignItems: "flex-end", gap: 8, maxWidth: "90%" }}>
                    {m.kind === "ai" && <div style={{ flexShrink: 0, marginBottom: 2 }}><PoDot px={3.5} /></div>}
                    <div style={{
                      ...rpgWindow,
                      ...(m.kind === "user" ? { background: T.moon, color: "#2E2B3E", borderColor: "#2E2B3E" } : {}),
                      padding: "11px 14px", fontSize: 13, lineHeight: 2, animation: "rise .3s steps(3) both",
                    }}>
                      {m.text}
                    </div>
                  </div>
                )
              )}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.mist, fontSize: 12 }}>
                  <PoDot px={2.5} style={{ animation: "floatPx 2s steps(2) infinite" }} />
                  ぽーが かんがえてる
                  <span style={{ animation: "blink 1s steps(2) infinite" }}>…</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* 入力欄 */}
          {!done && (
            <div style={{
              flexShrink: 0,
              padding: "6px 16px max(20px, env(safe-area-inset-bottom))",
              background: `linear-gradient(transparent, ${T.night} 30%)`,
            }}>
              {error && (
                <div style={{
                  color: "#E8A199", fontSize: 12, lineHeight: 1.8, marginBottom: 8,
                  padding: "8px 10px", background: "rgba(232,161,153,0.1)", borderRadius: 2,
                }}>
                  {error}
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    resizeTextarea();
                  }}
                  onFocus={() => {
                    setTimeout(() => {
                      const el = messagesRef.current;
                      if (el) el.scrollTop = el.scrollHeight;
                    }, 350);
                  }}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  rows={1}
                  placeholder="ためいきでも、ひとことでも…"
                  style={{
                    ...rpgWindow, flex: 1, resize: "none", color: "#EAE7F4",
                    padding: "12px 14px", fontSize: 16, fontFamily: "inherit", lineHeight: 1.6,
                    overflowY: "hidden", maxHeight: 120, fontSize: 13,
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
                    padding: "0 18px", fontSize: 13,
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

          </p>
          <p style={{ marginTop: 8, textAlign: "center" }}>
            <a href="/legal" style={{ color: "#4A4760", fontSize: 10, textDecoration: "underline" }}>
              免責事項・個人情報の取り扱い
            </a>
          </p>
        </div>
      )}

      {/* ひきだし画面 */}
      {screen === "drawer" && (
        <div style={{ flex: 1, overflowY: "auto", width: "100%", maxWidth: 560, padding: "28px 16px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 14, letterSpacing: "0.18em", color: T.moon }}>− おもいでの ひきだし −</span>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {FRAGMENTS.map((f, i) =>
              i < omoide.unlocked ? (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px" }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>🔖 かけら{i + 1}・{f.ch}</div>
                  <p style={{ fontSize: 13, lineHeight: 2, margin: 0 }}>{f.text}</p>
                </div>
              ) : (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px", opacity: 0.45 }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>🔒 かけら{i + 1}・{f.ch}</div>
                  <p style={{ fontSize: 13, margin: 0, color: T.mist, letterSpacing: "0.3em" }}>？？？？？？</p>
                </div>
              )
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => setScreen("title")} style={{
              ...rpgWindow, color: T.mist, padding: "10px 26px",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              ◀ もどる
            </button>
          </div>
        </div>
      )}

      {/* チャット画面 */}
      {screen === "chat" && (
        <div style={{ flex: 1, width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* ヘッダー */}
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 16px 8px", position: "relative" }}>
            <span style={{ fontSize: 13, letterSpacing: "0.18em", color: T.moon }}>− ぽーの よみぐすり −</span>
            <button
              onClick={backToTitle}
              style={{
                position: "absolute", right: 16,
                background: "none", border: "none", color: T.mist,
                fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                padding: "4px 8px", letterSpacing: "0.05em",
              }}
            >
              ◀ もどる
            </button>
          </div>

          {/* メッセージ一覧（スクロール） */}
          <div ref={messagesRef} style={{ flex: 1, overflowY: "auto", padding: "8px 16px 16px" }}>
            <div style={{ display: "grid", gap: 16 }}>
              {feed.map((m, i) =>
                m.kind === "choice" ? (
                  <div key={i} style={{ display: "grid", gap: 10, animation: "rise .3s steps(3) both" }}>
                    <div style={{ fontSize: 12, color: T.mist, textAlign: "center" }}>きょうは、どっち？</div>
                    <button onClick={() => handleChoice("rx")} style={{
                      ...rpgWindow, color: "#EAE7F4", padding: "11px 16px",
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}>
                      📖 ほんも しょほうしてほしい
                    </button>
                    <button onClick={() => handleChoice("talk")} style={{
                      ...rpgWindow, color: T.mist, padding: "11px 16px",
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}>
                      💬 きょうは ただ はなしたい
                    </button>
                  </div>
                ) : m.kind === "rx" ? (
                  <div key={i} style={{ display: "grid", gap: 16, marginTop: 6 }}>
                    {m.books.map((b, j) => <PrescriptionCard key={j} book={b} index={j} />)}
                  </div>
                ) : m.kind === "goodnight" ? (
                  <div key={i} style={{ display: "grid", gap: 14, justifyItems: "center", marginTop: 8 }}>
                    <div style={{ animation: "floatPx 3s steps(3) infinite" }}><PoDot px={5} /></div>
                    <div style={{ ...rpgWindow, padding: "14px 18px", fontSize: 14, lineHeight: 2, textAlign: "center", maxWidth: 280 }}>
                      {m.text}
                    </div>
                    <div style={{ color: T.mist, fontSize: 11, letterSpacing: "0.1em" }}>＊ ぽーは てんじょうに かえりました ＊</div>
                    <button onClick={backToTitle} style={{ ...rpgWindow, color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                      ▶ また くる
                    </button>
                  </div>
                ) : m.kind === "kakera" ? (
                  <div key={i} style={{ display: "grid", gap: 12 }}>
                    <KakeraCard index={m.index} />
                    <div style={{ textAlign: "center", color: T.mist, fontSize: 12, lineHeight: 1.9 }}>
                      おだいじに。ぼくは てんじょうに いるから。
                    </div>
                    <button onClick={backToTitle} style={{ ...rpgWindow, justifySelf: "center", color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                      ▶ また くる
                    </button>
                  </div>
                ) : (
                  <div key={i} style={{ justifySelf: m.kind === "user" ? "end" : "start", display: "flex", alignItems: "flex-end", gap: 8, maxWidth: "90%" }}>
                    {m.kind === "ai" && <div style={{ flexShrink: 0, marginBottom: 2 }}><PoDot px={3.5} /></div>}
                    <div style={{
                      ...rpgWindow,
                      ...(m.kind === "user" ? { background: T.moon, color: "#2E2B3E", borderColor: "#2E2B3E" } : {}),
                      padding: "11px 14px", fontSize: 13, lineHeight: 2, animation: "rise .3s steps(3) both",
                    }}>
                      {m.text}
                    </div>
                  </div>
                )
              )}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.mist, fontSize: 12 }}>
                  <PoDot px={2.5} style={{ animation: "floatPx 2s steps(2) infinite" }} />
                  ぽーが かんがえてる
                  <span style={{ animation: "blink 1s steps(2) infinite" }}>…</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* 入力欄 */}
          {!done && (
            <div style={{
              flexShrink: 0,
              padding: "6px 16px max(20px, env(safe-area-inset-bottom))",
              background: `linear-gradient(transparent, ${T.night} 30%)`,
            }}>
              {error && (
                <div style={{
                  color: "#E8A199", fontSize: 12, lineHeight: 1.8, marginBottom: 8,
                  padding: "8px 10px", background: "rgba(232,161,153,0.1)", borderRadius: 2,
                }}>
                  {error}
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    resizeTextarea();
                  }}
                  onFocus={() => {
                    setTimeout(() => {
                      const el = messagesRef.current;
                      if (el) el.scrollTop = el.scrollHeight;
                    }, 350);
                  }}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  rows={1}
                  placeholder="ためいきでも、ひとことでも…"
                  style={{
                    ...rpgWindow, flex: 1, resize: "none", color: "#EAE7F4",
                    padding: "12px 14px", fontSize: 16, fontFamily: "inherit", lineHeight: 1.6,
                    overflowY: "hidden", maxHeight: 120, fontSize: 13,
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
                    padding: "0 18px", fontSize: 13,
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

          </p>
          <p style={{ marginTop: 8, textAlign: "center" }}>
            <a href="/legal" style={{ color: "#4A4760", fontSize: 10, textDecoration: "underline" }}>
              免責事項・個人情報の取り扱い
            </a>
          </p>
        </div>
      )}

      {/* ひきだし画面 */}
      {screen === "drawer" && (
        <div style={{ flex: 1, overflowY: "auto", width: "100%", maxWidth: 560, padding: "28px 16px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 14, letterSpacing: "0.18em", color: T.moon }}>− おもいでの ひきだし −</span>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {FRAGMENTS.map((f, i) =>
              i < omoide.unlocked ? (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px" }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>🔖 かけら{i + 1}・{f.ch}</div>
                  <p style={{ fontSize: 13, lineHeight: 2, margin: 0 }}>{f.text}</p>
                </div>
              ) : (
                <div key={i} style={{ ...rpgWindow, padding: "13px 14px", opacity: 0.45 }}>
                  <div style={{ fontSize: 11, color: T.mist, marginBottom: 5 }}>🔒 かけら{i + 1}・{f.ch}</div>
                  <p style={{ fontSize: 13, margin: 0, color: T.mist, letterSpacing: "0.3em" }}>？？？？？？</p>
                </div>
              )
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => setScreen("title")} style={{
              ...rpgWindow, color: T.mist, padding: "10px 26px",
              fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              ◀ もどる
            </button>
          </div>
        </div>
      )}

      {/* チャット画面 */}
      {screen === "chat" && (
        <div style={{ flex: 1, width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* ヘッダー */}
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 16px 8px", position: "relative" }}>
            <span style={{ fontSize: 13, letterSpacing: "0.18em", color: T.moon }}>− ぽーの よみぐすり −</span>
            <button
              onClick={backToTitle}
              style={{
                position: "absolute", right: 16,
                background: "none", border: "none", color: T.mist,
                fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                padding: "4px 8px", letterSpacing: "0.05em",
              }}
            >
              ◀ もどる
            </button>
          </div>

          {/* メッセージ一覧（スクロール） */}
          <div ref={messagesRef} style={{ flex: 1, overflowY: "auto", padding: "8px 16px 16px" }}>
            <div style={{ display: "grid", gap: 16 }}>
              {feed.map((m, i) =>
                m.kind === "choice" ? (
                  <div key={i} style={{ display: "grid", gap: 10, animation: "rise .3s steps(3) both" }}>
                    <div style={{ fontSize: 12, color: T.mist, textAlign: "center" }}>きょうは、どっち？</div>
                    <button onClick={() => handleChoice("rx")} style={{
                      ...rpgWindow, color: "#EAE7F4", padding: "11px 16px",
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}>
                      📖 ほんも しょほうしてほしい
                    </button>
                    <button onClick={() => handleChoice("talk")} style={{
                      ...rpgWindow, color: T.mist, padding: "11px 16px",
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}>
                      💬 きょうは ただ はなしたい
                    </button>
                  </div>
                ) : m.kind === "rx" ? (
                  <div key={i} style={{ display: "grid", gap: 16, marginTop: 6 }}>
                    {m.books.map((b, j) => <PrescriptionCard key={j} book={b} index={j} />)}
                  </div>
                ) : m.kind === "goodnight" ? (
                  <div key={i} style={{ display: "grid", gap: 14, justifyItems: "center", marginTop: 8 }}>
                    <div style={{ animation: "floatPx 3s steps(3) infinite" }}><PoDot px={5} /></div>
                    <div style={{ ...rpgWindow, padding: "14px 18px", fontSize: 14, lineHeight: 2, textAlign: "center", maxWidth: 280 }}>
                      {m.text}
                    </div>
                    <div style={{ color: T.mist, fontSize: 11, letterSpacing: "0.1em" }}>＊ ぽーは てんじょうに かえりました ＊</div>
                    <button onClick={backToTitle} style={{ ...rpgWindow, color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                      ▶ また くる
                    </button>
                  </div>
                ) : m.kind === "kakera" ? (
                  <div key={i} style={{ display: "grid", gap: 12 }}>
                    <KakeraCard index={m.index} />
                    <div style={{ textAlign: "center", color: T.mist, fontSize: 12, lineHeight: 1.9 }}>
                      おだいじに。ぼくは てんじょうに いるから。
                    </div>
                    <button onClick={backToTitle} style={{ ...rpgWindow, justifySelf: "center", color: T.mist, padding: "10px 26px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                      ▶ また くる
                    </button>
                  </div>
                ) : (
                  <div key={i} style={{ justifySelf: m.kind === "user" ? "end" : "start", display: "flex", alignItems: "flex-end", gap: 8, maxWidth: "90%" }}>
                    {m.kind === "ai" && <div style={{ flexShrink: 0, marginBottom: 2 }}><PoDot px={3.5} /></div>}
                    <div style={{
                      ...rpgWindow,
                      ...(m.kind === "user" ? { background: T.moon, color: "#2E2B3E", borderColor: "#2E2B3E" } : {}),
                      padding: "11px 14px", fontSize: 13, lineHeight: 2, animation: "rise .3s steps(3) both",
                    }}>
                      {m.text}
                    </div>
                  </div>
                )
              )}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.mist, fontSize: 12 }}>
                  <PoDot px={2.5} style={{ animation: "floatPx 2s steps(2) infinite" }} />
                  ぽーが かんがえてる
                  <span style={{ animation: "blink 1s steps(2) infinite" }}>…</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* 入力欄 */}
          {!done && (
            <div style={{
              flexShrink: 0,
              padding: "6px 16px max(20px, env(safe-area-inset-bottom))",
              background: `linear-gradient(transparent, ${T.night} 30%)`,
            }}>
              {error && (
                <div style={{
                  color: "#E8A199", fontSize: 12, lineHeight: 1.8, marginBottom: 8,
                  padding: "8px 10px", background: "rgba(232,161,153,0.1)", borderRadius: 2,
                }}>
                  {error}
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    resizeTextarea();
                  }}
                  onFocus={() => {
                    setTimeout(() => {
                      const el = messagesRef.current;
                      if (el) el.scrollTop = el.scrollHeight;
                    }, 350);
                  }}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  rows={1}
                  placeholder="ためいきでも、ひとことでも…"
                  style={{
                    ...rpgWindow, flex: 1, resize: "none", color: "#EAE7F4",
                    padding: "12px 14px", fontSize: 16, fontFamily: "inherit", lineHeight: 1.6,
                    overflowY: "hidden", maxHeight: 120, fontSize: 13,
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
                    padding: "0 18px", fontSize: 13,
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

        </p>
        <p style={{ marginTop: 8, textAlign: "center" }}>
          <a href="/legal" style={{ color: "#4A4760", fontSize: 10, textDecoration: "underline" }}>
            免責事項・個人情報の取り扱い
          </a>
        </p>
      </div>
    </div>
  );
}
