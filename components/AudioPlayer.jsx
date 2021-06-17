import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import AudioControls from "../components/AudioControls";
import TrackProgress from "../components/TrackProgress";
import styles from "../styles/AudioPlayer.module.css";

import * as ga from "../lib/ga";

const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playAfterScrub, setPlayAfterScrub] = useState(false);
  const [duration, setDuration] = useState(NaN);

  const { title, audioSrc } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const toPrevTrack = () => {
    // Log GA Event
    ga.event({
      action: "beginning_or_previous_button_pressed",
      params: { song: title, timestamp: audioRef.current.currentTime },
    });

    // Go to beginning of track or previous
    if (trackProgress < 2) {
      setTrackIndex((tracks.length + trackIndex - 1) % tracks.length);
    } else {
      audioRef.current.currentTime = 0;
      setTrackProgress(0);
    }
  };

  const toNextTrack = ({ autoplay = false }) => {
    if (!autoplay) {
      // Log GA Event
      ga.event({
        action: "next_track_clicked",
        params: { song: title, timestamp: audioRef.current.currentTime },
      });
    }
    setTrackIndex((trackIndex + 1) % tracks.length);
  };

  const handlePlayPause = (play) => {
    // Log GA event
    if (play) {
      ga.event({ action: "play_song", params: { song: title } });
    } else {
      ga.event({
        action: "pause_song",
        params: { song: title, timestamp: audioRef.current.currentTime },
      });
    }

    // Update play/pause state
    setIsPlaying(play);
  };

  const startTimer = () => {
    // Clear running timer(s)
    clearInterval(intervalRef.current);

    // Start new timer to regularly update track progess
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        ga.event({
          action: "next_track_autoplay",
          params: { song: title },
        });
        toNextTrack({ autoplay: true });
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

    // Log scrub event in GA
    ga.event({
      action: "scrub_used",
      params: {
        song: title,
        scrubbed_from: audioRef.current.currentTime,
        scrubbed_to: value,
      },
    });

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

    // Clear duration
    setDuration(NaN);

    // Set duration once track data is loaded
    audioRef.current.onloadeddata = (e) => {
      setDuration(audioRef.current.duration);
    };

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
        isPlaying={isPlaying || playAfterScrub}
        onPrevClick={toPrevTrack}
        onNextClick={toNextTrack}
        onPlayPauseClick={handlePlayPause}
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
