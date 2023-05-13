import LyricsFileActions from '../components/LyricsFileActions';
import LyricsForm from '../components/LyricsForm';
import LyricsLinesList from '../components/LyricsLinesList';
import styles from './HomePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <div className={styles.pageContainer}>
      <audio
        className={styles.audioPlayer}
        controls
        src="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3"
      >
        <a href="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3">Download audio</a>
      </audio>
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
