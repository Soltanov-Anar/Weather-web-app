import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "cf2ff9413ab14d37b65c832d3c428f67";


class AppSoltanov extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    pressure: undefined,
    error: undefined,
    cod: undefined
  }

  gettingWeather = async (event) => {
    event.preventDefault();
    let city = event.target.elements.city.value;

    if(city) {
      const api_url = await
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();
      console.log(data);

      let sunriseInSec = data.sys.sunrise;
      let sunriseDate = new Date(sunriseInSec * 1000);
      let timeSunrise = sunriseDate.toLocaleTimeString();

      let sunsetInSec = data.sys.sunset;
      let sunsetDate = new Date(sunsetInSec * 1000);
      let timeSunset = sunsetDate.toLocaleTimeString();

      this.setState({
        temp: parseFloat((data.main.temp).toFixed(1)),
        city: data.name,
        country: data.sys.country,
        sunrise: timeSunrise,
        sunset: timeSunset,
        pressure: data.main.pressure,
        error: undefined,
        cod: data.sys.cod
        });
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          pressure: undefined,
          error: "Введите название города!",
          cod: "Город не найден!"
        })
      }
    }


  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod = {this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                  pressure={this.state.pressure}
                  cod={this.state.cod}
              />
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
};

export default AppSoltanov;
