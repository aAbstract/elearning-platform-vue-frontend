import axios from 'axios';

import { get_api_url } from '../../Lib/networking';
import { make_axios_request } from '../api_utils';

import { incoming_http_request } from '../../Models/http';
import { grid_col } from '../../Models/ui';

export async function get_all_coupons(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/coupons/get-all-coupons`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    const axios_response = await make_axios_request(axios_request);

    const temp_data_obj = {
        'keys_map': {
            'coupon_text': {
                col_id: 'coupon_text',
                col_name: 'CouponText',
                data_type: 'text',
            } as grid_col,
            'coupon_value': {
                col_id: 'coupon_value',
                col_name: 'CouponValue',
                data_type: 'number',
            } as grid_col,
        },
        'record': axios_response.data,
    };

    axios_response.data = temp_data_obj;

    return axios_response;
}

export async function generate_coupons(coupons_count: number, coupons_value: number): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/coupons/generate`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            coupons_list_count: coupons_count,
            coupons_value: coupons_value,
        },
    });

    return await make_axios_request(axios_request);
}

export async function delete_coupons(coupons: string[]): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/coupons/remove`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            coupons_list: coupons,
        },
    });

    return await make_axios_request(axios_request);
}