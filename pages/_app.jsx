import { DotGothic16 } from "next/font/google";
import Head from "next/head";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  preload: false,
  variable: "--font-dotgothic",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className={dotGothic.variable} style={{ display: "contents" }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
