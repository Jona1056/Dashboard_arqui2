
import TemperatureChart from "../components/TemperatureChart"; // Importa otros componentes de gráfico
import HumidityChart from "../components/HumidityChart";
import DistanceChart from "../components/DistanceChart";
import LightIntensityChart from "../components/LightIntensityChart";
import CO2LevelsChart from "../components/CO2LevelsChart";
import axios from "axios";
import { useEffect } from "react";
import "../styles/Dashboard.css"; 
import { useState } from "react";

const Dashboard = () => {
  const apiUrl = 'URL_API';
  const [selectedChart, setSelectedChart] = useState("temperature");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [timeRange, setTimeRange] = useState({ startTime: "", endTime: "" });
  const [data, setData] = useState([
    {
      Fecha: "2024-09-04",
      Hora: "12:00",
      Temperatura: "25",
      Humedad: "60",
      Distancia: "3",
      Luz: "500",
      CO2: "400",
    },
    {
      Fecha: "2024-07-04",
      Hora: "10:00",
      Temperatura: "25",
      Humedad: "60",
      Distancia: "3",
      Luz: "500",
      CO2: "400",
    },
    {
      Fecha: "2024-09-04",
      Hora: "13:00",
      Temperatura: "26",
      Humedad: "58",
      Distancia: "3.5",
      Luz: "600",
      CO2: "420",
    },
    {
      Fecha: "2024-09-04",
      Hora: "14:00",
      Temperatura: "27",
      Humedad: "57",
      Distancia: "4",
      Luz: "700",
      CO2: "450",
    },
  ]);

  // Código para consultar la API (comentado por ahora)
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(apiUrl);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error al obtener los datos:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  
  // Función para filtrar datos por rango de fechas y horas
  const filterData = (data) => {
    if (!dateRange.startDate && !dateRange.endDate && !timeRange.startTime && !timeRange.endTime) {
      // Return all data if no filters are applied
      return data;
    }
  
    return data.filter(item => {
      const itemDate = new Date(item.Fecha);
      const itemTime = item.Hora;
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      const startTime = timeRange.startTime;
      const endTime = timeRange.endTime;
  
      const isDateInRange = (dateRange.startDate ? itemDate >= startDate : true) &&
                            (dateRange.endDate ? itemDate <= endDate : true);
      const isTimeInRange = (startTime ? itemTime >= startTime : true) &&
                            (endTime ? itemTime <= endTime : true);
  
      return isDateInRange && isTimeInRange;
    });
  };

  const filteredData = filterData(data);

  return (
    <div className="container">
      <h1>Dashboard de Monitorización</h1>
      <div className="button-container">
        <button className="button_temperatura" onClick={() => setSelectedChart("temperature")}>

        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="M11,24c-6.078.117-9.334-7.638-5-11.889V5c.211-6.609,9.791-6.6,10,0v7.111C20.335,16.363,17.077,24.117,11,24ZM11,2A3,3,0,0,0,8,5v7.537a1,1,0,0,1-.332.744A5.018,5.018,0,0,0,11,22a5.018,5.018,0,0,0,3.332-8.719A1,1,0,0,1,14,12.537V5A3,3,0,0,0,11,2Zm0,18a3.007,3.007,0,0,1-1-5.829V5a1,1,0,0,1,2,0v9.171A3.007,3.007,0,0,1,11,20Zm0-4a1,1,0,0,0,0,2A1,1,0,0,0,11,16ZM21,6a3,3,0,0,1,0-6A3,3,0,0,1,21,6Zm0-4a1,1,0,0,0,0,2A1,1,0,0,0,21,2Z"/></svg>

          <span className="label">Temperatura</span>
        </button>
        <button className="button_humedad" onClick={() => setSelectedChart("humidity")}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="M10,17a1,1,0,0,1-.831-1.555l4-6a1,1,0,0,1,1.664,1.11l-4,6A1,1,0,0,1,10,17Zm9.779,3.778c6.858-7.336,1.519-14.521-4.565-19.6h0a4.947,4.947,0,0,0-6.426,0C2.706,6.231-2.63,13.491,4.222,20.778a11,11,0,0,0,15.556,0ZM13.919,2.7h0C18.7,6.777,24.43,12.966,18.364,19.364a9.043,9.043,0,0,1-12.728,0c-6.071-6.4-.325-12.6,4.445-16.662a2.958,2.958,0,0,1,3.838,0ZM8,10a1,1,0,0,0,2,0A1,1,0,0,0,8,10Zm6,6a1,1,0,0,0,2,0A1,1,0,0,0,14,16Z"/></svg>

          <span className="label">Humedad</span>
        </button>
        <button className="button_distancia" onClick={() => setSelectedChart("distance")}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="M10,17a1,1,0,0,1-.831-1.555l4-6a1,1,0,0,1,1.664,1.11l-4,6A1,1,0,0,1,10,17Zm9.779,3.778c6.858-7.336,1.519-14.521-4.565-19.6h0a4.947,4.947,0,0,0-6.426,0C2.706,6.231-2.63,13.491,4.222,20.778a11,11,0,0,0,15.556,0ZM13.919,2.7h0C18.7,6.777,24.43,12.966,18.364,19.364a9.043,9.043,0,0,1-12.728,0c-6.071-6.4-.325-12.6,4.445-16.662a2.958,2.958,0,0,1,3.838,0ZM8,10a1,1,0,0,0,2,0A1,1,0,0,0,8,10Zm6,6a1,1,0,0,0,2,0A1,1,0,0,0,14,16Z"/></svg>

          <span className="label">Distancia</span>
        </button>
        <button className="button_luz" onClick={() => setSelectedChart("light")}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="m21,18v-5c0-4.963-4.037-9-9-9S3,8.037,3,13v5c-1.654,0-3,1.346-3,3v3h24v-3c0-1.654-1.346-3-3-3ZM5,13c0-3.859,3.141-7,7-7s7,3.141,7,7v5H5v-5Zm17,9H2v-1c0-.552.448-1,1-1h18c.552,0,1,.448,1,1v1ZM2.335,6.646L.018,4.426l1.383-1.443,2.317,2.22-1.383,1.443Zm3.419-3.122l-1.212-2.717L6.368-.008l1.212,2.717-1.826.814Zm15.912,3.122l-1.383-1.443,2.317-2.22,1.383,1.443-2.317,2.22Zm-3.42-3.122l-1.826-.814L17.633-.008l1.826.814-1.213,2.717Zm-6.246,5.477v2c-1.103,0-2,.897-2,2h-2c0-2.206,1.794-4,4-4Z"/></svg>

          <span className="label">Luz</span>
        </button>
        <button className="button_CO2" onClick={() => setSelectedChart("co2")}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="M16,24a5.017,5.017,0,0,1-2.336-.578,6.271,6.271,0,0,1-5.536-.152.586.586,0,0,0-.571.027A5.028,5.028,0,0,1,.134,17.829a4.947,4.947,0,0,1,3.677-3.69,5.07,5.07,0,0,1,2.375,0,.276.276,0,0,0,.282-.074,6.034,6.034,0,0,1,8.8-.288c.065.067.217.22.734.22a4.984,4.984,0,0,1,3.9,1.874.4.4,0,0,0,.193.149,3.62,3.62,0,0,1,1.437.128,3.445,3.445,0,0,1,2.349,2.435,3.5,3.5,0,0,1-4.343,4.279c-.275-.077-.331-.03-.356-.01A4.929,4.929,0,0,1,16,24Zm-2.386-2.591a2.1,2.1,0,0,1,.988.246,3.045,3.045,0,0,0,3.291-.328,2.274,2.274,0,0,1,2.193-.386,1.5,1.5,0,0,0,1.86-1.856h0a1.457,1.457,0,0,0-.979-1.015,1.647,1.647,0,0,0-.643-.059,2.231,2.231,0,0,1-1.982-.885c-1.041-1.6-3.364-.661-4.5-1.939a4.023,4.023,0,0,0-5.865.194,2.272,2.272,0,0,1-2.265.705,3.139,3.139,0,0,0-1.449,0,3,3,0,0,0-1.613,4.781,3.069,3.069,0,0,0,3.882.712,2.582,2.582,0,0,1,2.554-.064,4.055,4.055,0,0,0,3.639.094A2.061,2.061,0,0,1,13.614,21.409ZM22.875,15a1.033,1.033,0,0,1-.251-.031,1,1,0,0,1-.718-1.219,3.073,3.073,0,0,0,.039-1.338,3.021,3.021,0,0,0-1.919-2.224,2.885,2.885,0,0,0-1.808-.077,2.041,2.041,0,0,1-2.153-.657,3.99,3.99,0,0,0-6.522.567,2.034,2.034,0,0,1-2.176,1.016,1.843,1.843,0,0,0-.887.037,2.066,2.066,0,0,0-1.368,1.267,1,1,0,0,1-1.881-.682A4.05,4.05,0,0,1,5.938,9.148a3.864,3.864,0,0,1,1.828-.07,6.012,6.012,0,0,1,9.842-.895,5.007,5.007,0,0,1,6.234,6.067A1,1,0,0,1,22.875,15ZM1.337,10a1,1,0,0,1-.9-.57A4.491,4.491,0,0,1,3.066,3.241,4.346,4.346,0,0,1,5.54,3.128c-.01,0,.026-.03.052-.083a5.51,5.51,0,0,1,9.35-.767,4.572,4.572,0,0,1,5.131,1.5c.187.239.294.251.4.264.031,0,.132.019.163.025a3.007,3.007,0,0,1,1.974,1.45,1,1,0,0,1-1.738.99,1,1,0,0,0-.657-.485A2.431,2.431,0,0,1,18.5,5.011a2.543,2.543,0,0,0-2.884-.848,1.92,1.92,0,0,1-2.263-.672,3.5,3.5,0,0,0-5.969.447A2.056,2.056,0,0,1,5.058,5.069a2.35,2.35,0,0,0-1.351.067A2.489,2.489,0,0,0,2.24,8.57a1,1,0,0,1-.9,1.43Z"/></svg>

          <span className="label">CO2</span>
        </button>
      </div>
      <div className="filter-container">
      <div className="date-row">
        <label>
          Fecha Inicio:
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
        </label>
        <label>
          Fecha Fin:
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </label>
      </div>
      <div className="time-row">
        <label>
          Hora Inicio:
          <input
            type="time"
            value={timeRange.startTime}
            onChange={(e) => setTimeRange({ ...timeRange, startTime: e.target.value })}
          />
        </label>
        <label>
          Hora Fin:
          <input
            type="time"
            value={timeRange.endTime}
            onChange={(e) => setTimeRange({ ...timeRange, endTime: e.target.value })}
          />
        </label>
      </div>
    </div>
      <div className="chart-container">
        {selectedChart === "temperature" && <TemperatureChart data={filteredData} />}
        {selectedChart === "humidity" && <HumidityChart data={filteredData} />}
        {selectedChart === "distance" && <DistanceChart data={filteredData} />}
        {selectedChart === "light" && <LightIntensityChart data={filteredData} />}
        {selectedChart === "co2" && <CO2LevelsChart data={filteredData} />}
      </div>
     
    </div>
  );
};

export default Dashboard;
