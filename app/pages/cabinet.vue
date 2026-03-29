<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { localePath } = useSafeI18nWithRouter()
const { jwt } = useAuth()

const target = jwt.value ? localePath('/profile') : localePath('/login')
await navigateTo(target)
</script>

<template />
