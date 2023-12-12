import { ToastServiceMethods } from "primevue/toastservice";

const toast_title_map = {
    'success': 'Success',
    'error': 'Error',
    'warn': 'Warnning',
    'info': 'Info',
} as any;

export enum TOAST_TYPES {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
};

export function show_toast(toast_service: ToastServiceMethods, msg: string, toast_type: TOAST_TYPES) {
    toast_service.add({ severity: toast_type, summary: toast_title_map[toast_type], detail: msg, life: 3000 });
}