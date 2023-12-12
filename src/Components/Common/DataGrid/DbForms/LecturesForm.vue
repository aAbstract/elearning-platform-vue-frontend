<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// primevue
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// lib
import { subscribe, post_event } from '../../../../Lib/mediator';
import { TOAST_TYPES } from '../../../../Lib/toast';
import { $ } from '../../../../Lib/dom';

// API
import { add_lec, update_lecture, upload_lecture_thumbnail } from '../../../../API/Admin/lectures';

// refs
const form_header = ref('');
const form_mode = ref('create');
const show_lectures_form = ref(false);
const lecture_id = ref(0);
// form refs
const form_ref_lec_name_en = ref();
const form_ref_lec_name_ar = ref();
const form_ref_lec_desc_en = ref();
const form_ref_lec_desc_ar = ref();
const form_ref_price = ref();
const form_ref_duration = ref();
const form_ref_thumbnail = ref();

// utils
function show_dialog() {
    show_lectures_form.value = true;
}

function close_dialog() {
    show_lectures_form.value = false;
}

function add_lecture_to_database() {
    post_event('grid_controller_toast', {
        toast_msg: 'Adding Lecture to Database...',
        toast_type: TOAST_TYPES.INFO,
    });

    // upload lecture thumbnail
    const file_upload_form_component = $('#file_upload_form') as HTMLInputElement;
    const file_list = file_upload_form_component.files ?? [];
    if (file_list.length != 0) {
        form_ref_thumbnail.value = file_list[0].name;
        upload_lecture_thumbnail(file_list[0]).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: `Upload Faild: ${resp.msg}`,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'File Uploaded to the Server',
                toast_type: TOAST_TYPES.SUCCESS,
            });
        });
    }

    // add lecture entry
    add_lec({
        lec_id: 0,
        lec_name_en: form_ref_lec_name_en.value,
        lec_name_ar: form_ref_lec_name_ar.value,
        desc_en: form_ref_lec_desc_en.value,
        desc_ar: form_ref_lec_desc_ar.value,
        thumbnail: form_ref_thumbnail.value,
        duration: form_ref_duration.value,
        price: form_ref_price.value,
        content_meta: {} as any,
    }).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });
            return;
        }

        post_event('grid_controller_toast', {
            toast_msg: 'Lecture Added to Database',
            toast_type: TOAST_TYPES.SUCCESS,
        });

        post_event('refresh_grid_controller', {});
    });
}

function update_lecture_in_database() {
    post_event('grid_controller_toast', {
        toast_msg: 'Updating Lecture in Database...',
        toast_type: TOAST_TYPES.INFO,
    });

    // upload lecture thumbnail
    const file_upload_form_component = $('#file_upload_form') as HTMLInputElement;
    const file_list = file_upload_form_component.files ?? [];
    if (file_list.length != 0) {
        form_ref_thumbnail.value = file_list[0].name;
        upload_lecture_thumbnail(file_list[0]).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: `Upload Faild: ${resp.msg}`,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'File Uploaded to the Server',
                toast_type: TOAST_TYPES.SUCCESS,
            });
        });
    }

    update_lecture({
        lec_id: lecture_id.value,
        lec_name_en: form_ref_lec_name_en.value,
        lec_name_ar: form_ref_lec_name_ar.value,
        desc_en: form_ref_lec_desc_en.value,
        desc_ar: form_ref_lec_desc_ar.value,
        thumbnail: form_ref_thumbnail.value,
        price: form_ref_price.value,
        duration: form_ref_duration.value,
        content_meta: {} as any,
    }).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });
            return;
        }

        post_event('grid_controller_toast', {
            toast_msg: 'Lecture Updated in Database',
            toast_type: TOAST_TYPES.SUCCESS,
        });

        post_event('refresh_grid_controller', {});
    });
}

// event handlers
function ok_btn_click() {
    if (form_mode.value == 'create')
        add_lecture_to_database();
    else if (form_mode.value == 'update')
        update_lecture_in_database();
}

onMounted(() => {
    subscribe('show_lectures_form', 'show_lectures_form_func', (args) => {
        const mode = args.mode as string;
        form_mode.value = mode;

        if (mode == 'create') {
            form_header.value = 'Add Lecture';
            show_dialog();
        } else if (mode == 'update') {
            const record = args.record as any;
            lecture_id.value = record.lecture_id as number;
            form_header.value = `Update Lecture: ${lecture_id.value}`;

            // populate form fields
            form_ref_lec_name_en.value = record.lecture_name_en;
            form_ref_lec_name_ar.value = record.lecture_name_ar;
            form_ref_lec_desc_en.value = record.lecture_desc_en;
            form_ref_lec_desc_ar.value = record.lecture_desc_ar;
            form_ref_price.value = record.price;
            form_ref_duration.value = record.duration;
            form_ref_thumbnail.value = record.thumbnail;

            show_dialog();
        }
    });
});
</script>

<template>
    <Dialog :header="form_header" v-model:visible="show_lectures_form" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }">

        <div id="form_body">
            <span class="p-input-icon-left form_field">
                <i class="pi pi-tag" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Lecture Name En"
                    v-model="form_ref_lec_name_en" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-tag" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Lecture Name Ar"
                    v-model="form_ref_lec_name_ar" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-align-left" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Lecture Description En"
                    v-model="form_ref_lec_desc_en" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-align-left" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Lecture Description Ar"
                    v-model="form_ref_lec_desc_ar" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-dollar" />
                <InputText type="number" style="font-family: Cairo, sans-serif;" placeholder="Price"
                    v-model="form_ref_price" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-clock" />
                <InputText type="number" style="font-family: Cairo, sans-serif;" placeholder="Duration in Hours"
                    v-model="form_ref_duration" />
            </span>

            <input id="file_upload_form" class="form_field" type="file" />
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close_dialog()" class="p-button-text" />
            <Button label="OK" icon="pi pi-check" @click="ok_btn_click()" />
        </template>
    </Dialog>
</template>

<style scoped>
#file_upload_form {
    margin-top: 8px;
    font-weight: bold;
    font-size: 16px;
}

#file_upload_form::file-selector-button {
    background-color: var(--primary-color);
    width: 130px;
    height: 40px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

.form_field {
    margin-bottom: 8px;
    margin-right: 8px;
    flex-grow: 1;
}

.form_field input {
    width: 100%;
}

#form_body {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}
</style>