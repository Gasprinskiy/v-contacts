<template>
    <contact-form @create-contact="saveCreatedContantToDb"/>
</template>

<script setup>

// imports
import { useRouter } from 'vue-router';
import { useNotification,  NButton } from 'naive-ui'; 
import { h } from 'vue'
import { addData, getDataByKeyValue } from '../services/dbRequests/'
import contactForm from '../components/contactForm.vue' 
/////////////

// data
const router = useRouter()
const notif = useNotification()
/////////////

// methods
const saveCreatedContantToDb = async (contact) => {
    const has = await getDataByKeyValue({target:  'contacts', keyValue: {phonenumber: contact.phonenumber} })
    if(has) {
        const n = notif.create({
            type: 'warning',
            title: 'Contact with the given phone number allready exist',
            duration: 5000,
            action: () => h(NButton, {
                text: true,
                type: "primary",
                onClick: () => {
                    router.push(`/contact-edit/${has.id}`)
                    n.destroy();
                }
                }, 
                {
                    default: () => "View contact"
                }
            )
        })
        return
    }
    const result = await addData({target: 'contacts', payload: contact})
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