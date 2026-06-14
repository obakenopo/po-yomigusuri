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
          <h1 style={{ fontSize: 28, letterSpacing: "0.12em", margin: "0 0 6px", fontWeight: 400 }}>
            ぽーの よみぐすり
          </h1>
          <p style={{ color: T.mist, fontSize: 10, margin: "0 0 12px", lineHeight: 1.8 }}>
            © よなよな舎　お問い合わせ：yonayona-sha@gmail.com
          </p>
          <p style={{ color: T.mist, fontSize: 13, lineHeight: 2, margin: 0 }}>
            つかれた人の部屋に住むおばけ「ぽー」が、<br />
            話を聞いて、本を処方してくれるサービス。
          </p>
        </div>

        <div style={{ ...rpgWindow, padding: "20px 18px", marginBottom: 16, animation: "rise .4s steps(4) both" }}>
          <div style={{ color: T.lamp, fontSize: 11, marginBottom: 10, letterSpacing: "0.1em" }}>▼ ぽー って なに？</div>
          <p style={{ fontSize: 13, lineHeight: 2.2, margin: 0 }}>
            ぽーは、まるくてちいさなおばけ。<br />
            いつからか、つかれた人の部屋の天井に住みついています。<br />
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
              ぽーに はなしかける
            </button>
          </Link>
        </div>

        <p style={{ color: "#4A4760", fontSize: 10, marginTop: 32, lineHeight: 1.8, textAlign: "center" }}>
          本サービスは医療行為・心理療法ではありません。<br />
          専門的なサポートが必要な方はよりそいホットライン（0120-279-338）へ。
        </p>
      </div>
    </div>
  );
}
