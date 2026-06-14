import { DotGothic16 } from "next/font/google";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  preload: false,
  variable: "--font-dotgothic",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={dotGothic.variable} style={{ display: "contents" }}>
      <Component {...pageProps} />
    </div>
  );
}
