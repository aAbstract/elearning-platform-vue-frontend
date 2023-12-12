<script setup lang="ts">

// models
import { quick_actions_type } from '../../../Models/menus';

// framwork
import { onMounted } from 'vue';

// lib
import { subscribe } from '../../../Lib/mediator';

defineProps<{ items: quick_actions_type[] }>();

onMounted(() => {

    // attach event listner
    subscribe('qaction_click', 'qaction_click_func', (_) => {

        let qaction_widget = document.querySelector('#quick_actions_cont') as HTMLElement;

        const top_state = window.getComputedStyle(qaction_widget).getPropertyValue('top');

        const next_top_state = top_state == '-400px' ? '120px' : '-400px';

        qaction_widget.style.top = next_top_state;

    });

});

</script>

<template>
    <div id="quick_actions_cont">
        <div id="qactions_header">
            <b>Quick Actions</b>
        </div>
        <div id="qactions_cont">
            <div v-for="(item, index) in items" :key="index" @click="item.func()" class="qaction_item">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
#quick_actions_cont {
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

#qactions_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
}

#qactions_header b {
    font-size: 18px;
}

#qactions_cont {
    display: flex;
    flex-direction: column;
}

.qaction_item {
    transition: 0.5s ease;
    border-bottom: 1px solid #bdbdbd;
    padding: 4px 8px 4px 8px;
}

.qaction_item:hover {
    background-color: #bdbdbd;
    cursor: pointer;
}

.qaction_item i {
    margin-right: 8px;
}
</style>
