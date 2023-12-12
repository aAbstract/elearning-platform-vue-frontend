import { post_event, request } from './mediator';
import { quick_actions_type } from '../Models/menus';

// APIs
// import { gen_cop_list } from '../API/admin/gen_cop_list';

// UI components
import GenCouponListForm from '../components/Admin/GenCouponListForm.vue';

export const admin_qactions_menu = <quick_actions_type[]>[
    {
        name: 'Generate Coupons',
        icon: 'fa-solid fa-ticket',
        func: () => { },
        // func: () => {
        //     post_event('show_modal', {
        //         modal_header: 'Admin Generate Coupons',
        //         modal_body: GenCouponListForm,
        //         ok_click: () => {

        //             post_event('modal_action_msg', { msg: 'Loading...', color: '#2c2c2c' });

        //             const cop_count: number = request('cop_count_tf');

        //             gen_cop_list(cop_count).then((server_json_resp) => {
        //                 if (!server_json_resp['success']) {
        //                     post_event('modal_action_msg', { msg: server_json_resp['err_msg'], color: '#dd2c00' });
        //                     return
        //                 }

        //                 post_event('modal_action_msg', { msg: 'Action Done', color: '#2c2c2c' });

        //                 post_event('cops_list_redirect', { cops_list: server_json_resp['data']['cops_list'] });
        //             });
        //         }
        //     });
        // },
    },
    {
        name: 'Admin Action 2',
        icon: 'fa-solid fa-bolt',
        func: () => { },
    },
    {
        name: 'Admin Action 3',
        icon: 'fa-solid fa-bolt',
        func: () => { },
    },
];

export const student_qactions_menu = <quick_actions_type[]>[
    {
        name: 'No Actions Here',
        icon: 'fa-solid fa-bolt',
        func: () => { },
    },
];
