<script setup>
  import { onMounted, ref } from 'vue';
  import { computed } from 'vue';
  import DaySelector from './DaySelector.vue';
  import './ForecastDisplay.css'
  import './DaySelector.css'
  import { useI18n } from 'vue-i18n';
  import ExpandableBox from './ExpandableBox.vue';

  const {forecast,gmtOffset}=defineProps(['forecast','gmtOffset']);
  class DateObj{
    constructor(pos,value){
      this.value=value;
      this.pos=pos;
    }
  }

  const currentCardId=ref(0);
  const currentDate=new Date();
  const isTimeCurrent=ref(true);
  const {locale}=useI18n();
  const list=computed(()=>[0,1,2,3,4,5].map((value)=>new DateObj(value,new Date(currentDate.getTime()+value*(24*60*60*1000)).toLocaleDateString(locale.value=='en'?'en-en':'ru-ru'))))
  const currentDayValue=ref(0);
  const currentDay=computed({
    get(){
      return list.value[currentDayValue.value]
    },
    set(newValue){
      currentDayValue.value=newValue.pos;
    }
  });
  const filteredForecast=computed(()=>{
    return forecast.filter((item)=>formatDateToLocal(item.dt)==list.value[currentDayValue.value].value);
  })
  const isCelsius=ref(true);

  function formatDateToLocal(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString(locale.value=='en'?'en-en':'ru-ru'); // Форматируем дату
  }

  function formatTimeToLocal(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString(locale.value=='en'?'en-en':'ru-ru'); // Форматируем дату
  }

  function calcGmtOffset(){
    let gmtOffsetFormatted='';
    if (gmtOffset>0){
      gmtOffsetFormatted=Math.abs(gmtOffset)>=10?`+${gmtOffset}:00`:`+0${gmtOffset}:00`;
    }
    else{
       gmtOffsetFormatted=Math.abs(gmtOffset)>=10?`${gmtOffset}:00`:`-0${Math.abs(gmtOffset)}:00`;
    }
    return gmtOffsetFormatted;;
  }

  function formatTime(timestamp){
    const gmtOffsetFormatted=calcGmtOffset();
    console.log(gmtOffset);
    return new Date(new Date(timestamp * 1000).toISOString().replace('Z','')+gmtOffsetFormatted).toLocaleTimeString(locale.value);
  }

  function onLeftArrowClick(event){
    currentCardId.value=(currentCardId.value-1);
    if (currentCardId.value<0)
      currentCardId.value=filteredForecast.value.length-1;
    document.getElementById(currentCardId.value)?.scrollIntoView({behavior:'smooth',inline:'center'})
  }

  function onRightArrowClick(event){
    currentCardId.value=(currentCardId.value+1)%filteredForecast.value.length;
    document.getElementById(currentCardId.value)?.scrollIntoView({behavior:'smooth',inline:'center'})
  }

  function handleTimeClick(event){
    isTimeCurrent.value=!isTimeCurrent.value;
  }

  function convergeTemperature(event){
    isCelsius.value=!isCelsius.value;
  }

  onMounted(()=>{
    document.getElementById(0)?.scrollIntoView({behavior:'smooth',inline:'center',block:'center'});
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
        <p class="forecast-display__time" @click="handleTimeClick">{{isTimeCurrent?formatTimeToLocal(day.dt): formatTime(day.dt) }}</p>
        <p class="forecast-display__time__caption">{{isTimeCurrent?$t('byCurrentTime'):'По локальному времени'}}</p>
        <img :src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="weather icon">
      <div class="weather-display__temp">
        <p class="weather-display__temp__value">{{ isCelsius?day.main.temp : Math.round((day.main.temp*1.8+32+Number.EPSILON)*100)/100 }}</p>
        <p class="weather-display__temp__sign" @click="convergeTemperature" style="font-size: 14px;">{{isCelsius?'°C':'°F'}}</p>
      </div>
        <ExpandableBox contentHeight="225">
          <p>{{$t('description')}}: {{ day.weather[0].description }}</p>
          <p>{{$t('humidity')}}: {{ day.main.humidity }}%</p>
          <p>{{$t('pressure')}}: {{ day.main.pressure }} гПа</p>
          <p>{{$t('wind')}}: {{ day.wind.speed }} м/с, {{$t('direction')}} {{ day.wind.deg }}°</p>
        </ExpandableBox>
      </div>
    </div>
    <div class="forecast-arrow-right" @click="onRightArrowClick" :style="filteredForecast.length<=1?'pointer-events: none;':''">
      <svg role="img" :style="filteredForecast.length<=1?'stroke:var(--color-surface-a10)':''" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="chevronRightIconTitle" stroke="#c571b2" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#c571b2"> <title id="chevronRightIconTitle">Chevron Right</title> <polyline points="10 6 16 12 10 18 10 18"/> </svg>
    </div>
  </div>
  </template>