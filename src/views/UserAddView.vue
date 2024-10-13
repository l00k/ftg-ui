<script setup lang="ts">
import UserForm from '@/components/UserForm.vue';
</script>

<template>
    <div class="md:container md:mx-auto">
        <h1
            class="title-text text-3xl dark:text-primary-300 mb-6"
        >{{ $t('userAdd.title') }}
        </h1>

        <UserForm />
    </div>
</template>

<style scoped lang="scss">
.title-text {
    color: var(--p-gray-500);
}
</style>
