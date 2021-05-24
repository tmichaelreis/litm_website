import React, { useState, useEffect, useRef } from "react";

import styles from "../styles/AudioPlayer.module.css";

const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, color, audioSrc } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    console.log("TODO go to prev");
  };

  const toNextTrack = () => {
    console.log("TODO go to next");
  };

  return (
    <div className={styles.player}>
      <div className={styles.trackInfo}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  );
};

export default AudioPlayer;
