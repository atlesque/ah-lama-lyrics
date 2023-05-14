import AudioPlayer from '../components/AudioPlayer';
import LyricsFileActions from '../components/LyricsFileActions';
import LyricsForm from '../components/LyricsForm';
import LyricsLinesList from '../components/LyricsLinesList';
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
