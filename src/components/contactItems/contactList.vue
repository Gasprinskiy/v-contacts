<template>
    <div
    class="contact-list-wrapper" 
    v-for="item in props.contactList" 
    :key="item.lettergroup"
    >
        <h3 class="contact-list-lettergorup">{{item.lettergroup}}</h3>
        <div class="contact-list-body column">
            <contact-item
                v-for="contact in item.data" :key="contact.id"
                :contact="contact"
            />
        </div>
    </div>
</template>

<script setup>

//imports
import { defineProps} from 'vue'
import contactItem from './contactItem.vue';
/////////////

// props
const props = defineProps({
    contactList:{
        type: Array,
        default: []
    }
})
/////////////

</script>

<style scoped>
    .contact-list-wrapper {
        display: flex;
        flex-direction: column;
    }

    .contact-list-lettergorup {
        font-size: 18px;
        margin: 5px 0px;
        color: #36ad6a;
    }
</style>