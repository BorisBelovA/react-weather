import React, { FC } from 'react';
import './Forecast-days.scss';
import * as models from 'models';

interface ForecastDaysProps {
  forecastDays: models.Forecastday[]
}

const getDayOfWeek = (numberOfDay: number): string => {
  switch (numberOfDay) {
    case 0: return 'Mon';
    case 1: return 'Tue';
    case 2: return 'Wed';
    case 3: return 'Thu';
    case 4: return 'Fri';
    case 5: return 'Sat';
    case 6: return 'Sun';
    default: throw new Error('Incorrect day of week');
  }
}


const ForecastDay: FC<{ info: models.Forecastday }> = (props: { info: models.Forecastday }) => (
  <div className='ForecastDay'>
    <p className='ForecastDayOfWeekTitle'>{getDayOfWeek(props.info.date.getDay())}</p>
    <img src={props.info.day.condition.icon} alt="" />
    <p className='ForecastDayOfWeekTemp'>{ props.info.day.avgTempC }°c</p>
  </div>
)

const ForecastDays: FC<ForecastDaysProps> = (props: ForecastDaysProps) => (
  <div className="ForecastDays">
    {props.forecastDays.map((d, idx) => <ForecastDay key={idx} info={d}></ForecastDay>)}
  </div>
);

export default ForecastDays;
