import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { currentLyricsLineAtom } from '../../../atoms/lyrics';
import { settingsAtom } from '../../../atoms/settings';
import { LyricsLine } from '../../../types/lyrics';
import Button from '../../shared/Button';
import styles from './Presentation.module.scss';
import { audioPlayerRefAtom } from '../../../atoms/audioPlayer';

const INTRO_TIME = 8000;

const INTRO_TEXT: LyricsLine = {
  startTime: 0,
  endTime: 5,
  transliteration: 'Guru Yoga That Brings Swift Realisations',
  english: 'His Holiness the Great Siddha Lungdok Gyaltsen Rinpoche',
};

interface PresentationProps {
  onPlay: () => void;
  onStop: () => void;
}

const Presentation = ({ onPlay, onStop }: PresentationProps) => {
  const [currentLine] = useAtom(currentLyricsLineAtom);
  const [settings] = useAtom(settingsAtom);
  const [audioPlayer] = useAtom(audioPlayerRefAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [presentationTimerId, setPresentationTimerId] = useState<number | undefined>(undefined);

  const startMainPresentation = (): void => {
    if (!audioPlayer) {
      return;
    }
    setIsPlayingIntro(false);
    audioPlayer.play();
  };

  const handlePlayClick = (): void => {
    setIsPlayingIntro(true);
    setIsPlaying(true);
    const presentationTimerId = setTimeout(() => {
      startMainPresentation();
    }, INTRO_TIME);
    setPresentationTimerId(presentationTimerId);
    onPlay();
  };

  const handleStopClick = (): void => {
    if (!audioPlayer) {
      return;
    }
    clearTimeout(presentationTimerId);
    setPresentationTimerId(undefined);
    setIsPlaying(false);
    setIsPlayingIntro(false);
    onStop();
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  };

  const displayedLine = useMemo(() => {
    if (isPlayingIntro) {
      return INTRO_TEXT;
    }
    return currentLine;
  }, [currentLine, isPlayingIntro]);

  return (
    <div className={styles.root}>
      {settings.showPresentationControls && (
        <div className={styles.controls}>
          <div className={styles.actions}>
            {!isPlaying && <Button onClick={handlePlayClick}>Play</Button>}
            {isPlaying && <Button onClick={handleStopClick}>Stop</Button>}
          </div>
        </div>
      )}
      <div className={styles.presentation}>
        <div className={styles.horizontalDecoration}></div>
        <div className={styles.contentWrapper}>
          <div className={styles.verticalDecoration}></div>
          <div className={styles.content} style={{ zoom: settings.presentationZoomLevel }}>
            {settings.showTibetan && (
              <span className={styles.textTibetan}>{displayedLine?.tibetan}</span>
            )}
            <span className={styles.textTransliteration}>{displayedLine?.transliteration}</span>
            <span className={styles.textEnglish}>{displayedLine?.english}</span>
          </div>
          <div className={styles.verticalDecoration}></div>
        </div>
        <div className={styles.horizontalDecoration}></div>
      </div>
    </div>
  );
};

export default Presentation;
