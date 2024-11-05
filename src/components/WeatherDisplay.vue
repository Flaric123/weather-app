<script setup>
  import './WeatherDisplay.css'
  import { ref } from 'vue';
  
  const props=defineProps(['weather'])
  const isCelsius=ref(true);
  
  function convergeTemperature(event){
    isCelsius.value=!isCelsius.value;
  }
  
</script>

<template>
    <div class="weather-display">
      <h2>Погода в {{ weather.name }}</h2>
      <div class="weather-display__temp">
        <p>Температура: </p>
        <p class="weather-display__temp__value">{{ isCelsius?weather.main.temp : Math.round((weather.main.temp*1.8+32+Number.EPSILON)*100)/100 }}</p>
        <p class="weather-display__temp__sign" @click="convergeTemperature" style="font-size: 14px;">{{isCelsius?'°C':'°F'}}</p>
      </div>
      <p>Описание: {{ weather.weather[0].description }}</p>
      <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" alt="weather icon">
      <p>Влажность: {{ weather.main.humidity }}%</p>
      <p>Давление: {{ weather.main.pressure }} гПа</p>
      <p>Ветер: {{ weather.wind.speed }} м/с, направление {{ weather.wind.deg }}°</p>
    </div>
</template>