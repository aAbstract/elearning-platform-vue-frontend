<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// primevue
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Listbox from 'primevue/listbox';

// API
import { get_lecs_data_source } from '../../../../API/Admin/lectures';
import { add_material, update_material, add_quiz, update_quiz } from '../../../../API/Admin/materials';
import { get_quiz_answers } from '../../../../API/lectures';

// lib
import { subscribe, post_event } from '../../../../Lib/mediator';
import { TOAST_TYPES } from '../../../../Lib/toast';

// global vars
const mats_types = [
    {
        label: 'Video',
        value: 'VIDEO',
    },
    {
        label: 'Document',
        value: 'DOCUMENT',
    },
    {
        label: 'Quiz',
        value: 'QUIZ',
    },
];
const question_answers = [
    {
        label: 'A',
        value: 'A',
    },
    {
        label: 'B',
        value: 'B',
    },
    {
        label: 'C',
        value: 'C',
    },
    {
        label: 'D',
        value: 'D',
    },
];

// refs
const form_header = ref('');
const form_mode = ref('create');
const show_materials_form = ref(false);
const material_id = ref(0);
const linked_lecs_data_source = ref([
    {
        label: 'Loading Available Lectures...',
        value: '0',
    },
]);
const quiz_answers = ref([
    {
        question_order: 1,
        question_answer: 'A',
    },
] as any[]);
const quiz_label = ref('Quiz Answers');
// form refs
const form_ref_mat_name_en = ref();
const form_ref_mat_name_ar = ref();
const form_ref_linked_lec_id = ref();
const form_ref_mat_type = ref();
const form_ref_mat_order = ref();
const form_ref_mat_link = ref();
const form_ref_question_order = ref('2');
const form_ref_question_answer = ref();

// utils
function show_dialog() {
    show_materials_form.value = true;
}

function close_dialog() {
    show_materials_form.value = false;
}

function add_material_to_database() {
    post_event('grid_controller_toast', {
        toast_msg: 'Adding Material to Database...',
        toast_type: TOAST_TYPES.INFO,
    });

    if (form_ref_mat_type.value != 'QUIZ') {
        add_material({
            mat_id: 0,
            linked_lec_id: form_ref_linked_lec_id.value,
            mat_type: form_ref_mat_type.value,
            mat_order: form_ref_mat_order.value,
            mat_name_en: form_ref_mat_name_en.value,
            mat_name_ar: form_ref_mat_name_ar.value,
            mat_link: form_ref_mat_link.value,
        }).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: resp.msg,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'Material Added to Database',
                toast_type: TOAST_TYPES.SUCCESS,
            });

            post_event('refresh_grid_controller', {});
        });
    } else {
        add_quiz({
            material_entry: {
                mat_id: 0,
                linked_lec_id: form_ref_linked_lec_id.value,
                mat_type: form_ref_mat_type.value,
                mat_order: form_ref_mat_order.value,
                mat_name_en: form_ref_mat_name_en.value,
                mat_name_ar: form_ref_mat_name_ar.value,
                mat_link: form_ref_mat_link.value,
            },
            quiz_answers: quiz_answers.value,
        }).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: resp.msg,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'Material Added to Database',
                toast_type: TOAST_TYPES.SUCCESS,
            });

            post_event('refresh_grid_controller', {});
        });
    }
}

function update_material_in_database() {
    if (form_ref_mat_type.value != 'QUIZ') {
        post_event('grid_controller_toast', {
            toast_msg: 'Updating Material in Database...',
            toast_type: TOAST_TYPES.INFO,
        });

        update_material({
            mat_id: material_id.value,
            linked_lec_id: form_ref_linked_lec_id.value,
            mat_type: form_ref_mat_type.value,
            mat_order: form_ref_mat_order.value,
            mat_name_en: form_ref_mat_name_en.value,
            mat_name_ar: form_ref_mat_name_ar.value,
            mat_link: form_ref_mat_link.value,
        }).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: resp.msg,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'Material Updated in Database',
                toast_type: TOAST_TYPES.SUCCESS,
            });

            post_event('refresh_grid_controller', {});
        });
    } else {
        post_event('grid_controller_toast', {
            toast_msg: 'Updating Material in Database...',
            toast_type: TOAST_TYPES.INFO,
        });

        update_quiz({
            material_entry: {
                mat_id: material_id.value,
                linked_lec_id: form_ref_linked_lec_id.value,
                mat_type: form_ref_mat_type.value,
                mat_order: form_ref_mat_order.value,
                mat_name_en: form_ref_mat_name_en.value,
                mat_name_ar: form_ref_mat_name_ar.value,
                mat_link: form_ref_mat_link.value,
            },
            quiz_answers: quiz_answers.value,
        }).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: resp.msg,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'Material Updated in Database',
                toast_type: TOAST_TYPES.SUCCESS,
            });

            post_event('refresh_grid_controller', {});
        });
    }
}

// event handlers
function ok_btn_click() {
    if (form_mode.value == 'create')
        add_material_to_database();
    else if (form_mode.value == 'update')
        update_material_in_database();
}

function add_quiz_answer(question_order: number, question_answer: string) {
    const new_quiz_answers = [...quiz_answers.value, { question_order, question_answer }];
    quiz_answers.value = new_quiz_answers;
    form_ref_question_order.value = String(Number(form_ref_question_order.value) + 1);
}

function remove_quiz_answer(question_order: number) {
    let new_quiz_answers = [...quiz_answers.value];
    const question_index = new_quiz_answers.findIndex((x) => x.question_order == question_order);
    new_quiz_answers.splice(question_index, 1);
    quiz_answers.value = new_quiz_answers;
}

onMounted(() => {
    subscribe('show_materials_form', 'show_materials_form_func', (args) => {
        const mode = args.mode as string;
        form_mode.value = mode;

        if (mode == 'create') {
            form_header.value = 'Add Material';
            show_dialog();
        } else if (mode == 'update') {
            const record = args.record as any;
            material_id.value = record.material_id as number;
            form_header.value = `Update Material: ${material_id.value}`;

            // populate form fields
            form_ref_mat_name_en.value = record.material_name_en;
            form_ref_mat_name_ar.value = record.material_name_ar;
            form_ref_linked_lec_id.value = record.lecture_id;
            form_ref_mat_type.value = record.material_type;
            form_ref_mat_order.value = record.material_order;
            form_ref_mat_link.value = record.material_link;

            show_dialog();

            // load quiz answers
            quiz_label.value = 'Loading Quiz Answers...'
            get_quiz_answers(material_id.value).then((resp) => {
                if (!resp.success) {
                    quiz_label.value = resp.msg;
                    return;
                }

                let last_question_order = 0;
                const loaded_quiz_answers = (resp.data as any[]).map((x) => {
                    if (x.question_order > last_question_order)
                        last_question_order = x.question_order;

                    return {
                        question_order: x.question_order,
                        question_answer: x.answer,
                    };
                });

                form_ref_question_order.value = String(last_question_order + 1);
                quiz_answers.value = loaded_quiz_answers;
                quiz_label.value = 'Quiz Answers'
            });
        }
    });

    get_lecs_data_source().then((resp) => {
        if (!resp.success) {
            post_event('grid_controller_toast', {
                toast_msg: resp.msg,
                toast_type: TOAST_TYPES.ERROR,
            });
            return;
        }

        // map options
        const temp_obj = (resp.data as any[]).map((x) => {
            return {
                label: x.lecture_name_en,
                value: x.lecture_id,
            };
        });

        linked_lecs_data_source.value = temp_obj;
    });
});

</script>

<template>
    <Dialog :header="form_header" v-model:visible="show_materials_form" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }">

        <div id="form_body">
            <span class="p-input-icon-left form_field">
                <i class="pi pi-tag" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Material Name En"
                    v-model="form_ref_mat_name_en" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-tag" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Material Name Ar"
                    v-model="form_ref_mat_name_ar" />
            </span>

            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="form_field" :options="linked_lecs_data_source" optionLabel="label" optionValue="value"
                placeholder="Linked Lecture" v-model="form_ref_linked_lec_id" />

            <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                class="form_field" :options="mats_types" optionLabel="label" optionValue="value" placeholder="Material Type"
                v-model="form_ref_mat_type" />

            <span class="p-input-icon-left form_field">
                <i class="pi pi-list" />
                <InputText type="number" style="font-family: Cairo, sans-serif;" placeholder="Order"
                    v-model="form_ref_mat_order" />
            </span>

            <span class="p-input-icon-left form_field">
                <i class="pi pi-link" />
                <InputText type="text" style="font-family: Cairo, sans-serif;" placeholder="Material Link"
                    v-model="form_ref_mat_link" />
            </span>

            <div v-if="form_ref_mat_type == 'QUIZ'" id="quiz_answers_cont">
                <div>
                    <h4>{{ quiz_label }}</h4>
                    <Listbox :options="quiz_answers" :filter="true" option-label="question_order"
                        list-style="max-height:250px" style="width:15rem" filter-placeholder="Search">
                        <template #option="slotProps">
                            <div class="list_box_item">
                                <span>{{ slotProps.option.question_order }}</span>
                                <span>{{ slotProps.option.question_answer }}</span>
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                    @click="remove_quiz_answer(slotProps.option.question_order)" />
                            </div>
                        </template>
                    </Listbox>
                </div>

                <div id="add_quiz_answer_form">
                    <span class="p-input-icon-left form_field">
                        <i class="pi pi-list" />
                        <InputText type="number" style="font-family: Cairo, sans-serif;" placeholder="Question Order"
                            v-model="form_ref_question_order" />
                    </span>

                    <Dropdown panel-style="font-family: Cairo, sans-serif;" input-style="font-family: Cairo, sans-serif;"
                        class="form_field" :options="question_answers" optionLabel="label" optionValue="value"
                        placeholder="Question Answer" v-model="form_ref_question_answer" />

                    <Button style="margin-bottom: 8px;" icon="pi pi-plus" class="p-button-rounded p-button-success"
                        @click="add_quiz_answer(Number(form_ref_question_order), form_ref_question_answer)" />
                </div>
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close_dialog()" class="p-button-text" />
            <Button label="OK" icon="pi pi-check" @click="ok_btn_click()" />
        </template>
    </Dialog>
</template>

<style scoped>
#add_quiz_answer_form {
    margin-top: 60px;
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
}

#quiz_answers_cont {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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