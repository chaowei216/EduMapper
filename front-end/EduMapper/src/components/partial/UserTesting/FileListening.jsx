import { useState, useRef } from "react";
import { IconButton, Slider, Typography } from "@mui/material";
import { PlayArrow, Pause, Replay, VolumeUp } from "@mui/icons-material";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const FileListening = (pros) => {
  const { passages, isPlaying, setIsPlaying } = pros;
  const [audioTime, setAudioTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setAudioTime(audio.currentTime);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue / 100;
  };

  const handleAudioLoaded = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSliderChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setAudioTime(newValue);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleReplay}>
            <Replay />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" style={{ marginRight: 20 }}>
            {formatTime(audioTime)} / {formatTime(duration)}
          </Typography>
          <Slider
            value={audioTime}
            min={0}
            max={duration}
            onChange={handleSliderChange}
            style={{ width: 500 }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <VolumeUp />
          </IconButton>
          <Slider
            value={volume}
            min={0}
            max={100}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
            style={{ width: 140 }}
          />
        </div>
        <audio
          ref={audioRef}
          // src={
          //   passages?.PassageContent?.AudioClip || "/src/assets/thienlyoi.mp3"
          // } // Đường dẫn tới file âm thanh của bạn
          src={`https://localhost:7228/api/Passages/files?fileName=${passages.listeningFile}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleAudioLoaded}
        />
      </div>
    </div>
  );
};

export default FileListening;
