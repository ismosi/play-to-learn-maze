import retroMp3 from "../../../../../../public/Audios/retro2.mp3";
import { useRef, useState } from "react";
import classes from "./audio-operations.module.scss";

function AudioOperations() {
  const retroAudioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (retroAudioRef.current) {
      if (isPlaying) {
        retroAudioRef.current.pause();
      } else {
        retroAudioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={classes.audioControl} id="audioPlay">
      <button
        onClick={togglePlay}
        className={classes.playButton}
        aria-label="播放音乐"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
      <audio ref={retroAudioRef} loop preload="auto">
        <source src={retroMp3} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default AudioOperations;
