import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { lyricsLinesAtom } from '../atoms/lyrics';
import { LyricsLine } from '../types/lyrics';
import styles from './LyricsFileActions.module.scss';
import Button from './shared/Button';
import Text from './shared/Text';

const LyricsFileActions = () => {
  const [lyricsLines, setLyricsLines] = useAtom(lyricsLinesAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleExportClick = () => {
    const content = JSON.stringify(lyricsLines);
    const filename = `ah-lama-lyrics-${new Date().toISOString()}.json`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImportClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      return;
    }
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        try {
          const parsedData = JSON.parse(fileContent) as LyricsLine[];
          if (
            typeof parsedData === 'object' &&
            parsedData.length &&
            parsedData.length > 0 &&
            parsedData[0].english !== undefined
          ) {
            setLyricsLines(parsedData);
            setError('');
          } else {
            throw new Error('Invalid JSON object');
          }
        } catch (error) {
          setError(`Error parsing JSON: ${error}`);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.root}>
      <Button onClick={handleExportClick}>Export</Button>
      <Button onClick={handleImportClick}>Import</Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      {error && <Text color="error">{error}</Text>}
    </div>
  );
};

export default LyricsFileActions;
