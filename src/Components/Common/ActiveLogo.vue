<script setup lang="ts">

// event handlers
function logo_image_clcik_handler() {
    window.location = '/' as any;
}

</script>

<template>
    <img src="/images/logo.png" alt="logo" style="width: 180px; cursor: pointer;" @click="logo_image_clcik_handler()" />
</template>