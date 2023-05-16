import { useAtom } from 'jotai';
import { isPlayingAtom } from '../../../atoms/presentation';
import Button from '../../shared/Button';
import styles from './PresentationControls.module.scss';

const PresentationControls = () => {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const handlePlayClick = (): void => {
    setIsPlaying(true);
  };

  const handlePauseClick = (): void => {
    setIsPlaying(false);
    // TODO: Handle pause
  };

  const handleStopClick = (): void => {
    setIsPlaying(false);
    // TODO: Handle stop
  };

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        {!isPlaying && <Button onClick={handlePlayClick}>Play</Button>}
        {isPlaying && <Button onClick={handlePauseClick}>Pause</Button>}
        <Button onClick={handleStopClick}>Stop</Button>
      </div>
    </div>
  );
};

export default PresentationControls;
