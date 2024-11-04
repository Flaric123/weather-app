<script>
import axios from 'axios';
import { ref } from 'vue';
import CitySelector from './components/CitySelector.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';

export default {
  components: {
    CitySelector,
    WeatherDisplay
  },
  data() {
    return {
      weather: null,
      apiKey: '07ce4bef8128dbce05740fd8b99c212a'
    };
  },
  methods: {
    async getWeather(city) {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`);
        this.weather = response.data;
      } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
      }
    }
  }
};
</script>

<template>

  <WeatherDisplay v-if="weather" :weather="weather"/>
  <CitySelector @city-selected="getWeather" />
</template>