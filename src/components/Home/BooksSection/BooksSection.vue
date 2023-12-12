<script setup lang="ts">

// lib
import { get_trans, get_lang } from '../../../Lib/lang';

// global vars
const lang = get_lang();

</script>
    
<template>
    <div id="books_section_cont" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
        <h2>{{ get_trans('books') }}</h2>
        <span>{{ get_trans('nothing_in_book_store') }}</span>
    </div>
</template>
    
<style scoped>
#books_section_cont_inner_cont {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}

#books_section_cont h2 {
    border-bottom: 4px solid var(--primary-color);
    width: fit-content;
}

#books_section_cont {
    padding: 40px 200px;
    width: 100%;
    height: fit-content;
}

@media screen and (max-width: 600px) {
    #books_section_cont {
        padding: 8px;
    }
}
</style>