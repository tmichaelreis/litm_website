import styles from "../styles/Footer.module.css";

import * as ga from "../lib/ga";

const Footer = () => (
  <footer className={styles.footer}>
    <img className={styles.lines} src="/mail_lines.svg" />
    <div className={styles.contact}>
      <a
        href="mailto:mail@lostinthemail.co"
        onClick={() =>
          ga.event({
            action: "email_link_clicked",
          })
        }
      >
        mail@lostinthemail.co
      </a>
    </div>
  </footer>
);

export default Footer;
