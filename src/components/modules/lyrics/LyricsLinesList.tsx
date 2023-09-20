import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
import WarningTriangleIcon from '../../../icons/WarningTriangleIcon';
import LengthIcon from '../../../icons/LengthIcon';
import SplitIcon from '../../../icons/SplitIcon';
import ImageIcon from '../../../icons/ImageIcon';

const MAX_SAFE_LINE_LENGTH = 80;
const TIBETAN_EOL = ' །';
const TIBETAN_EOL_ALT = '།།';

interface Warnings {
  broken: number;
  long: number;
  splitable: number;
  images: number;
}

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
      if (currentLineElement) {
        currentLineElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentLineIndex, settings.autoFollowLyricsList]);

  const isNextLineConsecutive = useCallback(
    (lineIndex: number) => {
      const currentLine = lyricsLines[lineIndex];
      const nextLine = lyricsLines[lineIndex + 1];
      return currentLine && nextLine && currentLine.endTime === nextLine.startTime;
    },
    [lyricsLines]
  );

  const isLineSafeLength = ({ tibetan = '', english = '', transliteration = '' }: LyricsLine) => {
    return (
      tibetan.length <= MAX_SAFE_LINE_LENGTH &&
      english.length <= MAX_SAFE_LINE_LENGTH &&
      transliteration.length <= MAX_SAFE_LINE_LENGTH
    );
  };

  const isLineSplitable = ({ tibetan = '' }: LyricsLine) => {
    const eolCount = (tibetan.match(new RegExp(TIBETAN_EOL, 'g')) || []).length;
    const eolAltCount = (tibetan.match(new RegExp(TIBETAN_EOL_ALT, 'g')) || []).length;
    return eolCount + eolAltCount > 1;
  };

  const warnings: Warnings = useMemo(() => {
    let broken = 0;
    let long = 0;
    let splitable = 0;
    let images = 0;
    lyricsLines.forEach((line, index) => {
      if (!isLineSafeLength(line)) {
        long++;
      }
      if (index < lyricsLines.length - 1 && !isNextLineConsecutive(index)) {
        broken++;
      }
      if (isLineSplitable(line)) {
        splitable++;
      }
      if (line.image) {
        images++;
      }
    });
    return {
      broken,
      long,
      splitable,
      images,
    };
  }, [isNextLineConsecutive, lyricsLines]);

  return (
    <>
      <ul className={styles.warningsList}>
        <li title="Broken lines">
          <WarningTriangleIcon className={styles.timeWarningIcon} />
          <span>{warnings.broken}</span>
        </li>
        <li title="Long lines">
          <LengthIcon className={styles.lengthIcon} />
          <span>{warnings.long}</span>
        </li>
        <li title="Splitable lines">
          <SplitIcon className={styles.splitableIcon} />
          <span>{warnings.splitable}</span>
        </li>
        <li title="Images">
          <ImageIcon className={styles.imageIcon} />
          <span>{warnings.images}</span>
        </li>
      </ul>
      <ul className={styles.lyricsList} ref={rootRef}>
        {lyricsLines.map((line, index) => (
          <li key={`lyricsLine-${index}`} className={styles.lyricsLine}>
            <button
              className={clsx(styles.lyricsLineText, {
                [styles.isActive]: index === activeLyricsLineIndex,
              })}
              onClick={() => handleLineClick(line)}
            >
              <div className={styles.timecodeRow}>
                <span className={styles.lyricsTimecode}>
                  {getSecondsAsTimecode(line.startTime)} - {getSecondsAsTimecode(line.endTime)}
                </span>
                {index < lyricsLines.length - 1 && !isNextLineConsecutive(index) && (
                  <WarningTriangleIcon className={styles.timeWarningIcon} />
                )}
                {!isLineSafeLength(line) && <LengthIcon className={styles.lengthIcon} />}
                {isLineSplitable(line) && <SplitIcon className={styles.splitableIcon} />}
                {line.image && <ImageIcon className={styles.imageIcon} />}
              </div>
              <span className={styles.tibetan}>{line.tibetan}</span>
              <span className={styles.transliteration}>{line.transliteration}</span>
              <span className={styles.english}>{line.english}</span>
            </button>
            <div>
              <Button className={styles.actionButton} onClick={() => handleEditClick(index)}>
                {index === activeLyricsLineIndex ? (
                  <CloseIcon width={16} />
                ) : (
                  <EditIcon width={16} />
                )}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LyricsLinesList;
