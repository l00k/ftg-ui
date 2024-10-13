<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
</script>

<template>
    <RouterView />
    <Toast />
    <ConfirmDialog group="main" />
</template>

<style lang="scss" src="@/assets/scss/globals.scss" />
