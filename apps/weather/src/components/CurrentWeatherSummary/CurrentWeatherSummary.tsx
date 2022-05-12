import React, { FC } from 'react';
import './CurrentWeatherSummary.scss';
import * as models from 'models';

interface CurrentWeatherSummaryProps {
  conditions: models.Current
}

const CurrentWeatherSummary: FC<CurrentWeatherSummaryProps> = (props: CurrentWeatherSummaryProps) => (
  <div className="CurrentWeatherSummary">
    <p>Wind speed: {props.conditions.windKpH}, km/h</p>
    <p>Wind gusts: {props.conditions.gust_kph}, km/h</p>
    <p>Precip: {props.conditions.precipMm}, mm</p>
    <p>Preassure: {props.conditions.pressureMb}, Mb</p>
    <p className='CurrentWeatherSummaryTemperature'>{props.conditions.tempCelseus} °c</p>
  </div>
);

export default CurrentWeatherSummary;
