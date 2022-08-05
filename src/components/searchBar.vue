<template>
    <div class="search-bar column">
        <n-input
            placeholder="Search" 
            v-model:value="searhQuerry" 
            @input="splitAndEmitQuerry"
        >
            <template #prefix>
                <n-icon
                    :component="SearchOutline"
                />
            </template>
        </n-input>
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
import { SearchOutline } from '@vicons/ionicons5'
import { defineProps, defineEmits, ref } from 'vue'
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
const splitAndEmitQuerry = (e) => {
    const value = e.split(/\s/g).filter(item => item !== '')
    emits('input-querry', value, selectValue.value)
}

const emitSelectUpdate = (value) => {
    const querryValue = searhQuerry.value.split(/\s/g).filter(item => item !== '')
    emits('select-update', querryValue, value)
}
/////////////

</script>

<style scoped>
</style>