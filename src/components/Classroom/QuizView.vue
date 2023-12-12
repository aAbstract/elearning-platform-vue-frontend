<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// lib
import { get_trans, get_trans_entrop } from '../../Lib/lang';
import { show_error_msg } from '../../Lib/dom';

// UI components
import LoadingScreen from '../Common/LoadingScreen.vue';

// API
import { get_quiz_answers } from '../../API/lectures';

// primevue
import Button from 'primevue/button';

// models
import { lecture_material } from '../../Models/lecture';
import { quiz_answer } from '../../Models/ui';

const props = defineProps<{ mat_item: lecture_material }>();

// refs
const is_quiz_loading = ref(true);
const is_answers_loading = ref(true);
const quiz_answers = ref([] as quiz_answer[]);
const score_ind_ref = ref([] as string[]);
const score_text = ref('0 / 0');

// event handlers
function validate_answers() {
    const sel_answers: string[] = [];
    let cor_count = 0;
    for (let i = 0; i < quiz_answers.value.length; i++) {
        const check_ele = document.querySelector(`input[name="quiz_ans_${i}"]:checked`) as HTMLInputElement;
        if (check_ele == null) {
            sel_answers.push('X');
            score_ind_ref.value[i] = 'wrong_answer';
        }
        else {
            const ans = check_ele.value;
            sel_answers.push(ans);
            if (ans == quiz_answers.value[i].answer) {
                score_ind_ref.value[i] = 'correct_answer';
                cor_count++;
            }
            else {
                score_ind_ref.value[i] = 'wrong_answer';
            }
        }
    }
    score_text.value = `${cor_count} / ${quiz_answers.value.length}`
}

onMounted(() => {
    (document.querySelector('#quiz_iframe') as HTMLElement).onload = () => { is_quiz_loading.value = false; };

    // get quiz answers API call
    get_quiz_answers(props.mat_item.mat_id).then((resp) => {
        is_answers_loading.value = false;

        if (!resp.success) {
            show_error_msg('quiz_view_err_text', resp.msg);
            return;
        }

        quiz_answers.value = resp.data as quiz_answer[];
    });

    for (let i = 0; i < quiz_answers.value.length; i++)
        score_ind_ref.value.push('');
});
</script>

<template>
    <div id="quiz_main_cont">
        <LoadingScreen v-if="is_quiz_loading" />
        <iframe :src="'https://drive.google.com/file/d/1jVG_2Sf2tBa8HODwBhYJAjr3KxSeu2ls/preview'" frameborder="0"
            id="quiz_iframe" allow="autoplay"></iframe>
        <LoadingScreen v-if="is_answers_loading" />
        <div v-else id="quiz_bub_sheet">
            <div id="quiz_bub_sheet_inner_cont">
                <h4>{{ get_trans('answers_sheet') }}</h4>
                <h4 id="quiz_view_err_text" class="error_text">ERROR</h4>
                <div id="answers_cont">
                    <div v-for="(item, index) in quiz_answers" :key="index" class="answer_cont">
                        <h6 :class="`${score_ind_ref[index]}`">{{ get_trans_entrop('quiz_ans', { 'ans_no': index + 1 })
                        }}<b style="visibility: hidden;"> | {{ get_trans('correct_answer') }}: {{
                            get_trans(`quiz_op_${quiz_answers[index].answer.toLowerCase()}`) }}</b></h6>
                        <div class="radios_cont">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" :name="`quiz_ans_${index}`" value="A"
                                    :id="`quiz_ans_${index}_a`">
                                <label class="form-check-label" :for="`quiz_ans_${index}_a`">
                                    {{ get_trans('quiz_op_a') }}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" :name="`quiz_ans_${index}`" value="B"
                                    :id="`quiz_ans_${index}_b`">
                                <label class="form-check-label" :for="`quiz_ans_${index}_b`">
                                    {{ get_trans('quiz_op_b') }}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" :name="`quiz_ans_${index}`" value="C"
                                    :id="`quiz_ans_${index}_c`">
                                <label class="form-check-label" :for="`quiz_ans_${index}_c`">
                                    {{ get_trans('quiz_op_c') }}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" :name="`quiz_ans_${index}`" value="D"
                                    :id="`quiz_ans_${index}da`">
                                <label class="form-check-label" :for="`quiz_ans_${index}_d`">
                                    {{ get_trans('quiz_op_d') }}
                                </label>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
                <div id="quiz_score_cont">
                    <Button id="bub_sub_btn" :label="get_trans('quiz_val')" style="font-family: Cairo, sans-serif;"
                        @click="validate_answers()" />
                    <h6>{{ get_trans('score') }} : {{ score_text }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#quiz_main_cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#quiz_iframe {
    width: 100%;
    flex-grow: 1;
}

#quiz_bub_sheet {
    width: 100%;
    max-height: 30%;
    display: block;
    padding: 12px;
}

#quiz_bub_sheet_inner_cont {
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    padding: 8px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}

#quiz_bub_sheet_inner_cont h4 {
    margin: 0px;
}

.answer_cont {
    width: 100%;
}

.answer_cont h6 {
    margin: 0px;
    font-size: 14px;
}

.radios_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

#bub_sub_btn {
    width: 100px;
    height: 50px;
}

@media screen and (max-width: 600px) {
    #quiz_main_cont {
        justify-content: flex-end;
    }

    #quiz_iframe {
        height: 200px;
        height: 33vh;
        flex-grow: unset;
    }
}

#quiz_score_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

#quiz_score_cont h6 {
    font-size: 16px;
    font-weight: bold;
}

.correct_answer {
    font-weight: bold;
    color: green;
}

.wrong_answer {
    font-weight: bold;
    color: red;
}

.wrong_answer b {
    visibility: visible !important;
}
</style>