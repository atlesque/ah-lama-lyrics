import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { activeLyricsLineIndexAtom, lyricsLinesAtom } from '../atoms/lyrics';
import { LyricsLine } from '../types/lyrics';
import styles from './LyricsLinesList.module.scss';

const LyricsLinesList = () => {
  const [lyricsLines] = useAtom(lyricsLinesAtom);
  const [activeLyricsLineIndex, setActiveLyricsLineIndex] = useAtom(activeLyricsLineIndexAtom);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollTo(0, rootRef.current.scrollHeight);
    }
  }, [lyricsLines]);

  const handleLineClick = (lineIndex: number, line: LyricsLine): void => {
    setActiveLyricsLineIndex(activeLyricsLineIndex === lineIndex ? undefined : lineIndex);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      {lyricsLines.map((line, index) => (
        <button
          key={`lyricsLine-${index}`}
          className={clsx(styles.lyricsLine, {
            [styles.lastAdded]: index === lyricsLines.length - 1,
            [styles.isActive]: index === activeLyricsLineIndex,
          })}
          onClick={() => handleLineClick(index, line)}
        >
          <div>
            <span>
              {line.startTime} - {line.endTime}
            </span>
          </div>
          <span>{line.tibetan}</span>
          <span>{line.transliteration}</span>
          <span>{line.english}</span>
        </button>
      ))}
    </div>
  );
};

export default LyricsLinesList;
