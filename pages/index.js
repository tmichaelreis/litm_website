import Head from 'next/head'
import AudioPlayer from '../components/AudioPlayer';
import styles from '../styles/Home.module.css'

export default function Home() {
  const tracks = [
    { title: 'Holding Pattern', audioSrc: 'https://soundcloud.com/chooptastic/how-time-flies' },
    { title: 'Moon and I', audioSrc: 'test' },
    { title: 'Wallflower', audioSrc: 'test' }
  ]
  return (
    <div className={styles.container}>
      <Head>
        <title>Lost in the Mail</title>
        <meta name="description" content="Website for Lost in the Mail band" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          We are Lost in the Mail
        </h1>

        <section className={styles.playerContainer}>
          {/* AudioPlayer uses the HTMLAudioElement interface,
              which is only available in Browser
              (https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) */}
          { process.browser && <AudioPlayer tracks={tracks} /> }
        </section>
      </main>
    </div>
  )
}
