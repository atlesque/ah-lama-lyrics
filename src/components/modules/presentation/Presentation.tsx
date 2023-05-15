import { useAtom } from 'jotai';
import { currentLyricsLineAtom } from '../../../atoms/lyrics';
import styles from './Presentation.module.scss';

const Presentation = () => {
  const [currentLine] = useAtom(currentLyricsLineAtom);

  return (
    <div className={styles.root}>
      <div className={styles.horizontalDecoration}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.verticalDecoration}></div>
        <div className={styles.content}>
          <span className={styles.textTibetan}>{currentLine?.tibetan}</span>
          <span className={styles.textTransliteration}>{currentLine?.transliteration}</span>
          <span className={styles.textEnglish}>{currentLine?.english}</span>
        </div>
        <div className={styles.verticalDecoration}></div>
      </div>
      <div className={styles.horizontalDecoration}></div>
    </div>
  );
};

export default Presentation;
