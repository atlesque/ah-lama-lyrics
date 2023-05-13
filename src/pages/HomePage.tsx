import LyricsForm from '../components/LyricsForm';
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
      <LyricsForm />
    </div>
  </div>
);

export default HomePage;
