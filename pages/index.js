import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

// Import AudioPlayer dynamically to avoid server-side rendering.
// The AudioPlayer uses the HTMLAudioElement interface,
// which is only available in Browser:
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
const AudioPlayer = dynamic(() => import("../components/AudioPlayer"), {
  ssr: false,
});

export default function Home() {
  const cloudfrontUrl = "https://dacoj7br0jajz.cloudfront.net";
  const tracks = [
    {
      title: "Holding Pattern",
      audioSrc: `${cloudfrontUrl}/holding_pattern.wav`,
    },
    { title: "The Moon & I", audioSrc: `${cloudfrontUrl}/moon.wav` },
    { title: "Wallflower", audioSrc: `${cloudfrontUrl}/wallflower.wav` },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Lost in the Mail</title>
        <meta name="description" content="Website for Lost in the Mail band" />
        <link rel="icon" href="/mail_lines.svg" />
      </Head>

      <main className={styles.main}>
        <img className={styles.logo} src="/logo.svg" />

        <section className={styles.playerContainer}>
          <AudioPlayer tracks={tracks} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
