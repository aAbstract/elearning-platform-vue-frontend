<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// models
import { lecture_material } from '../../Models/lecture';

// UI componetns
import LoadingScreen from '../Common/LoadingScreen.vue';

// refs
const is_loading = ref(true);

defineProps<{ mat_item: lecture_material }>();

onMounted(() => {
    (document.querySelector('#doc_iframe') as HTMLElement).onload = () => { is_loading.value = false; };
});
</script>

<template>
    <div id="doc_main_cont">
        <LoadingScreen v-if="is_loading" />
        <iframe :src="mat_item.mat_link" frameborder="0" id="doc_iframe" allow="autoplay"></iframe>
    </div>
</template>

<style scoped>
#doc_main_cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#doc_iframe {
    width: 100%;
    height: 100%;
}
</style>