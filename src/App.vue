<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import CitySelector from './components/CitySelector.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';
import ForecastDisplay from './components/ForecastDisplay.vue';
import { useI18n } from 'vue-i18n';
import LangSelector from './components/LangSelector.vue';
import ExpandableBox from './components/ExpandableBox.vue';

  const weather=ref(null);
  const forecast=ref([]);
  const gmtOffset=ref('Z');
  const apiKey='07ce4bef8128dbce05740fd8b99c212a';
  const geoNameUsername='geogyu789'
  const {t, locale,messages}=useI18n();

    async function getWeather(city) {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${locale.value}`);
        weather.value = response.data;

        const { lat, lon } = weather.value.coord;

        const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${locale.value}`);
        const timezoneResponse=await axios.get(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=${geoNameUsername}`)
        
        gmtOffset.value=timezoneResponse.data.gmtOffset-(-(new Date().getTimezoneOffset())/60);
        forecast.value = forecastResponse.data.list;
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
  <LangSelector v-model="locale"/>
  <div class="mainApp">
    <ForecastDisplay v-if="forecast.length" :forecast="forecast" :gmtOffset="gmtOffset"/>  
    <CitySelector @city-selected="getWeather" />
    <WeatherDisplay v-if="weather" :weather="weather"/>
  </div>
</template>