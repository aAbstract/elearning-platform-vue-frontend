<script setup lang="ts">

// primevue
import ProgressSpinner from 'primevue/progressspinner';

</script>

<template>
    <div id="loading_screen_cont">
        <ProgressSpinner />
        <h3>Loading...</h3>
    </div>
</template>

<style scoped>
#loading_screen_cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>