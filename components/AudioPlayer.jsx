import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import AudioControls from "../components/AudioControls";
import TrackProgress from "../components/TrackProgress";
import styles from "../styles/AudioPlayer.module.css";

const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playAfterScrub, setPlayAfterScrub] = useState(false);

  const { title, audioSrc } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    if (trackProgress < 2) {
      setTrackIndex((tracks.length + trackIndex - 1) % tracks.length);
    } else {
      audioRef.current.currentTime = 0;
      setTrackProgress(0);
    }
  };

  const toNextTrack = () => {
    setTrackIndex((trackIndex + 1) % tracks.length);
  };

  const startTimer = () => {
    // Clear running timer(s)
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const handleScrub = (value) => {
    if (isPlaying || playAfterScrub) {
      // Resume playing after scrubbing
      setPlayAfterScrub(true);
    } else {
      // Remain paused after scrubbing
      setPlayAfterScrub(false);
    }

    // Stop playback
    setIsPlaying(false);

    // Clear running timer(s)
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleScrubEnd = () => {
    // Start playback if desired
    if (!isPlaying && playAfterScrub) {
      setIsPlaying(true);
    }
    setPlayAfterScrub(false);
    startTimer();
  };

  // Play/pause
  useLayoutEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Change tracks
  useLayoutEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current && isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  // Pause and clean up on unmount
  useEffect(() => {
    startTimer();

    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

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
      <TrackProgress
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
        progress={trackProgress}
        duration={duration}
      />
    </div>
  );
};

export default AudioPlayer;
