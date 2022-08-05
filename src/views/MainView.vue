<template>
    <div class="main-view-wrapper main-view">
        <heading-template>
            <template #left-side>
                <div class="heading-logo">
                    <img src="../assets/vue.svg" alt="">
                    <h2>Contacts</h2>
                </div>
            </template>
            <template #right-side>
                <n-button
                    type="primary"
                    @click="$router.push('/contact-create')"
                >  
                    <template #icon>
                        <n-icon
                            :component="AddOutline"
                        />
                    </template>
                    Create contact
                </n-button>
            </template>
        </heading-template>
        <div class="main-view-body body">
            <search-bar
                class="body-search-bar"
                @input-querry="searchDataInDb"
                @select-update="searchDataInDb"
            />
            <n-scrollbar style="height: calc(100% - 75px)">
                <contact-list
                    v-if="!searchMode"
                    :contact-list="sortedData"
                />
                <search-result-list
                    v-else
                    :result-list="searchData"
                />
                <n-empty
                    v-if="searchResultEmpty"
                    description="No results ☹️"
                />
                <n-empty
                    v-if="contactListEmpty"
                    description="No contacts yet"
                />
            </n-scrollbar>
        </div>
    </div>
</template>

<script setup>

// imports
import { getSortedData, searchInDbByKeyWord, searchInDbByKeyWordsIfQuerryMoreThenOneString } from '../services/dbRequests/'
import { onBeforeMount, ref, computed } from 'vue'

import headingTemplate from '../components/templates/headingTemplate.vue'
import searchBar from '../components/searchBar.vue'
import contactList from '../components/contactItems/contactList.vue'
import searchResultList from '../components/contactItems/searchResultList.vue'
import { NButton, NIcon, NScrollbar, NEmpty } from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'
/////////////////

// data 
const sortedData = ref([]);
const searchData = ref([]);
const searchMode = ref(false)
/////////////////

// computed 
const searchResultEmpty = computed(()=> searchMode.value && searchData.value.length <= 0)
const contactListEmpty = computed(()=> sortedData.value.length <= 0)
/////////////////

// methods
const getSortedContactList = async () => {
  sortedData.value = await getSortedData({target: 'contacts', sortvalue: 'fullname'});
}

const searchDataInDb = async (querry, selectedVal) => {
    const empty = (querry.length <= 0 && selectedVal === '')
    searchMode.value = !empty
    const options = {
        target: 'contacts',
        where: ['fullname','name', 'surname', 'patronymic', 'otherwords', 'email', 'phonenumber'],
        words: querry,
        filtertarget: 'group',
        filtervalue: selectedVal
    }
    if(!empty && querry.length === 1){
        searchData.value = await searchInDbByKeyWord(options)
        return
    }
    if(!empty && querry.length > 1) {
        searchData.value = await searchInDbByKeyWordsIfQuerryMoreThenOneString(options, {includkey: 'fullname'})
        return
    }
}

// hooks
onBeforeMount(()=> getSortedContactList())
/////////////////

</script>

<style scoped>
  .main-view-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .heading-logo,
  .header-button {
    display: flex;
    align-items: center;
  }

  .main-view-body {
    height: calc(100vh - 115.98px);
  }

  .body-search-bar {
    margin-bottom: 15px;
  }

</style>