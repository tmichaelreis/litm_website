import styles from "../styles/Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <img className={styles.wavies} src="/wavies.svg" />
    <div className={styles.contact}>
      <a href="mailto:mail@lostinthemail.co">mail@lostinthemail.co</a>
    </div>
  </footer>
);

export default Footer;
