<script setup lang="ts">

// framework
import { useRouter } from 'vue-router';

// lib
import { get_lang, get_trans } from '../../../Lib/lang';
import { post_event } from '../../../Lib/mediator';
import { get_file_server_url } from '../../../Lib/networking';
import { get_logged_user } from '../../../Lib/auth';

// models
import { lecture_info } from '../../../Models/lecture';
import { user_type } from '../../../Models/user';

// global vars
const lang = get_lang();
const router = useRouter();
const user: user_type | null = get_logged_user();

const props = defineProps<{ lec_info_obj: lecture_info }>();

// event handlers
function lecture_card_click() {
    if (user == null) {
        router.push({ path: '/login' });
        return;
    }

    if (props.lec_info_obj.is_owned)
        router.push({ path: 'classroom', query: { lec_id: props.lec_info_obj.lec_id } })
    else
        post_event('show_lecture_details', { lec_info_obj: props.lec_info_obj });
}

</script>

<template>
    <div class="lec_card"
        :style="`direction: ${lang == 'en' ? 'ltr' : 'ltr'}; background-image: url('${get_file_server_url()}/thumbnails/${lec_info_obj.thumbnail}');`"
        @click="lecture_card_click()">
        <div class="meta_badge">
            <b class="owned_badge">{{ lec_info_obj.is_owned ? get_trans('watch') : get_trans('buy') }}</b>
            <b class="name_badge">{{ lang == 'en' ? lec_info_obj.lec_name_en : lec_info_obj.lec_name_ar }}</b>
        </div>
    </div>
</template>

<style scoped>
.lec_card {
    width: 400px;
    height: 250px;
    border-radius: 4px;
    color: white;
    padding: 0px 12px 16px 12px;
    margin-bottom: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    background-size: cover;
    margin: 16px;
}

.lec_card p {
    width: 80%;
    margin: 0px;
    line-height: 24px;
    height: 100px;
}

#lec_card_footer {
    display: flex;
    flex-direction: row;
}

.lec_card_footer_card {
    margin: 4px;
}

.lec_card_footer_card span {
    margin: 4px;
    font-weight: bold;
}

.lec_card_btn {
    cursor: pointer;
    background: transparent;
    border: 1px solid white;
    border-radius: 4px;
    color: white;
    width: 70px;
    height: 35px;
    font-weight: bold;
    margin-top: 10px;
    transition: 0.5s ease;
}

.lec_card_btn:hover {
    background: white;
    color: #18a0fb;
}

.meta_badge {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.owned_badge {
    min-width: 80px;
    height: 40px;
    background-color: #ffc600;
    color: #07294d;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 12px;
}

.name_badge {
    min-width: 80px;
    height: 40px;
    background-color: #ffc600;
    color: #07294d;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 12px;
}

@media screen and (max-width: 600px) {
    .lec_card {
        width: 100%;
    }

    .lec_card p {
        width: 100%;
    }
}
</style>