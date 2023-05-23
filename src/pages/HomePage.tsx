import { useAtom } from 'jotai';
import { useState } from 'react';
import { showSettingsModalAtom } from '../atoms/settings';
import AudioPlayer from '../components/modules/audio/AudioPlayer';
import LyricsFileActions from '../components/modules/lyrics/LyricsFileActions';
import LyricsForm from '../components/modules/lyrics/LyricsForm';
import LyricsLinesList from '../components/modules/lyrics/LyricsLinesList';
import Presentation from '../components/modules/presentation/Presentation';
import SettingsModal from '../components/modules/settings/SettingsModal';
import Button from '../components/shared/Button';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [showSettingsModal, setShowSettingsModal] = useAtom(showSettingsModalAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCloseSettingsModal = (): void => {
    setShowSettingsModal(false);
  };

  const handleSettingsClick = (): void => {
    setShowSettingsModal(true);
  };

  const handlePlayPresentation = (): void => {
    setIsPlaying(true);
  };

  const handleStopPresentation = (): void => {
    setIsPlaying(false);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.pageContainer}>
          <Presentation onPlay={handlePlayPresentation} onStop={handleStopPresentation} />
          <AudioPlayer classes={{ root: styles.audioPlayer }} />
          {!isPlaying && (
            <div className={styles.lyricsWrapper}>
              <LyricsForm />
              <div className={styles.listWithActions}>
                <LyricsLinesList />
                <LyricsFileActions />
                <Button onClick={handleSettingsClick}>Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showSettingsModal && <SettingsModal onClose={handleCloseSettingsModal} />}
    </>
  );
};

export default HomePage;
