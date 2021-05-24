import Image from "next/image";

import styles from "../styles/AudioControls.module.css";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <div className={styles.controls}>
    <button
      type="button"
      className={styles.previous}
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Image src="/previous.svg" alt="Previous" width={20} height={20} />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className={styles.pause}
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Image src="/pause.svg" alt="Pause" width={20} height={20} />
      </button>
    ) : (
      <button
        type="button"
        className={styles.play}
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <Image src="/play.svg" alt="Play" width={20} height={20} />
      </button>
    )}
    <button
      type="button"
      className={styles.next}
      aria-label="Next"
      onClick={onNextClick}
    >
      <Image src="/next.svg" alt="Next" width={20} height={20} />
    </button>
  </div>
);

export default AudioControls;
