import { user_type } from '../Models/user';
import { get_cookies } from './cookie';

function get_jwt_payload(jwt_token: string): any {
    let base64_url = jwt_token.split('.')[1];
    let base64 = base64_url.replace('-', '+').replace('_', '/');
    let payload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(payload);
}

export function get_logged_user(): user_type | null {

    let logged_user: user_type | null = null;

    try {
        const access_token: string = get_cookies()['access_token'];
        const user_obj: user_type = get_jwt_payload(access_token);
        logged_user = user_obj;
    } catch (err) { }


    return logged_user;
}
