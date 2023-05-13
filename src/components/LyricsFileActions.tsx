import { useAtom } from 'jotai';
import styles from './LyricsFileActions.module.scss';
import Button from './shared/Button';
import { lyricsLinesAtom } from '../atoms/lyrics';

const LyricsFileActions = () => {
  const [lyricsLines] = useAtom(lyricsLinesAtom);

  const handleExportClick = () => {
    const content = JSON.stringify(lyricsLines);
    const filename = `ah-lama-lyrics-${new Date().toISOString()}.txt`;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.root}>
      <Button onClick={handleExportClick}>Export</Button>
    </div>
  );
};

export default LyricsFileActions;
