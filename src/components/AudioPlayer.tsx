import { useAtom } from 'jotai';
import styles from './AudioPlayer.module.scss';

import { debounce } from 'lodash';
import { currentTimeAtom } from '../atoms/audio';
import { useRef } from 'react';

const AudioPlayer = () => {
  const [, setCurrentTime] = useAtom(currentTimeAtom);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

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
    >
      <a href="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3">Download audio</a>
    </audio>
  );
};

export default AudioPlayer;
