import "style.css";
import Head from "next/head";
// import * as Sentry from "@sentry/nextjs";
function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>BUSCADOR</title>
      </Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css"
      />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
