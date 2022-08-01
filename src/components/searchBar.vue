<template>
    <div class="search-bar column">
        <n-input
            placeholder="Search" 
            v-model:value="searhQuerry" 
            @input="splitAndEmitQuerry"
        />
        <n-select 
            v-model:value="selectValue" 
            :options="selectOptions"
            @update-value="emitSelectUpdate"
            
        />
    </div>
</template>

<script setup>

// imports
import { NIcon, NInput, NSelect } from 'naive-ui'
import { defineProps, defineEmits, computed ,ref } from 'vue'
/////////////

// emits
const emits = defineEmits(['input-querry', 'select-update'])
/////////////

// props
const props = defineProps({
    isGroupChosen: {
        type: Boolean,
        default: false
    }
})
/////////////

// computed
const selected = computed(() => selectValue.value !== '')
const splitedQuerry = computed(() => searhQuerry.value !== '' ? searhQuerry.value.split(/\s/g) : '')
const isEmpty = computed(()=> searhQuerry.value === '' && selectValue.value === '')
/////////////

// data 
const searhQuerry = ref('')
const selectValue = ref('')
const selectOptions = ref([
    {label: 'No filter', value: ''},
    {label: 'Family', value: 'family'},
    {label: 'Work', value: 'work'},
    {label: 'Services', value: 'services'}
])
/////////////

// methods 
const splitAndEmitQuerry = () => {
    emits('input-querry', splitedQuerry.value, selectValue.value)
}

const emitSelectUpdate = (value) => {
    emits('select-update', splitedQuerry.value, value)
}
/////////////

</script>

<style scoped>
</style>