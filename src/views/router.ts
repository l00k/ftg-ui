import UserAddView from '@/views/UserAddView.vue';
import UserEditView from '@/views/UserEditView.vue';
import UserListView from '@/views/UserListView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'userList',
        path: '/',
        component: UserListView,
    },
    {
        name: 'userAdd',
        path: '/user/add',
        component: UserAddView,
    },
    {
        name: 'userEdit',
        path: '/user/:id',
        component: UserEditView,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
