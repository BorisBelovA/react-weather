// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Weather from '../components/Weather/Weather';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles['weather-widget-container']}>
     <Weather></Weather>
    </div>
  );
}

export default App;
