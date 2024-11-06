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
      <p class="weather-display__header-caption">Текущая погода</p>
      <div class="weather-display__temp">
        <p>{{$t('temperature')}}: </p>
        <p class="weather-display__temp__value">{{ isCelsius?weather.main.temp : Math.round((weather.main.temp*1.8+32+Number.EPSILON)*100)/100 }}</p>
        <p class="weather-display__temp__sign" @click="convergeTemperature" style="font-size: 14px;">{{isCelsius?'°C':'°F'}}</p>
      </div>
      <p>{{$t('description')}}: {{ weather.weather[0].description }}</p>
      <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" alt="weather icon">
      <p>{{$t('humidity')}}: {{ weather.main.humidity }}%</p>
      <p>{{$t('pressure')}}: {{ weather.main.pressure }} гПа</p>
      <p>{{$t('wind')}}: {{ weather.wind.speed }} м/с, {{$t('direction')}} {{ weather.wind.deg }}°</p>
    </div>
</template>