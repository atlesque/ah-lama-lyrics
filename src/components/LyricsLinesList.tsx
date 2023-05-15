import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { activeLyricsLineIndexAtom, lyricsLinesAtom } from '../atoms/lyrics';
import { LyricsLine } from '../types/lyrics';
import styles from './LyricsLinesList.module.scss';
import { getSecondsAsTimecode } from '../helpers/getSecondsAsTimecode';
import Button from './shared/Button';
import { currentTimeAtom, lastSetTimeAtom } from '../atoms/audio';

const LyricsLinesList = () => {
  const [lyricsLines] = useAtom(lyricsLinesAtom);
  const [activeLyricsLineIndex, setActiveLyricsLineIndex] = useAtom(activeLyricsLineIndexAtom);
  const [, setLastSetTime] = useAtom(lastSetTimeAtom);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollTo(0, rootRef.current.scrollHeight);
    }
  }, [lyricsLines]);

  const handleLineClick = (line: LyricsLine): void => {
    setLastSetTime(line.startTime);
  };

  const handleEditClick = (lineIndex: number): void => {
    setActiveLyricsLineIndex(activeLyricsLineIndex === lineIndex ? undefined : lineIndex);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      {lyricsLines.map((line, index) => (
        <div key={`lyricsLine-${index}`} className={styles.lyricsLine}>
          <button
            className={clsx(styles.lyricsLineText, {
              [styles.isActive]: index === activeLyricsLineIndex,
            })}
            onClick={() => handleLineClick(line)}
          >
            <span className={styles.lyricsTimecode}>
              {getSecondsAsTimecode(line.startTime)} - {getSecondsAsTimecode(line.endTime)}
            </span>
            <span>{line.tibetan}</span>
            <span>{line.transliteration}</span>
            <span>{line.english}</span>
          </button>
          <div className={styles.lyricsLineActions}>
            <Button onClick={() => handleEditClick(index)}>
              {index === activeLyricsLineIndex ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LyricsLinesList;
