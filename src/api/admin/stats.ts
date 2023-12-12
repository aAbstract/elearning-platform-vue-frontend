import axios from 'axios';

import { get_api_url } from '../../Lib/networking';
import { make_axios_request } from '../api_utils';

import { incoming_http_request } from '../../Models/http';

export async function get_stats(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/stats/get-stats`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    return await make_axios_request(axios_request);
}