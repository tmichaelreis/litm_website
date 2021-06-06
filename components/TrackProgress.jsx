import styles from "../styles/TrackProgress.module.css";

const TrackProgress = ({ onScrub, onScrubEnd, progress, duration }) => {
  const currentPercentage = duration ? `${(progress / duration) * 100}%` : "0%";
  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, var(--teal-blue)), color-stop(${currentPercentage}, #777))`;

  return (
    <div className={styles.progress}>
      <input
        type="range"
        value={progress}
        disabled={!duration}
        step="1"
        min="0"
        max={duration ? duration : `${duration}`} // cast duration to string if NaN
        className={styles.progressInput}
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        onTouchEnd={onScrubEnd}
        style={{ background: trackStyling }}
      />
    </div>
  );
};

export default TrackProgress;
