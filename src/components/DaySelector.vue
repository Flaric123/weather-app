<template>
    <div class="day-selector">
        <input type="radio" :id="'radio__id__'+id" :value="value" v-model="model"/>
        <label :for="'radio__id__'+id">{{value.value}}</label>
    </div>
</template>

<script setup>
    import './DaySelector.css'

    const model=defineModel()
    const {id,value}=defineProps(['id','value'])
</script>