<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// lib
import { get_lang } from '../../Lib/lang';

// models 
import { lecture_material } from '../../Models/lecture';

// UI components
import LoadingScreen from '../Common/LoadingScreen.vue';

// refs
const is_loading = ref(true);

// load system language
const lang = get_lang();

// props
defineProps<{ mat_item: lecture_material }>();

onMounted(() => {
    (document.querySelector('#vid_iframe') as HTMLElement).onload = () => { is_loading.value = false };
});
</script>

<template>
    <div id="vv_main_cont">
        <LoadingScreen v-if="is_loading" />
        <div id="vid_frame_cont">
            <br />
            <iframe id="vid_iframe" width="700" height="500" :src="mat_item.mat_link" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
        <h3 id="vv_vid_name">{{ `${lang == 'en' ? mat_item.name_en : mat_item.name_ar}` }}</h3>
    </div>
</template>

<style scoped>
#vv_main_cont {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 600px) {
    #vid_iframe {
        width: 300px;
        height: 200px;
    }
}
</style>