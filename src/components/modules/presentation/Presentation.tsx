import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { audioPlayerHasEndedAtom, audioPlayerRefAtom } from '../../../atoms/audioPlayer';
import { currentLyricsLineAtom } from '../../../atoms/lyrics';
import { settingsAtom } from '../../../atoms/settings';
import Button from '../../shared/Button';
import styles from './Presentation.module.scss';
import { SlideSettings } from '../../../types/settings';

interface PresentationProps {
  onPlay: () => void;
  onStop: () => void;
}

const Presentation = ({ onPlay, onStop }: PresentationProps) => {
  const [currentLine] = useAtom(currentLyricsLineAtom);
  const [settings] = useAtom(settingsAtom);
  const [audioPlayer] = useAtom(audioPlayerRefAtom);
  const [audioPlayerHasEnded] = useAtom(audioPlayerHasEndedAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isPlayingOutro, setIsPlayingOutro] = useState(false);
  const [presentationTimerId, setPresentationTimerId] = useState<number | undefined>(undefined);

  const startMainPresentation = useCallback(() => {
    if (!audioPlayer) {
      return;
    }
    setIsPlayingIntro(false);
    audioPlayer.play();
  }, [audioPlayer]);

  const handlePlayClick = useCallback(() => {
    setIsPlayingIntro(true);
    setIsPlaying(true);
    const presentationTimerId = setTimeout(() => {
      startMainPresentation();
    }, settings.intro.time);
    setPresentationTimerId(presentationTimerId);
    onPlay();
  }, [onPlay, settings.intro.time, startMainPresentation]);

  const handleStopClick = useCallback(() => {
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
  }, [audioPlayer, onStop, presentationTimerId]);

  const titleSlide: SlideSettings | undefined = useMemo(() => {
    if (isPlayingIntro) {
      return settings.intro;
    }
    if (isPlayingOutro) {
      return settings.outro;
    }
    return undefined;
  }, [isPlayingIntro, isPlayingOutro, settings.intro, settings.outro]);

  useEffect(() => {
    if (audioPlayerHasEnded) {
      setIsPlayingOutro(true);
      setTimeout(() => {
        setIsPlayingOutro(false);
        setIsPlaying(false);
      }, settings.outro.time);
    }
  }, [audioPlayerHasEnded, isPlaying, settings.outro.time]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyP' && event.altKey && !isPlaying) {
        handlePlayClick();
      }
      if (event.code === 'KeyS' && event.altKey && isPlaying) {
        handleStopClick();
      }
    },
    [handlePlayClick, handleStopClick, isPlaying]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className={styles.root}>
      {settings.showPresentationControls && (
        <>
          <div className={styles.controls}>
            <div className={styles.actions}>
              {!isPlaying && <Button onClick={handlePlayClick}>Play</Button>}
              {isPlaying && <Button onClick={handleStopClick}>Stop</Button>}
            </div>
            <span className={styles.hotkeyHints}>
              ALT+P to play, ALT+S to stop, F11 for fullscreen
            </span>
          </div>
        </>
      )}
      <div className={styles.presentation}>
        <div className={styles.horizontalDecoration}></div>
        <div className={styles.contentWrapper}>
          <div className={styles.verticalDecoration}></div>
          <div
            className={styles.content}
            style={{
              zoom: settings.presentationZoomLevel,
              backgroundImage: `url(${currentLine?.image})`,
            }}
          >
            {titleSlide && (
              <>
                <span className={styles.textTitle}>{titleSlide?.title}</span>
                <span className={styles.textSubtitle}>{titleSlide?.subtitle}</span>
              </>
            )}
            {!titleSlide && !currentLine?.image && (
              <>
                {settings.showTibetan && (
                  <span className={styles.textTibetan}>{currentLine?.tibetan}</span>
                )}
                <span className={styles.textTransliteration}>{currentLine?.transliteration}</span>
                <span className={styles.textEnglish}>{currentLine?.english}</span>
              </>
            )}
            {/* {!titleScreen && currentLine?.image && (
              <img src={currentLine?.image} className={styles.image} />
            )} */}
          </div>
          <div className={styles.verticalDecoration}></div>
        </div>
        <div className={styles.horizontalDecoration}></div>
      </div>
    </div>
  );
};

export default Presentation;
