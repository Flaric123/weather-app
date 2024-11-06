<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import CitySelector from './components/CitySelector.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';
import ForecastDisplay from './components/ForecastDisplay.vue';
import { useI18n } from 'vue-i18n';
import LangSelector from './components/LangSelector.vue';


  const weather=ref(null);
  const forecast=ref([]);
  const apiKey='07ce4bef8128dbce05740fd8b99c212a';
  const {t, locale,messages}=useI18n();

    async function getWeather(city) {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${locale.value}`);
        weather.value = response.data;

        // Получаем координаты для запроса прогноза
        const { lat, lon } = weather.value.coord;

        // Запрашиваем прогноз погоды на 5 дней
        const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${locale.value}`);
        forecast.value = forecastResponse.data.list; // Сохраняем прогноз
      } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
      }
    }

    onMounted(()=>{
      getWeather('Нижний Тагил');
      console.log(messages.value);
    })
</script>

<template>
  <ForecastDisplay v-if="forecast.length" :forecast="forecast" />  
  <CitySelector @city-selected="getWeather" />
  <WeatherDisplay v-if="weather" :weather="weather"/>
  <LangSelector v-model="locale"/>
</template>