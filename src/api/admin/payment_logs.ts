import axios from 'axios';

import { get_api_url } from '../../Lib/networking';
import { make_axios_request } from '../api_utils';

import { incoming_http_request } from '../../Models/http';
import { grid_col } from '../../Models/ui';

export async function get_all_payment_logs(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/payment-logs/get-all-logs`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    const axios_response = await make_axios_request(axios_request);

    // convert datetime format
    (axios_response.data as any[]).forEach((x) => x['log_datetime'] = new Date(x['log_datetime']));

    const temp_data_obj = {
        'keys_map': {
            'payment_log_id': {
                col_id: 'payment_log_id',
                col_name: 'PaymentLogId',
                data_type: 'number',
            } as grid_col,
            'user_id': {
                col_id: 'user_id',
                col_name: 'UserId',
                data_type: 'number',
            } as grid_col,
            'username': {
                col_id: 'username',
                col_name: 'Username',
                data_type: 'text',
            } as grid_col,
            'full_name': {
                col_id: 'full_name',
                col_name: 'FullName',
                data_type: 'text',
            } as grid_col,
            'log_datetime': {
                col_id: 'log_datetime',
                col_name: 'DateTime',
                data_type: 'datetime',
            } as grid_col,
            'payment_log_text': {
                col_id: 'payment_log_text',
                col_name: 'Description',
                data_type: 'text',
            } as grid_col,
        },
        'record': axios_response.data,
    };

    axios_response.data = temp_data_obj;

    return axios_response;
}

export async function delete_payment_logs(payment_log_ids: number[]): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/payment-logs/delete-logs`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: { payment_log_ids },
    });

    return await make_axios_request(axios_request);
}