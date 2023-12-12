<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// lib
import { post_event, subscribe } from '../../Lib/mediator';
import { get_trans, get_lang } from '../../Lib/lang';

// primevue
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// API
import { recharge_balance } from '../../API/payment';

// global vars
const lang = get_lang();

// refs
const show_recharge_balance_form = ref(false);
const is_loading = ref(false);
const log_text = ref('');
const is_error = ref(false);
const error_text = ref('');
// form refs
const coupon_code_form_ref = ref();

// utils
function show_dialog() {
    show_recharge_balance_form.value = true;
}

function close_dialog() {
    show_recharge_balance_form.value = false;
}

// event handlers
function recharge_balance_btn_click() {
    is_loading.value = true;
    log_text.value = get_trans('recharging_balance');
    recharge_balance(coupon_code_form_ref.value).then((resp) => {
        if (!resp.success) {
            is_loading.value = false;
            is_error.value = true;
            error_text.value = resp.msg;
            return;
        }

        log_text.value = get_trans('balance_recharged');
        post_event('update_balance', {});
    });
}

onMounted(() => {
    subscribe('show_recharge_balance_form', 'show_recharge_balance_form_func', () => { show_dialog(); });
});

</script>

<template>
    <Dialog :header="get_trans('recharge_balance')" v-model:visible="show_recharge_balance_form"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="`width: 25vw; direction: ${lang == 'en' ? 'ltr' : 'rtl'}; font-family: Cairo, sans-serif;`">

        <div v-if="is_error" id="recharge_form_error_text">{{ error_text }}</div>
        <div v-if="is_loading" id="recharge_form_loading_text">{{ log_text }}</div>
        <div id="form_body">
            <span class="p-input-icon-left form_field">
                <i class="pi pi-ticket" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('enter_coupon')"
                    v-model="coupon_code_form_ref" />
            </span>
        </div>

        <template #footer>
            <Button style="direction: ltr; font-family: Cairo, sans-serif;" :label="get_trans('cancel')" icon="pi pi-times"
                @click="close_dialog()" class="p-button-text" />
            <Button style="direction: ltr; font-family: Cairo, sans-serif;" :label="get_trans('recharge')"
                icon="pi pi-dollar" @click="recharge_balance_btn_click()" />
        </template>
    </Dialog>
</template>

<style scoped>
#recharge_form_error_text {
    font-weight: bold;
    width: 100%;
    text-align: center;
    color: #DD2C00;
}

#recharge_form_loading_text {
    font-weight: bold;
    width: 100%;
    text-align: center;
}

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
    margin-top: 8px;
}
</style>