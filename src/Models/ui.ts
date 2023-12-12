import { incoming_http_request } from "./http";

export interface tesimonial {
    paragraph_symbol: string,
    name_symbol: string,
    education_symbol: string,
};

export interface quiz_answer {
    question_order: string,
    answer: string,
};

export interface admin_side_bar_item {
    label: string,
    icon: string,
    command: () => void,
};

export interface admin_nav_bar_item {
    label: string,
    icon: string[],
    func: () => void,
};

export interface grid_col {
    col_id: string,
    col_name: string,
    data_type: string,
};

export interface grid_constructor {
    grid_source_func: () => Promise<incoming_http_request>,
    resource_name: string,
    action_key: string,
    action_del_func: (record: any) => void,
    action_bulk_del_func: (records: any[]) => void,
};