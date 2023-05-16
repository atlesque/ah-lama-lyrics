import { useAtom } from 'jotai';
import { settingsAtom, showSettingsModalAtom } from '../atoms/settings';
import AudioPlayer from '../components/modules/audio/AudioPlayer';
import LyricsFileActions from '../components/modules/lyrics/LyricsFileActions';
import LyricsForm from '../components/modules/lyrics/LyricsForm';
import LyricsLinesList from '../components/modules/lyrics/LyricsLinesList';
import Presentation from '../components/modules/presentation/Presentation';
import styles from './HomePage.module.scss';
import SettingsModal from '../components/modules/settings/SettingsModal';
import Button from '../components/shared/Button';
import PresentationControls from '../components/modules/presentation/PresentationControls';
import { isPlayingAtom } from '../atoms/presentation';

const HomePage = () => {
  const [showSettingsModal, setShowSettingsModal] = useAtom(showSettingsModalAtom);
  const [settings] = useAtom(settingsAtom);
  const [isPlaying] = useAtom(isPlayingAtom);

  const handleCloseSettingsModal = (): void => {
    setShowSettingsModal(false);
  };

  const handleSettingsClick = (): void => {
    setShowSettingsModal(true);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.pageContainer}>
          {settings.showPresentationControls && <PresentationControls />}
          <Presentation />
          <AudioPlayer />
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
