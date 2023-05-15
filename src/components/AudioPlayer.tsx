import { useAtom } from 'jotai';
import styles from './AudioPlayer.module.scss';

import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { currentTimeAtom } from '../atoms/audio';
import { activeLyricsLineAtom } from '../atoms/lyrics';

const AudioPlayer = () => {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [activeLyricsLine] = useAtom(activeLyricsLineAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (activeLyricsLine && isInitialized && audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = activeLyricsLine.startTime;
      setCurrentTime(activeLyricsLine.startTime);
    }
  }, [activeLyricsLine, isInitialized, setCurrentTime]);

  const handleCanPlay = () => {
    if (!isInitialized && audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = currentTime;
      setIsInitialized(true);
    }
  };

  const handleTimeUpdate = debounce(() => {
    if (audioPlayerRef.current) {
      setCurrentTime(audioPlayerRef.current.currentTime);
    }
  }, 200);

  return (
    <audio
      ref={audioPlayerRef}
      className={styles.root}
      controls
      src="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3"
      onTimeUpdate={handleTimeUpdate}
      onCanPlay={handleCanPlay}
    >
      <a href="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3">Download audio</a>
    </audio>
  );
};

export default AudioPlayer;
