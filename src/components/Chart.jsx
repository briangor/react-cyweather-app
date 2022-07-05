import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = (props) => {
  const weatherData = props.weatherData;
  const locationData = props.locationData;
  const main = props.main;
  const temp = props.temp;
  const humidity = props.humidity;
  const wind = props.wind;
  const cloud = props.cloud;

  let city = locationData.data.city;
  let locality = locationData.data.locality;
  let countryname = locationData.data.countryName;
  let continent = locationData.data.continent;
  let place = city || locality || countryname || continent;

  let timeArray = [];
  let localeTimeArray = [];

  timeArray = [...weatherData.data.hourly.time.slice(6, 19)];
  timeArray.forEach((el) => {
    let d = new Date(el).toLocaleTimeString();
    localeTimeArray.push(d);
  });

  const chartOptions = {
    title: {
      text: "Weather Forecast for " + place,
    },
    subtitle: {
      text:
        "Latitude: " +
        weatherData.data.latitude +
        ", Longitude: " +
        weatherData.data.longitude +
        " at " +
        weatherData.data.elevation +
        "m above sea level",
    },
    xAxis: {
      title: {
        text: "Time",
      },
      categories: [...localeTimeArray],
    },
    yAxis: {
      title: {
        text: "Units",
      },
    },
    series: [
      {
        name:
          "Temperature (" + weatherData.data.hourly_units.temperature_2m + ")",
        data: [...weatherData.data.hourly.temperature_2m.slice(6, 19)],
        type: "spline",
        color: "#F7A35C",
      },
      {
        name:
          "Humidity (" +
          weatherData.data.hourly_units.relativehumidity_2m +
          ")",
        data: [...weatherData.data.hourly.relativehumidity_2m.slice(6, 19)],
        type: "spline",
        color: "#434348",
      },
      {
        name:
          "Wind speed (" + weatherData.data.hourly_units.windspeed_120m + ")",
        data: [...weatherData.data.hourly.windspeed_120m.slice(6, 19)],
        type: "spline",
        color: "#90ED7D",
      },
      {
        name:
          "Cloud cover (" + weatherData.data.hourly_units.cloudcover_mid + ")",
        data: [...weatherData.data.hourly.cloudcover_mid.slice(6, 19)],
        type: "spline",
        color: "#7CB5EC",
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 900,
          },
          chartOptions: {
            legend: {
              enabled: true,
            },
          },
        },
      ],
    },
  };

  //unit charts
  const tempChartOptions = {
    title: {
      text: `Temparature Forecast`,
    },
    subtitle: {
      text: 'Latitude: '+weatherData.data.latitude+', Longitude: '+weatherData.data.longitude+' at '+weatherData.data.elevation+'m above sea level',
    },
    xAxis: {
      title: {
        text: 'Time',
      },
      categories: [...localeTimeArray ],
    },
    yAxis: {
      title: {
        text: weatherData.data.hourly_units.temperature_2m,
      },
    },
    series: [
      {
        name: 'Temperature ('+weatherData.data.hourly_units.temperature_2m+')',
        data: [...weatherData.data.hourly.temperature_2m.slice(6, 19)],
        type: 'spline',
        color: '#F7A35C',
      },
    ],
  };

  const humidityChartOptions = {
    title: {
      text: `Humidity Forecast`,
    },
    subtitle: {
      text: 'Latitude: '+weatherData.data.latitude+', Longitude: '+weatherData.data.longitude+' at '+weatherData.data.elevation+'m above sea level',
    },
    xAxis: {
      title: {
        text: 'Time',
      },
      categories: [...localeTimeArray ],
    },
    yAxis: {
      title: {
        text: weatherData.data.hourly_units.relativehumidity_2m,
      },
    },
    series: [
      {
        name: 'Humidity ('+weatherData.data.hourly_units.relativehumidity_2m+')',
        data: [...weatherData.data.hourly.relativehumidity_2m.slice(6, 19)],
        type: 'spline',
        color: '#434348',
      },
    ],
  };

  const windChartOptions = {
    title: {
      text: `Wind Speed Forecast`,
    },
    subtitle: {
      text: 'Latitude: '+weatherData.data.latitude+', Longitude: '+weatherData.data.longitude+' at '+weatherData.data.elevation+'m above sea level',
    },
    xAxis: {
      title: {
        text: 'Time',
      },
      categories: [...localeTimeArray ],
    },
    yAxis: {
      title: {
        text: `${weatherData.data.hourly_units.windspeed_120m}`,
      },
    },
    series: [
      {
        name: `Wind Speed (${weatherData.data.hourly_units.windspeed_120m})`,
        data: [...weatherData.data.hourly.windspeed_120m.slice(6, 19)],
        type: 'spline',
        color: '#90ED7D',
      },
    ],
  };

  const cloudChartOptions = {
    title: {
      text: `Cloud Cover Forecast`,
    },
    subtitle: {
      text: `Latitude: ${weatherData.data.latitude}, Longitude: ${weatherData.data.longitude} at ${weatherData.data.elevation}m above sea level`,
    },
    xAxis: {
      title: {
        text: 'Time',
      },
      categories: [...localeTimeArray ],
    },
    yAxis: {
      title: {
        text: `${weatherData.data.hourly_units.cloudcover_mid}`,
      },
    },
    series: [
      {
        name: `Cloud Cover (${weatherData.data.hourly_units.cloudcover_mid})`,
        data: [...weatherData.data.hourly.cloudcover_mid.slice(6, 19)],
        type: 'spline',
        color: '#7CB5EC',
      },
    ],
  };

  return (
      <>
      {main && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
      { temp && <HighchartsReact highcharts={Highcharts} options={tempChartOptions} />}
      { humidity && <HighchartsReact highcharts={Highcharts} options={humidityChartOptions} />}
      { wind && <HighchartsReact highcharts={Highcharts} options={windChartOptions} />}
      { cloud && <HighchartsReact highcharts={Highcharts} options={cloudChartOptions} />}
      </>
  )
  
};

export default Chart;
