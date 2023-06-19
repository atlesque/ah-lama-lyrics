import { useAtom } from 'jotai';
import styles from './AudioPlayer.module.scss';

import clsx from 'clsx';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import {
  audioPlayerHasEndedAtom,
  audioPlayerRefAtom,
  currentTimeAtom,
  lastSetTimeAtom,
} from '../../../atoms/audioPlayer';

const AUDIO_FILE_LOCATION = '/src/assets/audio/guru_yoga_lama_achuk_tibetan_w_intro.mp3';

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

  const handleCanPlayThrough = () => {
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
      src={AUDIO_FILE_LOCATION}
      onTimeUpdate={handleTimeUpdate}
      onCanPlayThrough={handleCanPlayThrough}
      onPlay={handlePlay}
      onEnded={handleEnded}
    >
      <a href={AUDIO_FILE_LOCATION}>Download audio</a>
    </audio>
  );
};

export default AudioPlayer;
