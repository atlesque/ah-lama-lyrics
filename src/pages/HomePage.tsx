import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.root}>
      <audio controls src="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3">
        <a href="/src/assets/audio/guru_yoga_lama_achuk_tibetan_web.mp3">Download audio</a>
      </audio>
    </div>
  );
};

export default HomePage;
