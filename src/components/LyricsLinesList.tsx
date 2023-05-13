import { useAtom } from 'jotai';
import styles from './LyricsLinesList.module.scss';
import { lyricsLinesAtom } from '../atoms/lyrics';

const LyricsLinesList = () => {
  const [lyricsLines] = useAtom(lyricsLinesAtom);

  return (
    <div className={styles.root}>
      {lyricsLines.map((line, index) => (
        <div key={`lyricsLine-${index}`} className={styles.lyricsLine}>
          <span>{line.tibetan}</span>
          <span>{line.transliteration}</span>
          <span>{line.english}</span>
        </div>
      ))}
    </div>
  );
};

export default LyricsLinesList;
