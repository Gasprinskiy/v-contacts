import { createRouter, createWebHistory } from 'vue-router'

import MainView from '../views/MainView.vue'
import ContactCreateView from '../views/ContactCreateView.vue'
import ContactEditView from '../views/ContactEditView.vue' 


const routes = [
    {
        path: '/',
        component: MainView
    },
    {
        path: '/contact-create',
        component: ContactCreateView,
        meta: {
            isRedact: false
        }
    },
    {
        path: '/contact-edit/:id',
        component: ContactEditView,
        meta: {
            isRedact: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router