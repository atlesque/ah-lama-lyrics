import { useAtom } from 'jotai';
import styles from './LyricsLinesList.module.scss';
import { lyricsLinesAtom } from '../atoms/lyrics';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';

const LyricsLinesList = () => {
  const [lyricsLines] = useAtom(lyricsLinesAtom);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollTo(0, rootRef.current.scrollHeight);
    }
  }, [lyricsLines]);

  return (
    <div className={styles.root} ref={rootRef}>
      {lyricsLines.map((line, index) => (
        <div
          key={`lyricsLine-${index}`}
          className={clsx(styles.lyricsLine, {
            [styles.lastAdded]: index === lyricsLines.length - 1,
          })}
        >
          <span>{line.tibetan}</span>
          <span>{line.transliteration}</span>
          <span>{line.english}</span>
        </div>
      ))}
    </div>
  );
};

export default LyricsLinesList;
