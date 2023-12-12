import axios from 'axios';

import { make_axios_request } from './api_utils';
import { get_api_url } from '../Lib/networking';

import { incoming_http_request } from '../Models/http';

export async function login_user(username: string, password: string): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/auth/login`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            username: username,
            password: password,
        },
    });

    return await make_axios_request(axios_request);
}

export async function signup_user(
    full_name: string,
    username: string,
    reg_type: string,
    center_name: string,
    grade: string,
    password: string,
    phone_number: string,
    parent_phone_number: string,
    email: string
): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/auth/signup`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            full_name: full_name,
            username: username,
            reg_type: reg_type,
            center_name: center_name,
            grade: grade,
            password: password,
            phone_number: phone_number,
            parent_phone_number: parent_phone_number,
            email: email,
        },
    });

    return await make_axios_request(axios_request);
}
