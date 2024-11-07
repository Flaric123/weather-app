<template>
    <div :class="`expandable-box${isExpanded?' expanded':''}`">
        <div class="expandable-box__header" @click="handleClick">
            <p>...</p>
        </div>
        <div :class="isExpanded?'expandable-box__content expanded':'expandable-box__content'" :style="isExpanded?`height:${contentHeight}px`:'height:0px'">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import './ExpandableBox.css'
    const {contentHeight=200}=defineProps(['contentHeight']);
    const isExpanded=ref(false)

    function handleClick(event){
        isExpanded.value=!isExpanded.value;
    }
</script>

<style lang="css" module>
    
</style>