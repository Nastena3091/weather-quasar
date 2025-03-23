<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-md">
      <q-input 
        v-model="search" 
        @keyup.enter="addCity"
        placeholder="Enter city name" 
        dark 
        borderless
      >
        <template v-slot:before>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-btn @click="addCity" round dense flat icon="add" />
        </template>
      </q-input>
    </div>

    <div class="col q-mt-md">
      <q-list bordered separator class="city-list">
        <q-item v-for="(city, index) in cities" :key="index" clickable v-ripple @click="getWeatherByCity(city)">
          <q-item-section>{{ city }}</q-item-section>
          <q-item-section side>
            <q-btn color="red" round dense flat icon="delete" @click.stop="removeCity(index)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-btn @click="getLocation" color="primary" class="q-mt-md">Знайти моє місцезнаходження</q-btn>

    <template v-if="weatherData">
      <div class="col text-white text-center q-mt-md">
        <h2>{{ weatherData.name }}</h2>
        <p class="text-h6">{{ weatherData.weather[0].description }}</p>
        <q-img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" width="100px" />
        <p class="text-h1 text-weight-thin q-my-md">
          {{ Math.round(weatherData.main.temp) }}°C
        </p>
        <div class="q-mt-md weather-details">
          <p>💨 Вітер: {{ weatherData.wind.speed }} м/с</p>
          <p>💧 Вологість: {{ weatherData.main.humidity }}%</p>
          <p>🌡 Тиск: {{ weatherData.main.pressure }} мм</p>
        </div>
      </div>

      <!-- Слайдер для погодинного прогнозу -->
      <div class="hourly-container">
        <div class="hourly-forecast">
          <div v-for="(hour, index) in hourlyForecast" :key="index" class="hour-card">
            <p class="time">{{ new Date(hour.dt * 1000).toLocaleTimeString("ua-UA", { hour: '2-digit', minute: '2-digit' }) }}</p>
            <q-img :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`" width="50px" />
            <p class="temp">{{ Math.round(hour.main.temp) }}°C</p>
          </div>
        </div>
      </div>

      <!-- Прогноз на тиждень -->
      <q-list v-if="weeklyForecast.length" bordered class="q-mt-md text-white text-center">
        <q-item v-for="(day, index) in weeklyForecast" :key="index">
          <q-item-section>{{ new Date(day.dt * 1000).toLocaleDateString("ua-UA") }}</q-item-section>
          <q-item-section>
            <q-img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`" width="50px" />
          </q-item-section>
          <q-item-section>🌡 {{ Math.round(day.temp.min) }}°C - {{ Math.round(day.temp.max) }}°C</q-item-section>
        </q-item>
      </q-list>
    </template>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { api, API_KEY } from "boot/axios";

export default {
  name: "IndexPage",
  setup() {
    const search = ref("");
    const cities = ref(JSON.parse(localStorage.getItem("cities")) || []);
    const weatherData = ref(null);
    const hourlyForecast = ref([]);
    const weeklyForecast = ref([]);
    const activeSlide = ref(0);

    const getLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await api.get(`weather`, {
              params: { lat, lon, appid: API_KEY, units: "metric", lang: "ua" },
            });
            weatherData.value = response.data;
          } catch (error) {
            console.error("Помилка отримання погоди за місцем розташування:", error);
          }
        },
        (error) => {
          console.error("Помилка доступу до геолокації:", error);
        }
      );
    };

    const saveToCache = (key, data) => {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    };

    const getFromCache = (key, maxAge = 3600000) => {
      const cached = localStorage.getItem(key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < maxAge) {
          return parsed.data;
        }
      }
      return null;
    };

    const getWeatherByCity = async (city) => {
      const cacheKey = `weather-${city}`;
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        weatherData.value = cachedData;
      } else {
        try {
          const response = await api.get(`weather`, {
            params: { q: city, appid: API_KEY, units: "metric", lang: "ua" },
          });
          weatherData.value = response.data;
          saveToCache(cacheKey, weatherData.value);
        } catch (error) {
          console.error("Помилка отримання погоди:", error);
        }
      }
      getHourlyForecast(city);
      getWeeklyForecast(city);
    };

    const getHourlyForecast = async (city) => {
      const cacheKey = `hourly-${city}`;
      const cachedData = getFromCache(cacheKey);
      
      if (cachedData) {
        hourlyForecast.value = [...cachedData]; // Розпакування масиву
        console.log("Loaded from cache:", hourlyForecast.value);
        return;
      }
      
      try {
        const response = await api.get(`forecast/hourly`, {
          params: { q: city, appid: API_KEY, lang: "ua", units: "metric" },
        });

        hourlyForecast.value = [...response.data.list.slice(0, 24)];
        console.log("Loaded from API:", hourlyForecast.value);

        saveToCache(cacheKey, hourlyForecast.value);
      } catch (error) {
        console.error("Помилка отримання погодинного прогнозу:", error);
      }
    };



    const getWeeklyForecast = async (city) => {
      const cacheKey = `weekly-${city}`;
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        weeklyForecast.value = cachedData;
        return;
      }
      try {
        const response = await api.get(`forecast/daily`, {
          params: { q: city, appid: API_KEY, lang: "ua", units: "metric", cnt: 7 },
        });
        weeklyForecast.value = response.data.list;
        saveToCache(cacheKey, weeklyForecast.value);
      } catch (error) {
        console.error("Помилка отримання прогнозу:", error);
      }
    };

    const addCity = () => {
      if (search.value && !cities.value.includes(search.value)) {
        cities.value.push(search.value);
        localStorage.setItem("cities", JSON.stringify(cities.value));
        getWeatherByCity(search.value);
        search.value = "";
      }
    };

    const removeCity = (index) => {
      cities.value.splice(index, 1);
      localStorage.setItem("cities", JSON.stringify(cities.value));
    };

    const bgClass = computed(() => (weatherData.value?.weather[0].icon.endsWith("n") ? "bg-night" : "bg-day"));

    onMounted(() => cities.value.length && getWeatherByCity(cities.value[0]));

    return { search, cities, weatherData, hourlyForecast, weeklyForecast, addCity, getWeatherByCity, removeCity, getLocation, bgClass, activeSlide };
  },
};
</script>

<style lang="scss">
p {
    margin: 5px;
}
.q-page {
  background: linear-gradient(to bottom, #136a8a, #267871);
  &.bg-night {
    background: linear-gradient(to bottom, #232526, #414345);
  }
  &.bg-day {
    background: linear-gradient(to bottom, #00b4db, #0083b0);
  }
}
.city-list {
  max-width: 400px;
  margin: auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
}
.weather-details {
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  display: inline-block;
}
.hourly-container {
  width: 100%;
  overflow-x: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}


.hourly-forecast {
  display: flex;
  gap: 15px;
  padding-bottom: 10px;
}

.hour-card {
  min-width: 100px;
  padding: 12px;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: white;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.time {
  font-weight: bold;
  font-size: 0.9rem;
}

.temp {
  font-size: 1.2rem;
  font-weight: bold;
}


</style>
