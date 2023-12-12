<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// primevue
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Listbox from 'primevue/listbox';

// lib
import { subscribe, post_event } from '../../../../Lib/mediator';
import { get_ftrans } from '../../../../Lib/lang';
import { TOAST_TYPES } from '../../../../Lib/toast';

// API
import { signup_user } from '../../../../API/auth';
import { get_owned_lectures, rm_lec_ownership, update_user, add_lec_ownership } from '../../../../API/Admin/users';

// global vars
const centers_list = [
    {
        label: get_ftrans('mindware_center_queisna', 'en'),
        value: get_ftrans('mindware_center_queisna', 'en'),
    },
    {
        label: get_ftrans('barakat_al_sabaa_center', 'en'),
        value: get_ftrans('barakat_al_sabaa_center', 'en'),
    },
    {
        label: get_ftrans('al_daheh_center_barkat_al_sabaa', 'en'),
        value: get_ftrans('al_daheh_center_barkat_al_sabaa', 'en'),
    },
    {
        label: get_ftrans('bear_shebin_el_koum_center', 'en'),
        value: get_ftrans('bear_shebin_el_koum_center', 'en'),
    },
];

const reg_types = [
    {
        label: get_ftrans('online', 'en'),
        value: 'ONLINE',
    },
    {
        label: get_ftrans('offline', 'en'),
        value: 'OFFLINE',
    },
];

const user_roles = [
    {
        label: get_ftrans('admin', 'en'),
        value: 'ADMIN',
    },
    {
        label: get_ftrans('student', 'en'),
        value: 'STUDENT',
    },
];

const grades = [
    {
        label: get_ftrans('first', 'en'),
        value: '1',
    },
    {
        label: get_ftrans('second', 'en'),
        value: '2',
    },
    {
        label: get_ftrans('third', 'en'),
        value: '3',
    },
];

// refs
const user_id = ref(0);
const form_header = ref('');
const show_users_form = ref(false);
const center_select_disabled = ref(true);
const is_password_changed = ref(false);
const form_mode = ref('create');
const owned_lectures = ref([
    {
        lec_id: 0,
        lec_name_en: 'Loading Owned Lectures...',
        is_owned: 0,
    },
] as any[]);
// form refs
const form_ref_full_name = ref();
const form_ref_username = ref();
const form_ref_reg_type = ref();
const form_ref_user_role = ref();
const form_ref_center_name = ref('NONE'); // set default value to none
const form_ref_grade = ref();
const form_ref_password = ref();
const form_ref_phone_number = ref();
const form_ref_parent_phone_number = ref();
const form_ref_email = ref();
const form_ref_balance = ref();

// utils
function show_dialog() {
    show_users_form.value = true;
}

function close_dialog() {
    show_users_form.value = false;
}

function load_owned_lectures() {
    owned_lectures.value = [
        {
            lec_id: 0,
            lec_name_en: 'Loading Owned Lectures...',
            is_owned: 0,
        },
    ] as any[];

    get_owned_lectures(user_id.value).then((resp) => {
        if (!resp.success) {
            const result = [
                {
                    lec_id: 0,
                    lec_name_en: `Error Loading Owned Lectures: ${resp.msg}`,
                },
            ] as any[];

            owned_lectures.value = result;
            return;
        }

        owned_lectures.value = resp.data as any[];
    });
}

// event handlers
function add_user_to_database() {
    post_event('grid_controller_toast', {
        toast_msg: 'Adding User to Database...',
        toast_type: TOAST_TYPES.INFO,
    });

    signup_user(
        form_ref_full_name.value,
        form_ref_username.value,
        form_ref_reg_type.value,
        form_ref_center_name.value,
        form_ref_grade.value,
        form_ref_password.value,
        form_ref_phone_number.value,
        form_ref_parent_phone_number.value,
        form_ref_email.value,
    ).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });
            return;
        }

        post_event('grid_controller_toast', {
            toast_msg: 'User Added to Database',
            toast_type: TOAST_TYPES.SUCCESS,
        });

        post_event('refresh_grid_controller', {});
    });
}

function update_user_in_database() {
    post_event('grid_controller_toast', {
        toast_msg: 'Updating User in Database...',
        toast_type: TOAST_TYPES.INFO,
    });

    update_user(
        form_ref_full_name.value,
        form_ref_username.value,
        form_ref_reg_type.value,
        form_ref_center_name.value,
        form_ref_grade.value,
        form_ref_password.value,
        is_password_changed.value,
        form_ref_phone_number.value,
        form_ref_parent_phone_number.value,
        form_ref_email.value,
        form_ref_user_role.value,
        form_ref_balance.value,
    ).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });
            return;
        }

        post_event('grid_controller_toast', {
            toast_msg: 'User Updated in Database',
            toast_type: TOAST_TYPES.SUCCESS,
        });

        post_event('refresh_grid_controller', {});
    });
}

function ok_btn_click() {
    if (form_mode.value == 'create')
        add_user_to_database();
    else if (form_mode.value == 'update')
        update_user_in_database();
}

function reg_type_sel_change() {
    if (form_ref_reg_type.value == 'OFFLINE')
        center_select_disabled.value = false;
    else
        center_select_disabled.value = true;
}

function rm_lec_ownership_btn_handler(user_id: number, lec_id: number) {
    post_event('grid_controller_toast', {
        toast_msg: `Removing Lecture ${lec_id} From User ${lec_id}...`,
        toast_type: TOAST_TYPES.INFO,
    });

    rm_lec_ownership(user_id, lec_id).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });

            return;
        }

        post_event('grid_controller_toast', {
            toast_msg: 'Removed Lecture Ownership',
            toast_type: TOAST_TYPES.SUCCESS,
        });

        // refresh lecture ownerships
        load_owned_lectures();
    });
}

function add_lec_ownership_btn_handler(user_id: number, lec_id: number) {
    post_event('grid_controller_toast', {
        toast_msg: `Adding Lecture ${lec_id} To User ${lec_id}...`,
        toast_type: TOAST_TYPES.INFO,
    });

    add_lec_ownership(user_id, lec_id).then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });

            return;
        }

        post_event('grid_controller_toast', {
            toast_msg: 'Added Lecture Ownership',
            toast_type: TOAST_TYPES.SUCCESS,
        });

        // refresh lecture ownerships
        load_owned_lectures();
    });
}

function password_changed() {
    is_password_changed.value = true;
}

onMounted(() => {
    subscribe('show_users_form', 'show_users_form_func', (args) => {
        const mode = args.mode as string;
        form_mode.value = mode;

        if (mode == 'create') {
            form_header.value = 'Add User';
            show_dialog();
        } else if (mode == 'update') {
            const record = args.record as any;
            user_id.value = record.user_id as number;
            form_header.value = `Update User: ${user_id.value}`;

            // populate form fields
            form_ref_full_name.value = record.full_name;
            form_ref_username.value = record.username;
            form_ref_reg_type.value = record.reg_type;
            form_ref_center_name.value = record.center_name;
            form_ref_grade.value = record.grade;
            form_ref_password.value = record.pass_hash;
            form_ref_phone_number.value = record.phone_number;
            form_ref_parent_phone_number.value = record.parent_phone_number;
            form_ref_email.value = record.email;
            form_ref_balance.value = record.balance;
            form_ref_user_role.value = record.user_role;

            // activate centers dropdown if needed
            reg_type_sel_change();

            show_dialog();
            load_owned_lectures();
        }
    });
});

</script>

<template>
    <Dialog :header="form_header" v-model:visible="show_users_form" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }">

        <div id="form_body">
            <span class="p-input-icon-left form_field">
                <i class="pi pi-user" />
                <InputText type="text" style="font-family: Cairo, sans-serif;"
                    :placeholder="get_ftrans('username', 'en')" v-model="form_ref_username"
                    :disabled="form_mode == 'update'" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-user" />
                <InputText type="text" style="font-family: Cairo, sans-serif;"
                    :placeholder="get_ftrans('full_name', 'en')" v-model="form_ref_full_name" />
            </span>

            <Dropdown v-if="form_mode == 'update'" panel-style="font-family: Cairo, sans-serif;"
                input-style="font-family: Cairo, sans-serif;" class="form_field" :options="user_roles"
                optionLabel="label" optionValue="value" :placeholder="get_ftrans('user_role', 'en')"
                v-model="form_ref_user_role" />

            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="form_field" :options="reg_types" optionLabel="label" optionValue="value"
                v-on:change="reg_type_sel_change()" :placeholder="get_ftrans('reg_type', 'en')"
                v-model="form_ref_reg_type" />

            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="form_field" :options="centers_list" optionLabel="label" optionValue="value"
                :placeholder="get_ftrans('center_name', 'en')" :disabled="center_select_disabled"
                v-model="form_ref_center_name" />

            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="form_field" :options="grades" optionLabel="label" optionValue="value"
                :placeholder="get_ftrans('grade', 'en')" v-model="form_ref_grade" />

            <span class="p-input-icon-left form_field">
                <i class="pi pi-lock" />
                <InputText type="password" style="font-family: Cairo, sans-serif;"
                    :placeholder="get_ftrans('password', 'en')" v-model="form_ref_password"
                    v-on:change="password_changed()" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-phone" />
                <InputText type="text" style="font-family: Cairo, sans-serif;"
                    :placeholder="get_ftrans('phone_number', 'en')" v-model="form_ref_phone_number" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-phone" />
                <InputText type="text" style="font-family: Cairo, sans-serif;"
                    :placeholder="get_ftrans('parent_phone_number', 'en')" v-model="form_ref_parent_phone_number" />
            </span>

            <span v-if="form_mode == 'update'" class="p-input-icon-left form_field">
                <i class="pi pi-dollar" />
                <InputText type="text" style="font-family: Cairo, sans-serif;"
                    :placeholder="get_ftrans('balance', 'en')" v-model="form_ref_balance" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-envelope" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" :placeholder="get_ftrans('email', 'en')"
                    v-model="form_ref_email" />
            </span>

            <div v-if="form_mode == 'update'" id="owned_lecs_list_cont" class="form_field">
                <h4>Owned Lectures</h4>
                <Listbox id="owned_lecs_list" :options="owned_lectures" :filter="true" option-label="lec_name_en"
                    list-style="max-height:250px" style="width:15rem" filter-placeholder="Search">
                    <template #option="slotProps">
                        <div class="list_box_item">
                            <span>{{ slotProps.option.lec_name_en }}</span>
                            <Button v-if="slotProps.option.is_owned == 1" icon="pi pi-trash"
                                class="p-button-rounded p-button-danger"
                                @click="rm_lec_ownership_btn_handler(user_id, slotProps.option.lec_id)" />
                            <Button v-else-if="slotProps.option.is_owned == 0" icon="pi pi-plus"
                                class="p-button-rounded p-button-success"
                                @click="add_lec_ownership_btn_handler(user_id, slotProps.option.lec_id)" />
                        </div>
                    </template>
                </Listbox>
            </div>

        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close_dialog()" class="p-button-text" />
            <Button label="OK" icon="pi pi-check" @click="ok_btn_click()" />
        </template>
    </Dialog>
</template>

<style scoped>
.list_box_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

.form_field {
    margin-bottom: 8px;
    margin-right: 8px;
    flex-grow: 1;
}

.form_field input {
    width: 100%;
}

#owned_lecs_list_cont,
#owned_lecs_list {
    width: 100% !important;
}
</style>