<template>
    <contact-form 
        @edit-contact="saveEditedContactInfo"
        @remove-contact="removeContact"
    />
</template>

<script setup>
// imports
import contactForm from '../components/contactForm.vue'
import { putData, deleteData } from '../services/dbRequests';
import { useRouter } from 'vue-router';
import { useNotification } from 'naive-ui'; 
/////////////

// data 
const notif = useNotification()
const router = useRouter()
/////////////

// methods
const saveEditedContactInfo = async (value) => {
    await putData({
        target: 'contacts',
        payload: value
    }).then(()=>{
        notif.success({
            title: 'Contact edited',
            duration: 4000,
        })
    })
}

const removeContact = async (value) => {
    await deleteData({
        target: 'contacts',
        id: value
    }).then(()=>{
        router.push(`/`)
        notif.success({
            title: 'Contact removed',
            duration: 4000,
        })
    })
}


/////////////

</script>

<style scoped>

</style>