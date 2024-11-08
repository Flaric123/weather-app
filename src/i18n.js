import { createI18n } from "vue-i18n";

const messages={
    en:{
        description:'Description',
        temperature:'Temperature',
        humidity:'Humidity',
        pressure:'Pressure',
        wind:'Wind',
        direction:'direction',
        weather:'Weather in',
        byCurrentTime:'According to the current time',
        currentWeather:'Current weather',
    },
    ru:{
        description:'Описание',
        temperature:'Температура',
        humidity:'Влажность',
        pressure:'Давление',
        wind:'Ветер',
        direction:'направление',
        weather:'Погода в ',
        byCurrentTime:'По текущему времени',
        currentWeather:'Текущая погода',
    }
}

const i18n=createI18n({
    locale:'ru',
    messages
})

export default i18n;