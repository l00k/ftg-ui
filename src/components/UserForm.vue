<script setup lang="ts">
import { User } from '@/model/User.js';
import { ApiService } from '@/service/ApiService.js';
import { router } from '@/views/router.js';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const confirm = useConfirm();
const toast = useToast();

const props = defineProps({
    userId: {
        type: Number,
        default: null,
    },
});

const isLoading = ref(false);
const user = reactive(new User());

const apiService = new ApiService();


async function loadUser ()
{
    isLoading.value = true;

    const userData = await apiService.getUser(props.userId);
    Object.assign(user, userData);

    isLoading.value = false;
}

function gotoUserList ()
{
    router.push({ name: 'userList' });
}

function gotoUserEdit (userId : number)
{
    router.push({
        name: 'userEdit',
        params: { id: userId },
    });
}

const changePhotoDialogVisible = ref(false);

function openChangePhotoDialog ()
{
    changePhotoDialogVisible.value = true;
}

async function submit ()
{
    isLoading.value = true;

    try {

        if (user.id) {
            await apiService.updateUser(user);

            toast.add({
                severity: 'success',
                summary: i18n.t('userForm.success'),
                detail: i18n.t('userForm.updated'),
                life: 3000,
            });
        }
        else {
            const newUser = await apiService.createUser(user);
            Object.assign(user, newUser);

            toast.add({
                severity: 'success',
                summary: i18n.t('userForm.success'),
                detail: i18n.t('userForm.created'),
                life: 3000,
            });

            gotoUserEdit(newUser.id);
        }
    }
    catch (error) {
        toast.add({
            severity: 'error',
            summary: i18n.t('userForm.error'),
            detail: error,
            life: 3000,
        });
    }

    isLoading.value = false;
}

onMounted(() => {
    if (props.userId) {
        loadUser();
    }
});
</script>

<template>
    <div class="grid gap-2 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3">
        <div class="order-2 md:order-1 md:col-span-2 flex">
            <div class="p-card p-component w-full">
                <div class="p-card-body flex flex-col justify-between h-full">
                    <div class="grid gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2">
                        <div>
                            <label for="firstName">{{ $t('userForm.firstName') }}</label>
                            <IconField>
                                <InputText
                                    v-model="user.firstName"
                                    size="small"
                                    :disabled="isLoading"
                                    id="firstName"
                                />
                                <InputIcon
                                    v-if="isLoading"
                                    class="pi pi-spin pi-spinner"
                                />
                            </IconField>
                        </div>
                        <div>
                            <label for="firstName">{{ $t('userForm.lastName') }}</label>
                            <IconField>
                                <InputText
                                    v-model="user.lastName"
                                    size="small"
                                    :disabled="isLoading"
                                    id="firstName"
                                />
                                <InputIcon
                                    v-if="isLoading"
                                    class="pi pi-spin pi-spinner"
                                />
                            </IconField>
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <Button
                            size="small"
                            :label="props.userId ? $t('userForm.saveChanges') : $t('userForm.create')"
                            @click="submit"
                        />
                        <Button
                            size="small"
                            :label="$t('userForm.returnToList')"
                            :outlined="true"
                            @click="gotoUserList"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="order-1 md:order-2 flex">
            <Card class="w-full">
                <template #content>
                    <div class="flex justify-center mb-4">
                        <Avatar
                            class="mx-auto"
                            :icon="isLoading ? 'pi pi-spin pi-spinner' : (user.avatar ? null : 'pi pi-user')"
                            :image="user.avatar"
                            shape="circle"
                            width="150"
                            height="150"
                        />
                    </div>

                    <Button
                        secondary="secondary"
                        class="w-full"
                        size="small"
                        :label="$t('userForm.changePhoto')"
                        :outlined="true"
                        icon="pi pi-camera"
                        @click="openChangePhotoDialog"
                    />


                    <Dialog
                        v-model:visible="changePhotoDialogVisible"
                        modal
                        :header="$t('userForm.changePhoto')"
                        :style="{ width: '25rem' }"
                    >
                        <div class="mb-4">
                            <label for="username" class="font-semibold w-24">Photo</label>
                            <InputText
                                id="username"
                                v-model="user.avatar"
                                class="flex-auto"
                                autocomplete="off"
                            />
                        </div>
                        <div class="flex justify-end gap-2">
                            <Button type="button" label="Ok" @click="changePhotoDialogVisible = false" />
                        </div>
                    </Dialog>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.p-avatar {
    width: 150px;
    height: 150px;
    max-width: 100%;
}
</style>
