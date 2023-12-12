<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// primevue
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';

// lib
import { subscribe } from '../../Lib/mediator';
import { get_lang, get_trans, get_trans_entrop } from '../../Lib/lang';
import { $ } from '../../Lib/dom';
import { get_file_server_url } from '../../Lib/networking';

// models
import { lecture_info, video_meta_data, document_meta_data, quiz_meta_data } from '../../Models/lecture';

// API
import { get_content_meta, buy_lecture } from '../../API/lectures';

// global vars
const router = useRouter();

// refs
const lec_id = ref(0);
const show_lecture_details = ref(false);
const lecture_name_ref = ref('');
const lecture_desc_ref = ref('');
const thumbnail = ref('');
const lecture_price_ref = ref(0);
const lecture_duration_ref = ref(0);
const buy_btn_text = ref(get_trans('buy'));
const buy_btn_icon = ref('pi pi-check');
const lecture_videos_list_ref = ref([
    {
        video_name_en: 'Loading...',
        video_name_ar: 'Loading...',
    },
] as video_meta_data[]);
const lecture_document_list_ref = ref([
    {
        document_name_en: 'Loading...',
        document_name_ar: 'Loading...',
    },
] as document_meta_data[]);
const lecture_quizzes_list_ref = ref([
    {
        quiz_name_en: 'Loading...',
        quiz_name_ar: 'Loading...',
    },
] as quiz_meta_data[]);

// utils
function show_error_text(msg: string) {
    const html_element = $('#lecture_details_error_text') as HTMLElement;
    html_element.innerText = msg;
    html_element.style.display = 'block';
}

// event handlers
function show_dialog() {
    show_lecture_details.value = true;
}

function close_dialog() {
    show_lecture_details.value = false;
}

function buy_lecture_btn_click() {
    buy_btn_text.value = get_trans('buying...');
    buy_btn_icon.value = 'pi pi-clock';
    buy_lecture(lec_id.value).then((resp) => {
        buy_btn_text.value = get_trans('buy');
        buy_btn_icon.value = 'pi pi-check';

        if (!resp.success) {
            show_error_text(resp.msg);
            return;
        }

        router.push({ path: '/classroom', query: { lec_id: lec_id.value } });
    });
}

// load system language
const lang = get_lang();

onMounted(() => {
    subscribe('show_lecture_details', 'show_lecture_details_func', (args) => {
        const lec_info = args.lec_info_obj as lecture_info;

        lec_id.value = lec_info.lec_id;
        lecture_name_ref.value = lang == 'en' ? lec_info.lec_name_en : lec_info.lec_name_ar;
        lecture_desc_ref.value = lang == 'en' ? lec_info.desc_en : lec_info.desc_ar;
        lecture_desc_ref.value = lang == 'en' ? lec_info.desc_en : lec_info.desc_ar;
        thumbnail.value = lec_info.thumbnail;
        lecture_price_ref.value = lec_info.price;
        lecture_duration_ref.value = lec_info.duration;

        get_content_meta(lec_id.value).then((resp) => {
            if (!resp.success) {
                show_error_text(resp.msg);
                return;
            }

            let video_meta_list = [] as video_meta_data[];
            let document_meta_list = [] as document_meta_data[];
            let quiz_meta_list = [] as quiz_meta_data[];

            (resp.data as any[]).forEach((x) => {
                if (x['material_type'] == 'VIDEO')
                    video_meta_list.push({ video_name_en: x['material_name_en'], video_name_ar: x['material_name_ar'] });
                else if (x['material_type'] == 'DOCUMENT')
                    document_meta_list.push({ document_name_en: x['material_name_en'], document_name_ar: x['material_name_ar'] });
                else if (x['material_type'] == 'QUIZ')
                    quiz_meta_list.push({ quiz_name_en: x['material_name_en'], quiz_name_ar: x['material_name_ar'] });
            });

            lecture_videos_list_ref.value = video_meta_list;
            lecture_document_list_ref.value = document_meta_list;
            lecture_quizzes_list_ref.value = quiz_meta_list;
        });

        show_dialog();
    });
});

</script>

<template>
    <Dialog :header="get_trans_entrop('lecture_details_header', { lecture_name: lecture_name_ref })"
        v-model:visible="show_lecture_details" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="`width: 40vw; direction: ${lang == 'en' ? 'ltr' : 'rtl'}; font-family: Cairo, sans-serif;`">

        <div id="lecture_details_cont">
            <img :src="`${get_file_server_url()}/thumbnails/${thumbnail}`" alt="Lecture Image" />
            <h3 id="lecture_details_error_text" class="error_text"></h3>
            <div id="lecture_details_cont_text">
                <div id="lecture_desc_outter_cont">
                    <h3>{{ get_trans('lecture_description') }}</h3>
                    <p>{{ lecture_desc_ref }}</p>

                    <div id="lecture_details_price_duration">
                        <span>{{ get_trans_entrop('lecture_details_price', { price: lecture_price_ref }) }}</span>
                        <span>{{ get_trans_entrop('lecture_details_duration', { duration: lecture_duration_ref }) }}</span>
                    </div>
                </div>

                <h3 id="lecture_content_header">{{ get_trans('lecture_content') }}</h3>

                <div id="content_meta_cont">
                    <div>
                        <b>
                            <i class="pi pi-video"></i>
                            {{ get_trans('videos') }}: {{ lecture_videos_list_ref.length }}
                        </b>
                        <ul>
                            <li v-for="vid in lecture_videos_list_ref">{{ lang == 'en' ? vid.video_name_en :
                                vid.video_name_ar
                            }}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <b>
                            <i class="pi pi-file"></i>
                            {{ get_trans('lecture_notes') }}: {{ lecture_document_list_ref.length }}
                        </b>
                        <ul>
                            <li v-for="doc in lecture_document_list_ref">{{ lang == 'en' ? doc.document_name_en :
                                doc.document_name_ar
                            }}</li>
                        </ul>
                    </div>

                    <div>
                        <b>
                            <i class="pi pi-pencil"></i>
                            {{ get_trans('quizzes') }}: {{ lecture_quizzes_list_ref.length }}
                        </b>
                        <ul>
                            <li v-for="quiz in lecture_quizzes_list_ref">{{ lang == 'en' ? quiz.quiz_name_en :
                                quiz.quiz_name_ar
                            }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <template #footer>
            <Button style="direction: ltr; font-family: Cairo, sans-serif;" :label="get_trans('cancel')" icon="pi pi-times"
                @click="close_dialog()" class="p-button-text" />
            <Button style="direction: ltr; font-family: Cairo, sans-serif;" :label="buy_btn_text" :icon="buy_btn_icon"
                @click="buy_lecture_btn_click()" />
        </template>
    </Dialog>
</template>

<style scoped>
#lecture_content_header {
    margin-bottom: 16px;
    border-bottom: 4px solid var(--primary-color);
    width: fit-content;
}

#lecture_desc_outter_cont h3 {
    margin: 0px;
    width: fit-content;
    border-bottom: 4px solid var(--primary-color);
}

#lecture_desc_outter_cont {
    margin-top: 16px;
    margin-bottom: 24px;
}

#content_meta_cont div {
    margin-bottom: 8px;
}

#content_meta_cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

#lecture_details_price_duration {
    font-weight: bold;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

#lecture_details_price_duration span {
    padding: 0px;
}

#lecture_details_cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

#lecture_details_cont img {
    width: 100%;
}

#lecture_details_cont ul {
    margin: 0px;
}

#lecture_details_cont_text p,
b,
span {
    padding-left: 20px;
    padding-right: 20px;
}

#lecture_details_cont_text span {
    padding-left: 30px;
    padding-right: 30px;
    display: block;
}
</style>