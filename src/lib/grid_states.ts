// lib
import { post_event } from './mediator';
import { TOAST_TYPES } from '../Lib/toast';

// API
import { get_all_users, delete_user, delete_users } from '../API/Admin/users';
import { get_all_lecs, delete_lectures } from '../API/Admin/lectures';
import { get_all_mats, delete_materials } from '../API/Admin/materials';
import { get_all_coupons, delete_coupons } from '../API/Admin/coupons';
import { get_all_payment_logs, delete_payment_logs } from '../API/Admin/payment_logs';
import { get_announcements, delete_announcement } from '../API/Admin/announcements';

// models
import { grid_constructor } from '../Models/ui';
import { mat_id_pair } from '../Models/material';

export const grid_state_map = {
    'system_users': {
        grid_source_func: get_all_users,
        resource_name: 'System Users',
        action_key: 'username',
        action_del_func: (record: any) => {
            post_event('grid_controller_toast', {
                toast_msg: 'Deleting User From Database...',
                toast_type: TOAST_TYPES.INFO,
            });

            const action_key = 'username';
            const key_value = String(record[action_key]);

            // send delete record API request
            delete_user(key_value).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'User Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
        action_bulk_del_func: (records: any[]) => {
            post_event('grid_controller_toast', {
                toast_msg: 'Deleting Users From Database...',
                toast_type: TOAST_TYPES.INFO,
            });

            const action_key = 'username';
            const key_values = records.map((x) => String(x[action_key]));

            delete_users(key_values).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Users Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
    } as grid_constructor,
    'lectures': {
        grid_source_func: get_all_lecs,
        resource_name: 'Lectures',
        action_key: 'lecture_id',
        action_del_func: (record: any) => {
            post_event('grid_controller_toast', {
                toast_msg: 'Deleting Lecture From Database...',
                toast_type: TOAST_TYPES.INFO,
            });

            const action_key = 'lecture_id';
            const key_value = Number(record[action_key]);

            delete_lectures([key_value]).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Lecture Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
        action_bulk_del_func: (records: any[]) => {
            post_event('grid_controller_toast', {
                toast_msg: 'Deleting Lectures From Database...',
                toast_type: TOAST_TYPES.INFO,
            });

            const action_key = 'lecture_id';
            const key_values = records.map((x) => Number(x[action_key]));

            delete_lectures(key_values).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Lectures Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
    } as grid_constructor,
    'materials': {
        grid_source_func: get_all_mats,
        resource_name: 'Materials',
        action_key: 'material_id',
        action_del_func: (record: any) => {
            const id_pair = {
                is_quiz: record.material_type == 'QUIZ',
                mat_id: record.material_id,
            } as mat_id_pair;

            delete_materials([id_pair]).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Material Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
        action_bulk_del_func: (records: any[]) => {
            const id_pairs = records.map((x) => {
                return {
                    is_quiz: x.material_type == 'QUIZ',
                    mat_id: x.material_id,
                } as mat_id_pair;
            });

            delete_materials(id_pairs).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Materials Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
    } as grid_constructor,
    'coupons': {
        grid_source_func: get_all_coupons,
        resource_name: 'Coupons',
        action_key: 'coupon_text',
        action_del_func: (record: any) => {
            const action_key = 'coupon_text';
            const key_value = record[action_key];

            delete_coupons([key_value]).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Coupon Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
        action_bulk_del_func: (records: any[]) => {
            const action_key = 'coupon_text';
            const key_values = records.map((x) => x[action_key]);

            delete_coupons(key_values).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Coupons Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
    } as grid_constructor,
    'payments_history': {
        grid_source_func: get_all_payment_logs,
        resource_name: 'Payments History',
        action_key: 'payment_log_id',
        action_del_func: (record: any) => {
            const action_key = 'payment_log_id';
            const key_value = record[action_key];

            delete_payment_logs([key_value]).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Payment Logs Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
        action_bulk_del_func: (records: any[]) => {
            const action_key = 'payment_log_id';
            const key_values = records.map((x) => x[action_key]);

            delete_payment_logs(key_values).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Payment Logs Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
    } as grid_constructor,
    'announcements': {
        grid_source_func: get_announcements,
        resource_name: 'Announcements',
        action_key: 'announcement_id',
        action_del_func: (record: any) => {
            const action_key = 'announcement_id';
            const key_value = record[action_key];

            delete_announcement([key_value]).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Announcement Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
        action_bulk_del_func: (records: any[]) => {
            const action_key = 'announcement_id';
            const key_values = records.map((x) => x[action_key]);

            delete_announcement(key_values).then((resp) => {
                if (!resp.success) {
                    post_event('grid_controller_toast', {
                        toast_msg: resp.msg,
                        toast_type: TOAST_TYPES.ERROR,
                    });
                    return;
                }

                post_event('grid_controller_toast', {
                    toast_msg: 'Announcements Deleted From Database',
                    toast_type: TOAST_TYPES.SUCCESS,
                });

                post_event('refresh_grid_controller', {});
            });
        },
    } as grid_constructor,
} as any;