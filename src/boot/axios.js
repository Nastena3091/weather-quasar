import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5"
});

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
});

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Отримуємо ключ із .env

export { api, API_KEY }

