import react, { useState } from "react";

function Weather() {
  const [data, setData] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const link = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "d4d3354a520b51accfd46a71feaee1d4";
  function query(city) {
    setInputValue("");
    if (city !== "") {
      fetch(`${link}?q=${city}&lang=ru&appid=${apiKey}`)
        .then((response) => {
          return response.json();
        })
        .then(
          (data) => {
            setData(data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  return (
    <>
      <div className="container">
        <div className="weather">
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Город"
                aria-label="Город"
                aria-describedby="basic-addon2"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => query(inputValue)}
                >
                  Найти
                </button>
              </div>
            </div>
          </form>
          {data == false ? (
            <span className="text">
              Введите название города на русском языке
            </span>
          ) : data.cod == 404 ? (
            <span className="text">Вы ввели неверное название города</span>
          ) : (
            <div className={"weather-info" + (data != "" && " show")}>
              <div className="weather-info_city">{data.name}</div>
              <div className="weather-info_degree">
                <img
                  className="weather-info_icon"
                  src={`/weather-app/icon/${data.weather[0].icon}.png`}
                />
                {Math.round(data.main.temp - 273.15)} &#176;
              </div>
              <div className="weather-info_info-wrapper">
                <div className="weather-info_column">
                  <div className="weather-info_column-content">
                    <span>Ощущается как</span>
                    <span>
                      {Math.round(data.main.feels_like - 273.15)} &#176;
                    </span>
                  </div>
                  <div className="weather-info_column-content">
                    <span>Влажность</span>
                    <span>{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="weather-info_column">
                  <div className="weather-info_column-content">
                    <span>Давление</span>
                    <span>{data.main.pressure} мм рт ст</span>
                  </div>
                  <div className="weather-info_column-content">
                    <span>Ветер</span>
                    <span>{Math.round(data.wind.speed)} м/с</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
