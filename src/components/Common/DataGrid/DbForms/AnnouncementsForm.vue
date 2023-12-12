<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// lib
import { subscribe, post_event } from '../../../../Lib/mediator';
import { TOAST_TYPES } from '../../../../Lib/toast';

// primevue
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';

// API
import { add_announcement } from '../../../../API/Admin/announcements';

// refs
const show_announcements_form = ref(false);
// form refs
const form_ref_announcement_en = ref();
const form_ref_announcement_ar = ref();
const form_ref_announcement_link = ref();
const form_ref_announcement_datetime = ref();

// utils
function show_dialog() {
    show_announcements_form.value = true;
}

function close_dialog() {
    show_announcements_form.value = false;
}

// event handlers
function add_announcement_to_database() {
    post_event('grid_controller_toast', {
        toast_msg: 'Creating Announcement...',
        toast_type: TOAST_TYPES.INFO,
    });

    add_announcement({
        announcement_id: 0,
        announcement_desc_en: form_ref_announcement_en.value,
        announcement_desc_ar: form_ref_announcement_ar.value,
        announcement_link: form_ref_announcement_link.value,
        announcement_datetime: (form_ref_announcement_datetime.value as Date).toISOString().split('T')[0],
    }).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });
            return;
        }

        post_event('grid_controller_toast', {
            toast_msg: 'Announcement Published',
            toast_type: TOAST_TYPES.SUCCESS,
        });

        post_event('refresh_grid_controller', {});
    });
}

onMounted(() => {
    subscribe('show_announcements_form', 'show_announcements_form_func', (args) => {
        const mode = args.mode as string;

        if (mode == 'create') {
            show_dialog();
        } else if (mode == 'update') {
            post_event('grid_controller_toast', {
                toast_msg: 'This Feature is Not Available for This Database Resource',
                toast_type: TOAST_TYPES.WARN,
            });
        }
    });
});

</script>

<template>
    <Dialog header="Create Announcement" v-model:visible="show_announcements_form"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '25vw' }">

        <div id="form_body">
            <span class="p-input-icon-left form_field">
                <i class="pi pi-align-left" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Announcement Description En"
                    v-model="form_ref_announcement_en" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-align-left" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Announcement Description Ar"
                    v-model="form_ref_announcement_ar" />
            </span>

            <Calendar class="form_field" v-model="form_ref_announcement_datetime" placeholder="Announcement Datetime"
                :show-icon='true' />

            <span class="p-input-icon-left form_field">
                <i class="pi pi-link" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Announcement Link"
                    v-model="form_ref_announcement_link" />
            </span>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close_dialog()" class="p-button-text" />
            <Button label="OK" icon="pi pi-check" @click="add_announcement_to_database()" />
        </template>
    </Dialog>
</template>

<style scoped>
.form_field {
    margin-bottom: 8px;
    margin-right: 8px;
    flex-grow: 1;
}

.form_field input,
.p-calender {
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