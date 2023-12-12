import axios from 'axios';

import { get_api_url } from '../Lib/networking';
import { make_axios_request } from './api_utils';

import { incoming_http_request } from '../Models/http';

export async function get_lecs(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/lectures/get-lectures`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    return await make_axios_request(axios_request);
}

export async function get_lec_content(lec_id: number): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/lectures/get-lecture-content`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            lec_id: lec_id,
        },
    });

    return await make_axios_request(axios_request);
}

export async function get_quiz_answers(mat_id: number): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/lectures/get-quiz-answers`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            quiz_id: mat_id,
        },
    });

    return await make_axios_request(axios_request);
}

export async function get_content_meta(lec_id: number): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/lectures/get-content-meta`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: { lec_id },
    });

    return await make_axios_request(axios_request);
}

export async function buy_lecture(lec_id: number): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/payments/make-payment`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: { lecture_id: lec_id },
    });

    return await make_axios_request(axios_request);
}