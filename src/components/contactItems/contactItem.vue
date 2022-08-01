<template>
    <div class="contact-item" @click="pushIntoClickedContact">
        <div
        class="avatar" 
        round
        >
            <n-icon
                :component="PersonCircleOutline"
            />
        </div>
        <div>
            <h4 class="contact-name">{{props.contact.fullname}}</h4>
            <h3 class="contact-info">
                <span class="info-inner">
                    Phone number:
                    <span>
                        <input 
                            type="text" 
                            v-mask="'+### ## ### ## ##'"
                            readonly 
                            :value="props.contact.phonenumber"
                        > 
                    </span>
                </span> 
                <span class="info-inner">
                    Email: <span>{{props.contact.email}}</span>
                </span>   
            </h3>
        </div>
        
    </div>
</template>

<script setup>

// imports
import { NIcon } from 'naive-ui'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { PersonCircleOutline } from '@vicons/ionicons5'
import { TheMask } from 'vue-the-mask'
/////////////

// props
const props = defineProps({
    contact: {
        type: Object,
        default: {}
    }
})
/////////////

// data
const router = useRouter()
/////////////

// methods 
const pushIntoClickedContact = () => {
    router.push(`/contact-edit/${props.contact.id}`)
}
/////////////

</script>

<style scoped>
    .contact-item {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 3px;
        padding: 2px;
        font-weight: 500;
    }
    .contact-item:hover {
        background-color: rgba(24, 160, 88, 0.15);
        color: #36ad6a;
    }

    .contact-item:hover .avatar  {
        background-color: #36ad6a;
    }
    .contact-name {
        font-weight: 500;
        font-size: 16px;
    }
    .contact-info {
        font-weight: 400;
        font-size: 13px;
        display: flex;
        flex-direction: column;
    }
    .info-inner span {
        font-weight: 500;
    }
    .info-inner input {
        cursor: inherit;
    }
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #213547;
        color: #fff;
        font-size: 46px;
        margin-right: 15px;
    }
</style>