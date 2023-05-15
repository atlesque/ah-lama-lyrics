import { useAtom } from 'jotai';
import { currentLyricsLineAtom } from '../../../atoms/lyrics';
import styles from './Presentation.module.scss';
import { settingsAtom } from '../../../atoms/settings';

const Presentation = () => {
  const [currentLine] = useAtom(currentLyricsLineAtom);
  const [settings] = useAtom(settingsAtom);

  return (
    <div className={styles.root}>
      <div className={styles.horizontalDecoration}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.verticalDecoration}></div>
        <div className={styles.content} style={{ zoom: settings.presentationZoomLevel }}>
          {settings.showTibetan && (
            <span className={styles.textTibetan}>{currentLine?.tibetan}</span>
          )}
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
