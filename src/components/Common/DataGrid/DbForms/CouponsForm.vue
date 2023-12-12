<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// primevue
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';

// API
import { generate_coupons } from '../../../../API/Admin/coupons';

// lib
import { subscribe, post_event } from '../../../../Lib/mediator';
import { TOAST_TYPES } from '../../../../Lib/toast';

// refs
const form_header = ref('');
const form_mode = ref('create');
const show_coupons_form = ref(false);
const generated_coupons = ref([] as any[]);
// form refs
const form_ref_coupons_count = ref();
const form_ref_coupons_value = ref();

// utils
function show_dialog() {
    show_coupons_form.value = true;
}

function close_dialog() {
    post_event('refresh_grid_controller', {});
}

// event handlers
function generate_coupons_btn_click() {
    post_event('grid_controller_toast', {
        toast_msg: 'Generating Coupons...',
        toast_type: TOAST_TYPES.INFO,
    });

    generate_coupons(Number(form_ref_coupons_count.value), Number(form_ref_coupons_value.value)).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });
            return;
        }

        const coupons_value = Number(form_ref_coupons_value.value);
        generated_coupons.value = (resp.data.coupons_list as string[]).map((x) => { return { coupon_text: x, coupon_value: coupons_value } });

        post_event('grid_controller_toast', {
            toast_msg: 'Coupons Generated',
            toast_type: TOAST_TYPES.SUCCESS,
        });
    });
}

function export_coupons() {
    let file_content = 'coupon_text,coupon_value\n';
    generated_coupons.value.forEach((coupon) => {
        file_content += `${coupon.coupon_text},${coupon.coupon_value}\n`;
    });

    const link = document.createElement('a');
    const file = new Blob([file_content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = 'coupons.csv';
    link.click();
    URL.revokeObjectURL(link.href);
}

onMounted(() => {
    subscribe('show_coupons_form', 'show_coupons_form_func', (args) => {
        const mode = args.mode as string;
        form_mode.value = mode;

        if (mode == 'create') {
            form_header.value = 'Generate Coupons';
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
    <Dialog :header="form_header" v-model:visible="show_coupons_form" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '25vw' }">

        <div id="form_body">
            <span class="p-input-icon-left form_field">
                <i class="pi pi-ticket" />
                <InputText type="number" style="font-family: Cairo, sans-serif;" placeholder="Coupons Count"
                    v-model="form_ref_coupons_count" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-dollar" />
                <InputText type="number" style="font-family: Cairo, sans-serif;" placeholder="Coupons Value"
                    v-model="form_ref_coupons_value" />
            </span>
        </div>

        <div>
            <div id="list_header_controls_cont">
                <Button label="Generate" icon="pi pi-dollar" @click="generate_coupons_btn_click()" />
                <Button icon="pi pi-external-link" label="Export" @click="export_coupons()" />
            </div>
            <Listbox :options="generated_coupons" :filter="true" option-label="coupon_text" list-style="max-height:250px"
                style="width: 100%;" filter-placeholder="Search Coupons">
                <template #option="slotProps">
                    <div class="list_box_item">
                        <span>{{ slotProps.option.coupon_text }}</span>
                        <span>{{ slotProps.option.coupon_value }}</span>
                    </div>
                </template>
            </Listbox>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close_dialog()" class="p-button-text" />
        </template>
    </Dialog>
</template>

<style scoped>
#list_header_controls_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 16px;
    margin-top: 16px;
}

#list_header_controls_cont button {
    height: 50px;
}

.list_box_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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