import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
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
      </main>
    </div>
  )
}
