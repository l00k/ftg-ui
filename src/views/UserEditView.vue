<script setup lang="ts">
import UserForm from '@/components/UserForm.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();

const userId = computed(() => {
    return Number($route.params.id);
});

</script>

<template>
    <div class="md:container md:mx-auto">
        <h1
            class="title-text text-3xl dark:text-primary-300 mb-6"
        >{{ $t('userEdit.title') }}
        </h1>

        <UserForm
            :user-id="userId"
        />
    </div>
</template>

<style scoped lang="scss">
.title-text {
    color: var(--p-gray-500);
}
</style>
