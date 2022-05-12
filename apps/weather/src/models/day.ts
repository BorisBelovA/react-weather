import { Condition } from './condition';

export interface Day {
  maxTempC: number;
  minTempC: number;
  avgTempC: number;
  maxWindKph: number;
  totalPrecipMm: number;
  avgVisKm: number;
  avgHumidity: number;
  dailyWillItRain: number;
  dailyChanceOfRain: number;
  dailyWillItSnow: number;
  dailyChanceOfSnow: number;
  condition: Condition;
  uv: number;
}