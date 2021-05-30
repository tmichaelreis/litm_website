import styles from "../styles/AudioControls.module.css";
import { FaFastBackward, FaPause, FaPlay, FaFastForward } from "react-icons/fa";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <div className={styles.controls}>
    <button
      type="button"
      className={styles.controlButton}
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <FaFastBackward className={styles.controlIcon} />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className={styles.controlButton}
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <FaPause className={styles.controlIcon} />
      </button>
    ) : (
      <button
        type="button"
        className={styles.controlButton}
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <FaPlay className={styles.controlIcon} />
      </button>
    )}
    <button
      type="button"
      className={styles.controlButton}
      aria-label="Next"
      onClick={onNextClick}
    >
      <FaFastForward className={styles.controlIcon} />
    </button>
  </div>
);

export default AudioControls;
