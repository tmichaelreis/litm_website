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
      <img src="/previous.svg" alt="Previous" className={styles.controlIcon} />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className={styles.pause}
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <img src="/pause.svg" alt="Pause" className={styles.controlIcon} />
      </button>
    ) : (
      <button
        type="button"
        className={styles.play}
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <img src="/play.svg" alt="Play" className={styles.controlIcon} />
      </button>
    )}
    <button
      type="button"
      className={styles.next}
      aria-label="Next"
      onClick={onNextClick}
    >
      <img src="/next.svg" alt="Next" className={styles.controlIcon} />
    </button>
  </div>
);

export default AudioControls;
