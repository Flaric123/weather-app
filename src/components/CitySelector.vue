<script>
import './CitySelector.css'

export default {
  data() {
    return {
      cities: ['Москва', "Екатеринбург", "Нижний Тагил", "Санкт-Петербург", 'Лондон', 'Нью-Йорк'],
      selectedCity: "Нижний Тагил"
    };
  },
  methods: {
    fetchWeather() {
      this.$emit('city-selected', this.selectedCity);
    }
  }
};
</script>

<template>
    <div class="city-selector">
      <select v-model="selectedCity" @change="fetchWeather">
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>
</template>