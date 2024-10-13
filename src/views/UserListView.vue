<script setup lang="ts">

import UserList from '@/components/UserList.vue';
</script>

<template>
    <div class="md:container md:mx-auto">
        <h1
            class="title-text text-3xl dark:text-primary-300 mb-6"
        >{{ $t('userList.title') }}</h1>

        <UserList />
    </div>
</template>

<style scoped lang="scss">
.title-text {
    color: var(--p-gray-500);
}
</style>
