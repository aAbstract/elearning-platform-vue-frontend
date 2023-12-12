<script setup lang="ts">

// framwork
import { onMounted } from 'vue';

// lib
import { subscribe } from '../../../Lib/mediator';

onMounted(() => {

    // attach event listner
    subscribe('notif_click', 'notif_click_func', (_) => {

        let notif_widget = document.querySelector('#notifications_cont') as HTMLElement;

        const top_state = window.getComputedStyle(notif_widget).getPropertyValue('top');

        const next_top_state = top_state == '-400px' ? '120px' : '-400px';

        notif_widget.style.top = next_top_state;

    });

});

</script>

<template>
    <div id="notifications_cont">
        <div id="not_wid_header">
            <b>Notifications</b>
            <i class="fa-solid fa-gear"></i>
        </div>
        <div id="nots_cont">
            <div class="not_text_div">
                <span>Lecture 5 (Lecture Title) Was Added</span>
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="not_text_div">
                <span>Lecture 4 (Lecture Title) Was Added</span>
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="not_text_div notif_seen">
                <span>Admin Feedback</span>
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="not_text_div notif_seen">
                <span>Your Request Was Accepted</span>
                <i class="fa-solid fa-check"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
#notifications_cont {
    top: -400px;
    position: absolute;
    background-color: white;
    width: 400px;
    height: fit-content;
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    padding: 8px 16px 8px 16px;
    transition: 0.5s ease;
    z-index: 1;
}

#not_wid_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
}

#not_wid_header b,
i {
    font-size: 18px;
}

#nots_cont {
    display: flex;
    flex-direction: column;
}

.not_text_div {
    padding: 4px 8px 4px 8px;
    border-bottom: 1px solid #bdbdbd;
    cursor: pointer;
    transition: 0.5s ease;
}

.not_text_div i {
    display: none;
    font-size: 16px;
}

.not_text_div:hover {
    background-color: #bdbdbd;
}

.notif_seen {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.notif_seen i {
    display: block !important;
}
</style>
