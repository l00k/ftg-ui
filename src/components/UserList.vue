<script setup lang="ts">
import type { User } from '@/model/User.js';
import { ApiService } from '@/service/ApiService.js';
import { router } from '@/views/router.js';
import { debounce } from 'lodash-es';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const confirm = useConfirm();
const toast = useToast();

const textFilter = ref<string>('');
const isLoading = ref<boolean>(false);

const page = ref<number>(0);
const perPage = ref<number>(8);
const totalRecords = ref<number>(8);

const users = ref<User[]>([]);

const apiService = new ApiService();

type LoadUsersEvent = {
    page : number,
};

async function loadUsers (e? : LoadUsersEvent)
{
    isLoading.value = true;

    if (e?.page !== undefined) {
        page.value = e.page;
    }

    const pageOfUsers = await apiService.getUsers({
        page: page.value,
        perPage: perPage.value,
        filter: textFilter.value,
    });
    users.value = pageOfUsers.data;
    totalRecords.value = pageOfUsers.total;

    isLoading.value = false;
}

const loadUsersDebounced = debounce(loadUsers, 500);

function onFilterChange ()
{
    page.value = 0;
    loadUsersDebounced();
}


function gotoUserAdd ()
{
    router.push({ name: 'userAdd' });
}

function gotoUserEdit (user : User)
{
    router.push({
        name: 'userEdit',
        params: { id: user.id },
    });
}

async function requestUserDelete (user : User)
{
    confirm.require({
        modal: true,
        group: 'main',
        header: 'Delete User',
        message: `Are you sure you want to delete user "${user.fullName}"?`,
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-secondary',
        accept: async() => {
            await apiService.deleteUser(user.id);
            await loadUsers();

            toast.add({
                severity: 'success',
                summary: 'User deleted',
                life: 3000,
            });
        },
    });
}


onMounted(() => {
    loadUsers();
});
</script>

<template>
    <Card>
        <template #content>
            <div class="table-header flex justify-between">
                <IconField
                    class="inline-block search-field"
                >
                    <InputText
                        v-model="textFilter"
                        placeholder="Search for users..."
                        @input="onFilterChange"
                    />
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                </IconField>

                <Button
                    label="Add User"
                    icon="pi pi-plus"
                    rounded
                    @click="gotoUserAdd"
                />
            </div>

            <DataTable
                :value="users"
                :rows="perPage"

                :lazy="true"
                :loading="isLoading"

                current-page-report-template="{first} to {last} of {totalRecords}"
            >
                <Column field="avatar" style="width: 10%">
                    <template #body="{ data }">
                        <Avatar
                            :image="data.avatar"
                            size="large"
                            shape="circle"
                        />
                    </template>
                </Column>
                <Column field="fullName" header="Full Name" />
                <Column field="actions" header="Actions" style="width: 10%">
                    <template #body="{ data }">
                        <div class="action-btns">
                            <Button
                                class="action-btn"
                                icon="pi pi-pen-to-square"
                                @click="() => gotoUserEdit(data)"
                            />
                            <Button
                                class="action-btn"
                                icon="pi pi-trash"
                                @click="() => requestUserDelete(data)"
                            />
                        </div>
                    </template>
                </Column>

                <template #paginatorend />
            </DataTable>
        </template>
    </Card>

    <Paginator
        :rows="perPage"
        :total-records="totalRecords"
        class="flex justify-start"
        @page="e => loadUsers(e)"
    />
</template>

<style scoped lang="scss">
.header-text {
    color: var(--p-gray-500);
}

.table-header {
    margin-bottom: 1rem;
    padding: 1rem 0 2rem;
    border-bottom: 1px solid #f8f9fb;
}

.search-field {
    min-width: 30%;

    .p-inputtext {
        display: block;
        width: 100%;
        padding: 0.4rem 1rem;

        background-color: #f7f8f9;
        border: none;
        border-radius: 4px;

        font-size: 0.8rem;
    }
}

.action-btns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
}
.action-btn {
    width: auto;
    padding: 0;
    color: var(--p-gray);
    border: none;
    background: none;
}
</style>
