export interface material_type {
    mat_id: number,
    linked_lec_id: number,
    mat_type: string,
    mat_order: number,
    mat_name_en: string,
    mat_name_ar: string,
    mat_link: string,
};

export interface mat_id_pair {
    is_quiz: boolean,
    mat_id: number,
};

export interface quiz_answer {
    question_order: number,
    question_answer: string,
};

export interface quiz_material {
    material_entry: material_type,
    quiz_answers: quiz_answer[],
};