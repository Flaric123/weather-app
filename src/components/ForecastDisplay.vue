<script setup>
  import { onMounted, ref } from 'vue';
  import { computed } from 'vue';
  import DaySelector from './DaySelector.vue';
  import './ForecastDisplay.css'
  import './DaySelector.css'

  const props=defineProps(['forecast']);
  const currentCardId=ref(0);
  const currentDate=new Date()
  const list=[0,1,2,3,4,5].map((value)=>new Date(currentDate.getTime()+value*(24*60*60*1000)).toLocaleDateString())
  const currentDay=ref(currentDate.toLocaleDateString());
  const filteredForecast=computed(()=>{
    return props.forecast.filter((item)=>formatDate(item.dt)==currentDay.value)
  })

  function formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString(); // Форматируем дату
  }

  function formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString(); // Форматируем дату
  }

  function onLeftArrowClick(event){
    currentCardId.value=(currentCardId.value-1)%filteredForecast.value.length;
    if (currentCardId.value<0)
      currentCardId.value=filteredForecast.value.length-1;
    document.getElementById(currentCardId.value)?.scrollIntoView({behavior:'smooth'})
  }

  function onRightArrowClick(event){
    currentCardId.value=(currentCardId.value+1)%filteredForecast.value.length;
    document.getElementById(currentCardId.value)?.scrollIntoView({behavior:'smooth'})
  }

  onMounted(()=>{
    document.getElementById(currentCardId.value)?.scrollIntoView({behavior:'smooth'});
    console.log(filteredForecast.value[0].dt_txt)
  })

</script>

<template>
  <div class="day-selector__group">
    <DaySelector v-for="(date,index) in list" :key="index" :id="index" :value="date" v-model="currentDay"/>
  </div>
  <div class="forecast">
    <div class="forecast-arrow-left" @click="onLeftArrowClick" :style="filteredForecast.length<=1?'pointer-events: none;':''">
      <svg role="img" :style="filteredForecast.length<=1?'stroke:var(--color-surface-a10)':''" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="chevronLeftIconTitle" stroke="#c571b2" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#c571b2"> <title id="chevronLeftIconTitle">Chevron Left</title> <polyline points="14 18 8 12 14 6 14 6"/> </svg>
    </div>
    <div class="forecast-display">
      <div v-for="(day, index) in filteredForecast" :key="index" class="forecast-day" :id="index">
        <p>{{ formatDate(day.dt) }}</p>
        <p>{{ formatTime(day.dt) }}</p>
        <p>Температура: {{day.main.temp}} °C</p>
        <p>Описание: {{ day.weather[0].description }}</p>
        <img :src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="weather icon">
      </div>
    </div>
    <div class="forecast-arrow-right" @click="onRightArrowClick" :style="filteredForecast.length<=1?'pointer-events: none;':''">
      <svg role="img" :style="filteredForecast.length<=1?'stroke:var(--color-surface-a10)':''" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="chevronRightIconTitle" stroke="#c571b2" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#c571b2"> <title id="chevronRightIconTitle">Chevron Right</title> <polyline points="10 6 16 12 10 18 10 18"/> </svg>
    </div>
  </div>
  </template>