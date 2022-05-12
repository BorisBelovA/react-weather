import { Day } from './day'
import { Astro } from './astro';

export interface Forecastday {
  date: Date;
  day: Day;
  astro: Astro;
  // hour: Hour[];
}

export interface Forecast {
  forecastday: Forecastday[];
}