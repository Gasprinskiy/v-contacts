<template>
    <contact-form @create-contact="saveCreatedContantToDb"/>
</template>

<script setup>
// imports
import { useRouter } from 'vue-router';
import { useNotification } from 'naive-ui'; 
import { addData } from '../services/dbRequests/'
import contactForm from '../components/contactForm.vue' 
/////////////

// data
const router = useRouter()
const notif = useNotification()
/////////////

// methods
const saveCreatedContantToDb = async (contact) => {
    const result = await addData({target:'contacts', payload: contact})
    await router.push(`/contact-edit/${result}`)
    notif.success({
        title: 'Contact crated',
        duration: 4000
    })
}
/////////////

</script>

<style scoped>

</style>