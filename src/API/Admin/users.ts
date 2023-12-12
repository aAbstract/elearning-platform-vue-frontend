import axios from 'axios';

import { get_api_url } from '../../Lib/networking';
import { make_axios_request } from '../api_utils';

import { incoming_http_request } from '../../Models/http';
import { grid_col } from '../../Models/ui';

export async function get_all_users(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/users/get-all-users`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    const axios_response = await make_axios_request(axios_request);

    const temp_data_obj = {
        'keys_map': {
            'user_id': {
                col_id: 'user_id',
                col_name: 'UserId',
                data_type: 'number',
            } as grid_col,
            'full_name': {
                col_id: 'full_name',
                col_name: 'FullName',
                data_type: 'text',
            } as grid_col,
            'username': {
                col_id: 'username',
                col_name: 'Username',
                data_type: 'text',
            } as grid_col,
            'user_role': {
                col_id: 'user_role',
                col_name: 'UserRole',
                data_type: 'enum',
            } as grid_col,
            'phone_number': {
                col_id: 'phone_number',
                col_name: 'PhoneNumber',
                data_type: 'text',
            } as grid_col,
            'parent_phone_number': {
                col_id: 'parent_phone_number',
                col_name: 'ParentPhoneNumber',
                data_type: 'text',
            } as grid_col,
            'email': {
                col_id: 'email',
                col_name: 'Email',
                data_type: 'text',
            } as grid_col,
            'balance': {
                col_id: 'balance',
                col_name: 'Balance',
                data_type: 'number',
            } as grid_col,
            'reg_type': {
                col_id: 'reg_type',
                col_name: 'RegistrationType',
                data_type: 'enum',
            } as grid_col,
            'grade': {
                col_id: 'grade',
                col_name: 'Grade',
                data_type: 'enum',
            } as grid_col,
            'center_name': {
                col_id: 'center_name',
                col_name: 'CenterName',
                data_type: 'enum',
            } as grid_col,
        },
        'record': axios_response.data,
    };

    axios_response.data = temp_data_obj;

    return axios_response;
}

export async function delete_user(username: string) {
    const api_url = `${get_api_url()}/admin/users/rm-user`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            username: username,
        },
    });

    return await make_axios_request(axios_request);
}

export async function delete_users(usernames: string[]) {
    const api_url = `${get_api_url()}/admin/users/delete-users`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            username_list: usernames,
        },
    });

    return await make_axios_request(axios_request);
}

export async function get_owned_lectures(user_id: number) {
    const api_url = `${get_api_url()}/admin/users/get-owned-lectures`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            user_id: user_id,
        },
    });

    return await make_axios_request(axios_request);
}

export async function rm_lec_ownership(user_id: number, lec_id: number) {
    const api_url = `${get_api_url()}/admin/users/rm-lec-ownership`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            user_id: user_id,
            lecture_id: lec_id,
        },
    });

    return await make_axios_request(axios_request);
}

export async function add_lec_ownership(user_id: number, lec_id: number) {
    const api_url = `${get_api_url()}/admin/users/add-lec-ownership`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            user_id: user_id,
            lecture_id: lec_id,
        },
    });

    return await make_axios_request(axios_request);
}

export async function update_user(
    full_name: string,
    username: string,
    reg_type: string,
    center_name: string,
    grade: number,
    password: string,
    is_password_changed: boolean,
    phone_number: string,
    parent_phone_number: string,
    email: string,
    user_role: string,
    balance: number,
) {
    const api_url = `${get_api_url()}/admin/users/update-user`;

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
            is_password_changed: is_password_changed,
            phone_number: phone_number,
            parent_phone_number: parent_phone_number,
            email: email,
            user_role: user_role,
            balance: balance,
        },
    });

    return await make_axios_request(axios_request);
}