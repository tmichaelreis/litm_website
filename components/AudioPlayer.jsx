import React, { useState, useEffect, useRef } from "react";
import AudioControls from "../components/AudioControls";
import styles from "../styles/AudioPlayer.module.css";

const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, audioSrc } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    setTrackIndex((tracks.length + trackIndex - 1) % tracks.length);
  };

  const toNextTrack = () => {
    setTrackIndex((trackIndex + 1) % tracks.length);
  };

  return (
    <div className={styles.player}>
      <div className={styles.trackInfo}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <AudioControls
        isPlaying={isPlaying}
        onPrevClick={toPrevTrack}
        onNextClick={toNextTrack}
        onPlayPauseClick={setIsPlaying}
      />
    </div>
  );
};

export default AudioPlayer;
