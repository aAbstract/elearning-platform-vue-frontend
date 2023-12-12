import axios from 'axios';

import { get_api_url } from '../../Lib/networking';
import { make_axios_request } from './../api_utils';

import { incoming_http_request } from '../../Models/http';
import { grid_col } from '../../Models/ui';
import { announcement_type } from '../../Models/announcement';

export async function get_announcements(): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/announcements/get-announcements`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
    });

    const axios_response = await make_axios_request(axios_request);

    // convert datetime format
    (axios_response.data as any[]).forEach((x) => x['announcement_datetime'] = new Date(x['announcement_datetime']));

    const temp_data_obj = {
        'keys_map': {
            'announcement_id': {
                col_id: 'announcement_id',
                col_name: 'AnnouncementId',
                data_type: 'number',
            } as grid_col,
            'announcement_desc_en': {
                col_id: 'announcement_desc_en',
                col_name: 'AnnouncementDescEn',
                data_type: 'text',
            } as grid_col,
            'announcement_desc_ar': {
                col_id: 'announcement_desc_ar',
                col_name: 'AnnouncementDescAr',
                data_type: 'text',
            } as grid_col,
            'announcement_link': {
                col_id: 'announcement_link',
                col_name: 'AnnouncementLink',
                data_type: 'text',
            } as grid_col,
            'announcement_datetime': {
                col_id: 'announcement_datetime',
                col_name: 'AnnouncementDateTime',
                data_type: 'datetime',
            } as grid_col,
        },
        'record': axios_response.data,
    };

    axios_response.data = temp_data_obj;

    return axios_response;
}

export async function add_announcement(_announcement: announcement_type): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/announcements/add-announcement`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: {
            announcement_desc_en: _announcement.announcement_desc_en,
            announcement_desc_ar: _announcement.announcement_desc_ar,
            announcement_link: _announcement.announcement_link,
            announcement_datetime: _announcement.announcement_datetime,
        },
    });

    return await make_axios_request(axios_request);
}

export async function delete_announcement(announcement_ids: number[]): Promise<incoming_http_request> {
    const api_url = `${get_api_url()}/admin/announcements/delete-announcements`;

    const axios_request = axios({
        method: 'post',
        url: api_url,
        data: { announcement_ids },
    });

    return await make_axios_request(axios_request);
}