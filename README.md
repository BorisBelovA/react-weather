

<h1 align="center">React weather app</h1>

<p align="center">
  <a href="https://github.com/adisreyaj/moovee/blob/master/LICENSE.md">
    <img alt="License: MIT License" src="https://img.shields.io/badge/license-MIT License-yellow.svg" target="_blank" />
  </a>
    <img src="https://img.shields.io/badge/React-v18-blue" alt="angular">
  </a>
</p>

> A small and convenient widget for viewing the weather in your city. Don't get caught in the rain ;)

# Main screen
![Main screen](./assets/main-screen.png 'Main screen')

## 🔥 Features
- Powered by React
- Powered by [WeatherApi](https://www.weatherapi.com/)

## 🚀 Usage

### Installation
Clone repository to your local machine and run `npm install` at the root of the project.

### Before first run
open **_environment.ts_** file and put your [WetaherApi](https://www.weatherapi.com/) key into this section:
`export const environment = {  
  production: false,
  REACT_APP_WEATHER_API_KEY: YOUR_WEATHER_API_KEY_HERE
};`

### When all the preparations are completed
Start the application by entering `npm start` command in your command line. Open new page in your browser with next url `http://localhost:4200/`, after build completion.
