<script setup lang="ts">

// framework
import { ref, onMounted } from 'vue';

// lib
import { subscribe } from '../../../Lib/mediator';

// API
import { get_balance } from '../../../API/user';

// data models
import { user_type } from '../../../Models/user';

// utils
let cap_first_letter = (inp_string: string): string => inp_string.charAt(0).toUpperCase() + inp_string.slice(1);

defineProps<{ user: user_type }>();

// refs
const balance = ref('...');

onMounted(() => {
    get_balance().then((resp) => {
        if (!resp.success) {
            balance.value = 'xxx';
            return;
        }

        balance.value = String(resp.data['balance']);
    });

    subscribe('update_balance', 'update_balance_func', (_) => {
        get_balance().then((resp) => {
            if (!resp.success) {
                balance.value = 'xxx';
                return;
            }

            balance.value = String(resp.data['balance']);
        });
    });
});

</script>

<template>
    <div id="avatar_box_cont">
        <div id="avatar_icon">
            <img :src="`/images/${user?.user_img}`" alt="avatar" />
        </div>
        <div id="avatar_username">{{ user?.full_name }}</div>
        <div id="avatar_role">{{ cap_first_letter(user?.user_role || "no user") }} [ {{ balance }} LE ]</div>
    </div>
</template>

<style scoped>
#avatar_box_cont {
    display: grid;
    grid-template-columns: [v1] 1fr [v2] 3fr [v3];
    grid-template-rows: [h1] 1fr [h2] 1fr [h3];
    height: 100%;
}

#avatar_icon {
    grid-row: h1 / h3;
}

#avatar_icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 8px;
}

#avatar_icon img {
    width: 48px;
    border-radius: 50%;
}

#avatar_username,
#avatar_role {
    text-align: left;
    font-weight: bold;
}
</style>
