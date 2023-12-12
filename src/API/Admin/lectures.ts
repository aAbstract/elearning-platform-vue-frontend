import axios from 'axios';

import { get_api_url } from '../../Lib/networking';
import { make_axios_request } from '../api_utils';

import { incoming_http_request } from '../../Models/http';
import { lecture_meta_data } from '../../Models/lecture';
import { grid_col } from '../../Models/ui';

export async function get_all_lecs(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/lectures/get-all-lecs`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    const axios_response = await make_axios_request(axios_request);

    const temp_data_obj = {
        'keys_map': {
            'lecture_id': {
                col_id: 'lecture_id',
                col_name: 'LectureId',
                data_type: 'number',
            } as grid_col,
            'lecture_name_en': {
                col_id: 'lecture_name_en',
                col_name: 'LectureNameEn',
                data_type: 'text',
            } as grid_col,
            'lecture_name_ar': {
                col_id: 'lecture_name_ar',
                col_name: 'LectureNameAr',
                data_type: 'text',
            } as grid_col,
            'lecture_desc_en': {
                col_id: 'lecture_desc_en',
                col_name: 'LectureDescEn',
                data_type: 'text',
            } as grid_col,
            'lecture_desc_ar': {
                col_id: 'lecture_desc_ar',
                col_name: 'LectureDescAr',
                data_type: 'text',
            } as grid_col,
            'thumbnail': {
                col_id: 'thumbnail',
                col_name: 'Thumbnail',
                data_type: 'text',
            } as grid_col,
            'price': {
                col_id: 'price',
                col_name: 'Price',
                data_type: 'number',
            } as grid_col,
            'duration': {
                col_id: 'duration',
                col_name: 'Duration',
                data_type: 'number',
            } as grid_col,
        },
        'record': axios_response.data,
    };

    axios_response.data = temp_data_obj;

    return axios_response;
}

export async function add_lec(lec: lecture_meta_data): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/lectures/add-lecture`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            lec_name_en: lec.lec_name_en,
            lec_name_ar: lec.lec_name_ar,
            lec_desc_en: lec.desc_en,
            lec_desc_ar: lec.desc_ar,
            thumbnail: lec.thumbnail,
            duration: lec.duration,
            price: lec.price,
        }
    });

    return await make_axios_request(axios_request);
}

export async function delete_lectures(lec_ids: number[]): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/lectures/delete-lecs`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            lec_ids: lec_ids,
        }
    });

    return await make_axios_request(axios_request);
}

export async function update_lecture(lec: lecture_meta_data): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/lectures/update-lecture`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            lec_id: lec.lec_id,
            lec_name_en: lec.lec_name_en,
            lec_name_ar: lec.lec_name_ar,
            lec_desc_en: lec.desc_en,
            lec_desc_ar: lec.desc_ar,
            thumbnail: lec.thumbnail,
            duration: lec.duration,
            price: lec.price,
        }
    });

    return await make_axios_request(axios_request);
}

export async function get_lecs_data_source(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/lectures/get-lecs-data-source`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    return await make_axios_request(axios_request);
}

export async function upload_lecture_thumbnail(lecture_thumbnail: File): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/lectures/upload-lec-thumbnail`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: {
            file: lecture_thumbnail,
        },
    });

    return await make_axios_request(axios_request);
}