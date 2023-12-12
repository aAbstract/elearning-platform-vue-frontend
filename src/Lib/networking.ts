const debug = false;
const lan_mode = false;
const debug_server_url = `http://${lan_mode ? '192.168.1.12' : 'localhost'}:8080/api`;
const prod_server_url = '/api';

export let get_api_url = (): string => { return (debug ? debug_server_url : prod_server_url); }

export let get_file_server_url = (): string => { return (debug ? 'http://localhost:8080' : ''); }