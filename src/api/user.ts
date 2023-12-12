import axios from 'axios';

import { make_axios_request } from './api_utils';
import { get_api_url } from '../Lib/networking';

import { incoming_http_request } from '../Models/http';

export async function get_balance(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/user/get-balance`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    return await make_axios_request(axios_request);
}