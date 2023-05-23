import { useAtom } from 'jotai';
import styles from './AudioPlayer.module.scss';

import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import {
  audioPlayerHasEndedAtom,
  audioPlayerRefAtom,
  currentTimeAtom,
  lastSetTimeAtom,
} from '../../../atoms/audioPlayer';
import clsx from 'clsx';

interface AudioPlayerClasses {
  root?: string;
}
interface AudioPlayerProps {
  classes?: AudioPlayerClasses;
}

const AudioPlayer = ({ classes }: AudioPlayerProps) => {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [lastSetTime, setLastSetTime] = useAtom(lastSetTimeAtom);
  const [audioPlayerRef, setAudioPlayerRef] = useAtom(audioPlayerRefAtom);
  const [, setAudioPlayerHasEnded] = useAtom(audioPlayerHasEndedAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioPlayer = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioPlayer.current && !audioPlayerRef) {
      setAudioPlayerRef(audioPlayer.current);
    }
  }, [audioPlayer, audioPlayerRef, setAudioPlayerRef]);

  useEffect(() => {
    if (
      lastSetTime &&
      isInitialized &&
      audioPlayer.current &&
      lastSetTime !== audioPlayer.current.currentTime
    ) {
      audioPlayer.current.currentTime = lastSetTime;
      setLastSetTime(undefined);
    }
  }, [currentTime, isInitialized, lastSetTime, setLastSetTime]);

  const handleCanPlay = () => {
    if (!isInitialized && audioPlayer.current) {
      audioPlayer.current.currentTime = currentTime;
      setIsInitialized(true);
    }
  };

  const handleTimeUpdate = debounce(() => {
    if (audioPlayer.current) {
      setCurrentTime(parseFloat(audioPlayer.current.currentTime.toFixed(2)));
    }
  }, 200);

  const handlePlay = () => {
    setAudioPlayerHasEnded(false);
  };

  const handleEnded = () => {
    setAudioPlayerHasEnded(true);
  };

  return (
    <audio
      ref={audioPlayer}
      className={clsx(styles.root, classes?.root)}
      controls
      src="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3"
      onTimeUpdate={handleTimeUpdate}
      onCanPlay={handleCanPlay}
      onPlay={handlePlay}
      onEnded={handleEnded}
    >
      <a href="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3">Download audio</a>
    </audio>
  );
};

export default AudioPlayer;
