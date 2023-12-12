<script setup lang="ts">

// lib
import { get_trans } from '../../../Lib/lang';

// models
import { tesimonial } from '../../../Models/ui';

defineProps<{
    testi_obj: tesimonial
}>();

</script>

<template>
    <div class="testi_card_cont">
        <p>{{ get_trans(testi_obj.paragraph_symbol) }}</p>
        <h4>
            <i class="pi pi-user" style="font-size: 20px;"></i>
            {{ get_trans(testi_obj.name_symbol) }}
        </h4>
        <span>{{ get_trans(testi_obj.education_symbol) }}</span>
    </div>
</template>

<style scoped>
.testi_card_cont {
    width: 500px;
    height: 250px;
    background-color: var(--primary-color);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    color: white;
    padding: 16px;
    border-radius: 8px;
    margin: 8px;
}

.testi_card_cont span {
    font-size: 18px;
}

.testi_card_cont h4 {
    margin: 0px;
    margin-bottom: 8px;
}

@media screen and (max-width: 600px) {
    .testi_card_cont {
        height: fit-content;
    }
}
</style>