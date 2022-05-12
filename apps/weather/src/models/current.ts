import { Condition } from './condition';

/**
 * Данные по погоде в настоящий момент времени
 */
export interface Current {
  /** Время последнего обновления */
  lastUpdated: Date;
  /** Температура в Цельсиях */
  tempCelseus: number;
  condition: Condition;
  /** Скорость ветра в км\ч */
  windKpH: number;
  /** Направление ветра в градусах */
  windDegree: number;
  /** Wind direction as 16 point compass. e.g.: NSW */
  windDir: string;
  /** Давление в миллибарах */  
  pressureMb: number;
  /** Количество осадков в миллиметрах */
  precipMm: number;
  /** Влажность в процентах */
  humidity: number;
  /** Облачность в процентах */
  cloud: number;
  /** По ощущениям температура в градусах Цельсия */
  feelslikeCelseus: number;
  /** Средняя видимость в километрах */
  vis_km: number;
  /** УФ-индекс */
  uv: number;
  /** Порывы ветра в километрах в час */
  gust_kph: number;
}