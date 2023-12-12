export let $ = document.querySelector.bind(document);

export function show_error_msg(dom_id: string, err_msg: string) {
    const element = $(`#${dom_id}`) as HTMLElement;
    element.style.display = 'block';
    element.innerText = err_msg;
}

export function render_error_msg(dom_id: string, err_msg_html: string) {
    const element = $(`#${dom_id}`) as HTMLElement;
    element.style.display = 'block';
    element.innerHTML = err_msg_html;
}