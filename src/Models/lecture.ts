// lectures meta data
export interface lecture_info {
    lec_id: number,
    lec_name_en: string,
    lec_name_ar: string,
    desc_en: string,
    desc_ar: string,
    thumbnail: string,
    vids_no: number,
    document_no: number,
    quizes_no: number,
    is_owned: boolean,
    price: number,
    duration: number,
};

export interface lecture_meta_data {
    lec_id: number,
    lec_name_en: string,
    lec_name_ar: string,
    desc_en: string,
    desc_ar: string,
    thumbnail: string,
    duration: number,
    price: number,
    content_meta: content_meta_data,
};

export interface video_meta_data {
    video_name_en: string,
    video_name_ar: string,
};

export interface document_meta_data {
    document_name_en: string,
    document_name_ar: string,
};

export interface quiz_meta_data {
    quiz_name_en: string,
    quiz_name_ar: string,
};

export interface content_meta_data {
    videos_list: video_meta_data[],
    document_list: document_meta_data[],
    quizzes_list: quiz_meta_data[],
};

// lecture content
export interface lecture_material {
    mat_id: number,
    mat_type: string,
    mat_order: number,
    name_en: string,
    name_ar: string,
    mat_link: string,
};