import AudioPlayer from '../components/modules/audio/AudioPlayer';
import LyricsFileActions from '../components/modules/lyrics/LyricsFileActions';
import LyricsForm from '../components/modules/lyrics/LyricsForm';
import LyricsLinesList from '../components/modules/lyrics/LyricsLinesList';
import styles from './HomePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <div className={styles.pageContainer}>
      <AudioPlayer />
      <div className={styles.lyricsWrapper}>
        <LyricsForm />
        <div className={styles.listWithActions}>
          <LyricsLinesList />
          <LyricsFileActions />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
