<template>
    <div class="contact-list-body column">
        <contact-item
            v-for="contact in props.resultList" :key="contact.id"
            :contact="contact"
        />
    </div>
</template>

<script setup>

//imports
import { defineProps } from 'vue'
import contactItem from './contactItem.vue';
/////////////

// props
const props = defineProps({
    resultList:{
        type: Array,
        default: []
    }
})
/////////////

</script>
