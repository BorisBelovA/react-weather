import React, { useEffect, useState } from 'react';
import { ForecastApiResponse } from 'dto';
import * as models from 'models';
import * as dto from 'dto';

import './Weather.scss';
import LocationInfo from '../Location-info/Location-info';
import CurrentWeatherSummary from '../CurrentWeatherSummary/CurrentWeatherSummary';
import ForecastDays from '../Forecast-days/Forecast-days';
import { environment } from 'src/environments/environment';

interface WeatherProps { }
type Props = {};

const mapLocationToModel = (location: dto.Location): models.Location => ({
  country: location.country,
  lat: location.lat,
  localtime: location.localtime,
  lon: location.lon,
  name: location.name,
  region: location.region
})

const mapConditionToModel = (condition: dto.Condition): models.Condition => ({
  icon: condition.icon,
  text: condition.text,
  code: condition.code
})

const mapCurrentToModel = (current: dto.Current): models.Current => ({
  lastUpdated: new Date(current.last_updated),
  tempCelseus: current.temp_c,
  condition: current.condition,
  windKpH: current.wind_kph,
  windDegree: current.wind_degree,
  windDir: current.wind_dir,
  pressureMb: current.pressure_mb,
  precipMm: current.precip_mm,
  humidity: current.humidity,
  cloud: current.cloud,
  feelslikeCelseus: current.feelslike_c,
  vis_km: current.vis_km,
  uv: current.uv,
  gust_kph: current.gust_kph
})

const mapDayToModel = (day: dto.Day): models.Day => ({
  maxTempC: day.maxtemp_c,
  minTempC: day.mintemp_c,
  avgTempC: day.avgtemp_c,
  maxWindKph: day.maxwind_kph,
  totalPrecipMm: day.totalprecip_mm,
  avgVisKm: day.avgvis_km,
  avgHumidity: day.avghumidity,
  dailyWillItRain: day.daily_will_it_rain,
  dailyChanceOfRain: day.daily_chance_of_rain,
  dailyWillItSnow: day.daily_will_it_snow,
  dailyChanceOfSnow: day.daily_chance_of_snow,
  condition: mapConditionToModel(day.condition),
  uv: day.uv
})

const mapAstroToModel = (astro: dto.Astro): models.Astro => ({
  sunrise: astro.sunrise,
  sunset: astro.sunset,
  moonrise: astro.moonrise,
  moonset: astro.moonset,
  moonPhase: astro.moon_phase,
  moonIllumination: astro.moon_illumination
})

const mapForecastDayToModel = (day: dto.Forecastday): models.Forecastday => ({
  date: new Date(day.date),
  day: mapDayToModel(day.day),
  astro: mapAstroToModel(day.astro)
})

type State = {
  loading: boolean;
  location: models.Location | null;
  condition: models.Condition | null;
  current: models.Current | null;
  forecastDays: models.Forecastday[]
};

const Weather = () => {

  const [state, setState] = useState<State>({
    loading: true,
    location: null,
    condition: null,
    current: null,
    forecastDays: []
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${environment.REACT_APP_WEATHER_API_KEY}&q=Moscow&days=5&aqi=no&alerts=no`
    fetch(apiUrl)
      .then(response => response.json())
      .then(
        (result: ForecastApiResponse) => {          
          setState({
            ...state,
            loading: false,
            location: mapLocationToModel(result.location),
            condition: mapConditionToModel(result.current.condition),
            current: mapCurrentToModel(result.current),
            forecastDays: result.forecast.forecastday.map(d => mapForecastDayToModel(d))
          })
        },
        (error) => {
          console.error(error)
          setState({ ...state, loading: false})
        },
      )
  }, []);

  const template = state.location 
    && state.condition
    && state.current
    ? (
      <div className="Weather">
        <div className='WeatherCurrentDay'>
          <LocationInfo city={state.location!.name}
            icon={state.condition!.icon}
            conditionText={state.condition!.text}></LocationInfo>
          <CurrentWeatherSummary conditions={state.current!}></CurrentWeatherSummary>
        </div>
        <ForecastDays forecastDays={state.forecastDays}></ForecastDays>
      </div>
    )
    : (
      <div>
        <p>Загрузка</p>
      </div>
    )

  return template;
}

export default Weather;
