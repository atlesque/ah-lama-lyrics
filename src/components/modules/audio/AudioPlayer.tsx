import { useAtom } from 'jotai';
import styles from './AudioPlayer.module.scss';

import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { currentTimeAtom, lastSetTimeAtom } from '../../../atoms/audio';

const AudioPlayer = () => {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [lastSetTime, setLastSetTime] = useAtom(lastSetTimeAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (
      lastSetTime &&
      isInitialized &&
      audioPlayerRef.current &&
      lastSetTime !== audioPlayerRef.current.currentTime
    ) {
      audioPlayerRef.current.currentTime = lastSetTime;
      setLastSetTime(undefined);
    }
  }, [currentTime, isInitialized, lastSetTime, setLastSetTime]);

  const handleCanPlay = () => {
    if (!isInitialized && audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = currentTime;
      setIsInitialized(true);
    }
  };

  const handleTimeUpdate = debounce(() => {
    if (audioPlayerRef.current) {
      setCurrentTime(parseFloat(audioPlayerRef.current.currentTime.toFixed(2)));
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
