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

export default function Legal() {
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
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
        @keyframes rise { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
      `}</style>

      <Stars />

      <div style={{ width: "100%", maxWidth: 560, padding: "8vh 24px 80px", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ fontSize: 20, letterSpacing: "0.12em", margin: "0 0 8px", fontWeight: 400 }}>
            免責事項・個人情報の取り扱い
          </h1>
          <p style={{ color: T.mist, fontSize: 11, margin: 0 }}>ぽーの よみぐすり</p>
        </div>

        {/* 免責事項 */}
        <div style={{ ...rpgWindow, padding: "20px 18px", marginBottom: 16, animation: "rise .4s steps(4) both" }}>
          <div style={{ color: T.lamp, fontSize: 11, marginBottom: 14, letterSpacing: "0.1em" }}>▼ 免責事項</div>

          <div style={{ fontSize: 12, lineHeight: 2.2 }}>
            <p style={{ margin: "0 0 14px", color: T.moon, fontWeight: 400 }}>① 医療・心理療法ではありません</p>
            <p style={{ margin: "0 0 18px", color: "#C8C4DC" }}>
              本サービスは医療行為・カウンセリング・心理療法ではありません。ぽーとの会話は気晴らしや読書のきっかけを目的としており、専門的なサポートの代替となるものではありません。つらさが続く場合は、専門家にご相談ください。
            </p>

            <p style={{ margin: "0 0 14px", color: T.moon }}>② AI生成コンテンツについて</p>
            <p style={{ margin: "0 0 18px", color: "#C8C4DC" }}>
              ぽーの返答はAI（Claude / Anthropic社）によって生成されています。内容の正確性・適切性を完全に保証するものではありません。
            </p>

            <p style={{ margin: "0 0 14px", color: T.moon }}>③ 本の推薦について</p>
            <p style={{ margin: "0 0 18px", color: "#C8C4DC" }}>
              処方される本はAIの判断によるものです。あなたの状況に必ずしも適合するとは限りません。実際の購入・読書はご自身の判断でお願いします。
            </p>

            <p style={{ margin: "0 0 14px", color: T.moon }}>④ Amazonアフィリエイトについて</p>
            <p style={{ margin: "0 0 18px", color: "#C8C4DC" }}>
              本サービスはAmazonアソシエイト・プログラムに参加しています。紹介リンクを経由してご購入いただいた場合、よなよな舎が一定の紹介料を受け取ることがあります。利用者の購入価格に変動はありません。
            </p>

            <p style={{ margin: "0 0 14px", color: T.moon }}>⑤ サービスの変更・終了</p>
            <p style={{ margin: 0, color: "#C8C4DC" }}>
              予告なくサービス内容を変更・終了する場合があります。
            </p>
          </div>
        </div>

        {/* 個人情報の取り扱い */}
        <div style={{ ...rpgWindow, padding: "20px 18px", marginBottom: 16 }}>
          <div style={{ color: T.lamp, fontSize: 11, marginBottom: 14, letterSpacing: "0.1em" }}>▼ 個人情報の取り扱い</div>

          <div style={{ fontSize: 12, lineHeight: 2.2 }}>
            <p style={{ margin: "0 0 14px", color: T.moon }}>収集する情報</p>

            <div style={{ ...rpgWindow, padding: "12px 14px", marginBottom: 18, fontSize: 11, lineHeight: 2 }}>
              <div style={{ color: T.lamp, marginBottom: 6 }}>会話内容</div>
              <div style={{ color: "#C8C4DC", marginBottom: 12 }}>
                ぽーへのメッセージはAI応答生成のためAnthropicのAPIに送信されます。よなよな舎が会話内容を閲覧・保存・販売することはありません。
              </div>
              <div style={{ color: T.lamp, marginBottom: 6 }}>訪問回数・かけらの取得状況</div>
              <div style={{ color: "#C8C4DC", marginBottom: 12 }}>
                お使いの端末のブラウザ（localStorage）にのみ保存されます。外部サーバーには送信されません。
              </div>
              <div style={{ color: T.lamp, marginBottom: 6 }}>Amazonリンクのクリック情報</div>
              <div style={{ color: "#C8C4DC" }}>
                Amazonが独自に収集します。よなよな舎はクリック者を特定できません。
              </div>
            </div>

            <p style={{ margin: "0 0 14px", color: T.moon }}>収集しない情報</p>
            <p style={{ margin: "0 0 18px", color: "#C8C4DC" }}>
              氏名・メールアドレスなどの個人識別情報、会話履歴（セッション終了後に消滅）、IPアドレス・位置情報は収集しません。
            </p>

            <p style={{ margin: "0 0 14px", color: T.moon }}>第三者への提供</p>
            <p style={{ margin: "0 0 18px", color: "#C8C4DC" }}>
              会話内容はAnthropicのAPIを通じて処理されます。Anthropicの
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer"
                style={{ color: T.moon, textDecoration: "underline" }}>
                プライバシーポリシー
              </a>
              が適用されます。
            </p>

            <p style={{ margin: "0 0 14px", color: T.moon }}>お問い合わせ</p>
            <p style={{ margin: 0, color: "#C8C4DC" }}>
              yonayona-sha@gmail.com
            </p>
          </div>
        </div>

        {/* 戻るボタン */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
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
          © よなよな舎　お問い合わせ：yonayona-sha@gmail.com
        </p>
      </div>
    </div>
  );
}
