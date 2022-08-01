<template>
    <div class="contact-form-wrapper">
        <heading-template>
            <template #left-side>
                <h2>{{title}} contact</h2>
            </template>
            <template #right-side>
                <div class="create-button" v-if="!isRedact">
                    <n-button
                        type="primary"
                        @click="validateAndEmitContactCreateOperation"
                    >  
                        <template #icon>
                            <n-icon
                                :component="CreateOutline"
                            />
                        </template>
                        Create 
                    </n-button>
                </div>
                <div class="edit-button-group" v-else>
                    <n-button
                        type="negative"
                        @click="validateAndEmitContactRemove"
                        ghost
                        color="#ba1b1b"
                    >  
                        <template #icon>
                            <n-icon
                                :component="RemoveCircleOutline"
                            />
                        </template>
                        Remove
                    </n-button>
                    <n-button
                        type="primary"
                        @click="validateAndEmitSaveContactChanges"
                        :disabled="isValuesUnchanged"
                    >  
                        <template #icon>
                            <n-icon
                                :component="SaveOutline"
                            />
                        </template>
                        Save 
                    </n-button>
                </div>
            </template>
        </heading-template>
        <div class="contact-form-body column">
            <n-input
                type="text"
                placeholder="Full Name"
                v-model:value="formValues.fullname"
                :status="isFullnameValid"
            />
            <n-input
                type="text"
                placeholder="Phone number"
                v-mask="'+### ## ### ## ##'"
                v-model:value="maskedPhoneNumber"
                @input="updatePhoneNumber"
                :status="isPhonenumberValid"
            />
            <n-input
                type="text"
                placeholder="Email"
                v-model:value="formValues.email"
                :status="isEmailValid"
            />
            <n-select
                placeholder="Where is the fucking placeholder"
                v-model:value="formValues.group"
                :options="groupOptions"
            />
        </div>
    </div>
</template>

<script setup>
// imports
import { NInput, NSelect, NButton, NIcon } from 'naive-ui'
import { CreateOutline, SaveOutline, RemoveCircleOutline } from '@vicons/ionicons5'
import { onBeforeMount, computed, ref, toRaw, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { getDataById } from '../services/dbRequests/'
import { splitFullName } from '../services/helpers/'
import headingTemplate from './templates/headingTemplate.vue'

import useVuelidate from '@vuelidate/core'
import { required, email, maxLength, minLength } from '@vuelidate/validators'
/////////////

// emits
const emits = defineEmits(['create-contact', 'edit-contact', 'remove-contact'])
/////////////

// data
const formValues = ref({
    fullname: '', 
    email: '', 
    phonenumber: '', 
    group: ''
})
const groupOptions = ref([
    {label: 'No group', value: ''},
    {label: 'Family', value: 'family'},
    {label: 'Work', value: 'work'},
    {label: 'Services', value: 'services'}
])
const maskedPhoneNumber = ref('')
const sourceFormValue = ref('')
const route = useRoute()
/////////////

// computed
const isRedact = computed(()=> route.meta.isRedact)
const title = computed(()=> route.meta.isRedact ? 'Edit' : 'Create')
const emailValidationRule = computed(()=> formValues.email !== '' ? { email } : {minLength: minLength(0)})

const isValuesUnchanged = computed (()=> JSON.stringify(formValues.value) === sourceFormValue.value)
const isFullnameValid = computed(()=> (v$.value.fullname.$dirty && v$.value.fullname.$invalid) ? 'error' : '')
const isPhonenumberValid = computed(()=> (v$.value.phonenumber.$dirty && v$.value.phonenumber.$invalid) ? 'error' : '')
const isEmailValid = computed(()=> (v$.value.email.$dirty && v$.value.email.$invalid) ? 'error' : '')
/////////////

// validators
const validators = {
    fullname: {required, minLength: minLength(3)},
    phonenumber: { required, minLength: minLength(9), maxLength: maxLength(13) },
    email: emailValidationRule
}
const v$ = useVuelidate(validators, formValues)
/////////////

// methods
const createPayload = () => {
    const splitedFullName = splitFullName(formValues.value.fullname)
    return Object.assign(toRaw(formValues.value), splitedFullName);
}

const updatePhoneNumber = () => {
    formValues.value.phonenumber = maskedPhoneNumber.value.replace(/\s/g, '');
}

const validteForm = () => {
    v$.value.$validate()
    return !v$.value.$invalid
}

const validateAndEmitCaller = ({emitName, payload}) => {
    const isValid = validteForm()
    if(isValid){emits(emitName, payload)}
} 

const validateAndEmitContactCreateOperation = () => {
    validateAndEmitCaller({
        emitName: 'create-contact',
        payload: createPayload()
    })
}

const validateAndEmitSaveContactChanges = () => {
    validateAndEmitCaller({
        emitName: 'edit-contact',
        payload: toRaw(formValues.value)
    })
}

const validateAndEmitContactRemove = () => {
    validateAndEmitCaller({
        emitName: 'remove-contact',
        payload: formValues.value.id
    })
}

const getDataUserDataByRouteParams = async () => {
    if(isRedact.value) {
        await getDataById({
            target: 'contacts',
            id: Number(route.params.id)
        })
        .then(data => {
            formValues.value = data
            maskedPhoneNumber.value = data.phonenumber
            sourceFormValue.value = JSON.stringify(data)
        })
    }
}
/////////////

//hooks
onBeforeMount(()=>{
    getDataUserDataByRouteParams()
})
/////////////

</script>

<style scoped>

</style>