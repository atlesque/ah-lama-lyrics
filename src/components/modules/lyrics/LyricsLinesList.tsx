import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import styles from './LyricsLinesList.module.scss';
import { lastSetTimeAtom } from '../../../atoms/audio';
import { lyricsLinesAtom, selectedLyricsLineIndexAtom } from '../../../atoms/lyrics';
import { getSecondsAsTimecode } from '../../../helpers/getSecondsAsTimecode';
import { LyricsLine } from '../../../types/lyrics';
import Button from '../../shared/Button';
import CloseIcon from '../../../icons/CloseIcon';
import EditIcon from '../../../icons/EditIcon';

const LyricsLinesList = () => {
  const [lyricsLines] = useAtom(lyricsLinesAtom);
  const [lastLyricsLinesState, setLastLyricsLinesState] = useState<LyricsLine[]>(lyricsLines);
  const [activeLyricsLineIndex, setActiveLyricsLineIndex] = useAtom(selectedLyricsLineIndexAtom);
  const [, setLastSetTime] = useAtom(lastSetTimeAtom);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current && lyricsLines.length > lastLyricsLinesState.length) {
      rootRef.current.scrollTo(0, rootRef.current.scrollHeight);
      setLastLyricsLinesState(lyricsLines);
    }
  }, [lastLyricsLinesState.length, lyricsLines]);

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
          <div>
            <Button className={styles.actionButton} onClick={() => handleEditClick(index)}>
              {index === activeLyricsLineIndex ? <CloseIcon width={16} /> : <EditIcon width={16} />}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LyricsLinesList;
