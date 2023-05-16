import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { lastSetTimeAtom } from '../../../atoms/audioPlayer';
import {
  currentLyricsLineIndexAtom,
  lyricsLinesAtom,
  selectedLyricsLineIndexAtom,
} from '../../../atoms/lyrics';
import { getSecondsAsTimecode } from '../../../helpers/getSecondsAsTimecode';
import CloseIcon from '../../../icons/CloseIcon';
import EditIcon from '../../../icons/EditIcon';
import { LyricsLine } from '../../../types/lyrics';
import Button from '../../shared/Button';
import styles from './LyricsLinesList.module.scss';
import { settingsAtom } from '../../../atoms/settings';

const LyricsLinesList = () => {
  const [lyricsLines] = useAtom(lyricsLinesAtom);
  const [lastLyricsLinesState, setLastLyricsLinesState] = useState<LyricsLine[]>(lyricsLines);
  const [activeLyricsLineIndex, setActiveLyricsLineIndex] = useAtom(selectedLyricsLineIndexAtom);
  const [, setLastSetTime] = useAtom(lastSetTimeAtom);
  const [currentLineIndex] = useAtom(currentLyricsLineIndexAtom);
  const [settings] = useAtom(settingsAtom);

  const rootRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    if (settings.autoFollowLyricsList && rootRef.current && currentLineIndex !== undefined) {
      const currentLineElement = rootRef.current.querySelectorAll('li')[currentLineIndex];
      currentLineElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentLineIndex, settings.autoFollowLyricsList]);

  return (
    <ul className={styles.root} ref={rootRef}>
      {lyricsLines.map((line, index) => (
        <li key={`lyricsLine-${index}`} className={styles.lyricsLine}>
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
        </li>
      ))}
    </ul>
  );
};

export default LyricsLinesList;
