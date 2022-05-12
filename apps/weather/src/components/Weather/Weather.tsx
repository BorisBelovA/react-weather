import React from 'react';
import { ForecastApiResponse } from 'dto';
import * as models from 'models';
import * as dto from 'dto';

import './Weather.scss';
import LocationInfo from '../Location-info/Location-info';
import CurrentWeatherSummary from '../CurrentWeatherSummary/CurrentWeatherSummary';
import ForecastDays from '../Forecast-days/Forecast-days';

interface WeatherProps {}
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

class Weather extends React.Component<Props, State> {
  public override readonly state: State = {
    loading: true,
    location: null,
    condition: null,
    current: null,
    forecastDays: []
  };
  
  public override componentDidMount(): void {
    this.setState({ ...this.state, loading: true });
    const apiUrl ='http://api.weatherapi.com/v1/forecast.json?key=fa34f396a65145038a7190124220704&q=Moscow&days=5&aqi=no&alerts=no'
    fetch(apiUrl)
      .then(response => response.json())
      .then(
        (result: ForecastApiResponse) => { 
          console.log(result)
          this.setState({
            ...this.state,
            location: mapLocationToModel(result.location),
            condition: mapConditionToModel(result.current.condition),
            current: mapCurrentToModel(result.current),
            forecastDays: result.forecast.forecastday.map(d => mapForecastDayToModel(d))
          })
        },
        (error) => {console.error(error)},
      )
      .finally(() => {
        this.setState({ ...this.state, loading: false })
      })
  }

  public override render() {
    if (this.state.loading) {
      return (<div className="Weather">
        Loading
      </div> )
    }
    
    return (
      <div className="Weather">
        <div className='WeatherCurrentDay'>
          <LocationInfo city={this.state.location!.name}
            icon={this.state.condition!.icon}
            conditionText={this.state.condition!.text}></LocationInfo>
          <CurrentWeatherSummary conditions={this.state.current!}></CurrentWeatherSummary>
        </div>
        <ForecastDays forecastDays={this.state.forecastDays}></ForecastDays>
      </div> 
    )
  }
}

export default Weather;
