<script setup lang="ts">

// framework
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// lib
import { get_trans, get_ftrans, get_lang } from '../Lib/lang';
import { set_cookie } from '../Lib/cookie';

// APIs
import { signup_user } from '../API/auth';

// primevue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

// UI components
import ActiveLogo from '../Components/Common/ActiveLogo.vue';

// global vars
const centers_list = [
    {
        label: get_trans('mindware_center_queisna'),
        value: get_ftrans('mindware_center_queisna', 'en'),
    },
    {
        label: get_trans('barakat_al_sabaa_center'),
        value: get_ftrans('barakat_al_sabaa_center', 'en'),
    },
    {
        label: get_trans('al_daheh_center_barkat_al_sabaa'),
        value: get_ftrans('al_daheh_center_barkat_al_sabaa', 'en'),
    },
    {
        label: get_trans('bear_shebin_el_koum_center'),
        value: get_ftrans('bear_shebin_el_koum_center', 'en'),
    },
];

const reg_types = [
    {
        label: get_trans('online'),
        value: 'ONLINE',
    },
    {
        label: get_trans('offline'),
        value: 'OFFLINE',
    },
];

const grades = [
    {
        label: get_trans('first'),
        value: '1',
    },
    {
        label: get_trans('second'),
        value: '2',
    },
    {
        label: get_trans('third'),
        value: '3',
    },
];

const lang = get_lang();

const router = useRouter();

// refs
const is_error = ref(false);
const is_loading = ref(false);
const center_select_disabled = ref(true);
const error_text = ref('');
// form refs
const selected_reg_type_form_ref = ref('NONE');
const selected_center_form_ref = ref('NONE');
const selected_grade_form_ref = ref('NONE');
const full_name_form_ref = ref('');
const username_form_ref = ref('');
const password_form_ref = ref('');
const repassword_form_ref = ref('');
const phone_number_form_ref = ref('');
const parent_phone_number_form_ref = ref('');
const email_form_ref = ref('');

// utils
function show_error_text(msg: string) {
    error_text.value = msg;
    is_error.value = true;
    setTimeout(() => { is_error.value = false; }, 3000);
}

// event handlers
function signup_btn_click_handler() {
    // form validation
    let err_msgs = [] as string[];

    const missing_values_flag =
        full_name_form_ref.value == '' ||
        username_form_ref.value == '' ||
        selected_reg_type_form_ref.value == 'NONE' ||
        selected_grade_form_ref.value == 'NONE' ||
        password_form_ref.value == '' ||
        repassword_form_ref.value == '' ||
        phone_number_form_ref.value == '' ||
        parent_phone_number_form_ref.value == '' ||
        email_form_ref.value == '';

    if (missing_values_flag) {
        err_msgs.push('Please note that all fields are required');
        const err_msg = err_msgs.join('\n');
        show_error_text(err_msg);
        return;
    }

    if (password_form_ref.value != repassword_form_ref.value)
        err_msgs.push('Password mismatch');

    if (phone_number_form_ref.value.slice(0, 2) != '01' || phone_number_form_ref.value.length != 11)
        err_msgs.push('Invalid phone number');

    if (parent_phone_number_form_ref.value.slice(0, 2) != '01' || parent_phone_number_form_ref.value.length != 11)
        err_msgs.push('Invalid parent phone number');

    if (!String(email_form_ref.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        err_msgs.push('Invalid email');

    if (selected_reg_type_form_ref.value == 'OFFLINE' && selected_center_form_ref.value == 'NONE')
        err_msgs.push('In Case of Offline Registraion Mode You Must Choose a Center');

    // show error messages
    if (err_msgs.length > 0) {
        const err_msg = err_msgs.join('\n');
        show_error_text(err_msg);
        return;
    }

    is_loading.value = true;
    signup_user(
        full_name_form_ref.value,
        username_form_ref.value,
        selected_reg_type_form_ref.value,
        selected_center_form_ref.value,
        selected_grade_form_ref.value,
        password_form_ref.value,
        phone_number_form_ref.value,
        parent_phone_number_form_ref.value,
        email_form_ref.value
    ).then((resp) => {
        is_loading.value = false;

        if (!resp.success) {
            show_error_text(resp.msg);
            return;
        }

        set_cookie('access_token', resp.data['access_token']);
        router.push({ path: '/' });

    });
}

function reg_type_sel_change_handler() {
    if (selected_reg_type_form_ref.value == 'OFFLINE')
        center_select_disabled.value = false;
    else
        center_select_disabled.value = true;
}

</script>

<template>
    <div id="signup_box" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
        <div id="signup_box_logo_cont">
            <ActiveLogo />
        </div>
        <b v-if="is_error" style="text-align: center; color: #DD2C00;">{{ error_text }}</b>
        <b v-if="is_loading">{{ get_trans('creating_new_account') }}</b>
        <br />
        <div class="signup_fields_row">
            <span class="p-input-icon-left signup_field">
                <i class="pi pi-user" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('full_name')"
                    v-model="full_name_form_ref" />
            </span>

            <span class="p-input-icon-left signup_field">
                <i class="pi pi-user" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('username')"
                    v-model="username_form_ref" />
            </span>
        </div>

        <div class="signup_fields_row">
            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="signup_field" v-model="selected_reg_type_form_ref" :options="reg_types" optionLabel="label"
                optionValue="value" :placeholder="get_trans('reg_type')" v-on:change="reg_type_sel_change_handler()" />

            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="signup_field" v-model="selected_center_form_ref" :options="centers_list" optionLabel="label"
                optionValue="value" :placeholder="get_trans('center_name')" :disabled="center_select_disabled" />
        </div>

        <div class="signup_fields_row">
            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="signup_field" v-model="selected_grade_form_ref" :options="grades" optionLabel="label"
                optionValue="value" :placeholder="get_trans('grade')" />

            <span class="p-input-icon-left signup_field">
                <i class="pi pi-lock" />
                <InputText type="password" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('password')"
                    v-model="password_form_ref" />
            </span>
        </div>

        <div class="signup_fields_row">
            <span class="p-input-icon-left signup_field">
                <i class="pi pi-lock" />
                <InputText type="password" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('repassword')"
                    v-model="repassword_form_ref" />
            </span>

            <span class="p-input-icon-left signup_field">
                <i class="pi pi-phone" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('phone_number')"
                    v-model="phone_number_form_ref" />
            </span>
        </div>

        <div class="signup_fields_row">
            <span class="p-input-icon-left signup_field">
                <i class="pi pi-phone" />
                <InputText type="text" style="font-family: Cairo, sans-serif;"
                    :placeholder="get_trans('parent_phone_number')" v-model="parent_phone_number_form_ref" />
            </span>

            <span class="p-input-icon-left signup_field">
                <i class="pi pi-envelope" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('email')"
                    v-model="email_form_ref" />
            </span>
        </div>

        <div id="signup_btn_cont">
            <Button :label="get_trans('signup')" style="font-family: Cairo, sans-serif;"
                @click="signup_btn_click_handler()" />
        </div>
    </div>
</template>

<style scoped>
.signup_fields_row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 8px;
}

#signup_box {
    position: absolute;
    top: 48vh;
    left: 50%;
    width: 500px;
    height: fit-content !important;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #bdbdbd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#signup_box_logo_cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#signup_btn_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

#signup_btn_cont button {
    margin-top: 16px;
    width: 150px;
}

.signup_field {
    width: 48%;
}

.signup_field input {
    width: 100%;
}

@media screen and (max-width: 600px) {
    #signup_box {
        margin-left: auto;
        margin-right: auto;
        width: 96%;
        padding: 12px;
        top: 36vh;
    }
}
</style>