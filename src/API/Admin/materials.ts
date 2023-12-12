import axios from 'axios';

import { get_api_url } from '../../Lib/networking';
import { make_axios_request } from '../api_utils';

import { incoming_http_request } from '../../Models/http';
import { grid_col } from '../../Models/ui';
import { material_type, mat_id_pair, quiz_material } from '../../Models/material';

export async function get_all_mats(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/materials/get-all-mats`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    const axios_response = await make_axios_request(axios_request);

    const temp_data_obj = {
        'keys_map': {
            'material_id': {
                col_id: 'material_id',
                col_name: 'MaterialId',
                data_type: 'number',
            } as grid_col,
            'material_name_en': {
                col_id: 'material_name_en',
                col_name: 'MaterialNameEn',
                data_type: 'text',
            } as grid_col,
            'material_name_ar': {
                col_id: 'material_name_ar',
                col_name: 'MaterialNamear',
                data_type: 'text',
            } as grid_col,
            'lecture_name_en': {
                col_id: 'lecture_name_en',
                col_name: 'LinkedLecture',
                data_type: 'text',
            } as grid_col,
            'material_type': {
                col_id: 'material_type',
                col_name: 'MaterialType',
                data_type: 'enum',
            } as grid_col,
            'material_order': {
                col_id: 'material_order',
                col_name: 'MaterialOrder',
                data_type: 'number',
            } as grid_col,
            'material_link': {
                col_id: 'material_link',
                col_name: 'MaterialLink',
                data_type: 'text',
            } as grid_col,
        },
        'record': axios_response.data,
    };

    axios_response.data = temp_data_obj;

    return axios_response;
}

export async function add_material(mat: material_type): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/materials/add-vid-doc`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            linked_lec_id: mat.linked_lec_id,
            mat_type: mat.mat_type,
            mat_order: mat.mat_order,
            mat_name_en: mat.mat_name_en,
            mat_name_ar: mat.mat_name_ar,
            mat_link: mat.mat_link,
        },
    });

    return await make_axios_request(axios_request);
}

export async function delete_materials(mat_id_pairs: mat_id_pair[]): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/materials/delete-materials`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            items: mat_id_pairs,
        },
    });

    return await make_axios_request(axios_request);
}

export async function update_material(mat: material_type): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/materials/update-vid-doc`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            mat_id: mat.mat_id,
            linked_lec_id: mat.linked_lec_id,
            mat_type: mat.mat_type,
            mat_order: mat.mat_order,
            mat_name_en: mat.mat_name_en,
            mat_name_ar: mat.mat_name_ar,
            mat_link: mat.mat_link,
        },
    });

    return await make_axios_request(axios_request);
}

export async function add_quiz(quiz: quiz_material): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/materials/add-quiz`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            linked_lec_id: quiz.material_entry.linked_lec_id,
            mat_type: quiz.material_entry.mat_type,
            mat_order: quiz.material_entry.mat_order,
            mat_name_en: quiz.material_entry.mat_name_en,
            mat_name_ar: quiz.material_entry.mat_name_ar,
            mat_link: quiz.material_entry.mat_link,
            quiz_answers: quiz.quiz_answers,
        },
    });

    return await make_axios_request(axios_request);
}

export async function update_quiz(quiz: quiz_material): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/materials/update-quiz`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            mat_id: quiz.material_entry.mat_id,
            linked_lec_id: quiz.material_entry.linked_lec_id,
            mat_type: quiz.material_entry.mat_type,
            mat_order: quiz.material_entry.mat_order,
            mat_name_en: quiz.material_entry.mat_name_en,
            mat_name_ar: quiz.material_entry.mat_name_ar,
            mat_link: quiz.material_entry.mat_link,
            quiz_answers: quiz.quiz_answers,
        },
    });

    return await make_axios_request(axios_request);
}