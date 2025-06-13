<script setup lang="ts">
defineProps({
    title: String,
    category: String,
    description: String,
    link: String,
});
</script>

<template>
    <a class="card" :href="link">
        <h3 class="title">
            {{ title }}
            <Badge v-if="category" type="warning" :text="category" />
        </h3>
        <p class="description">{{ description }}</p>
    </a>
</template>

<style scoped>
.card {
    border: 1px solid var(--vp-c-divider);
    border-radius: 1em;
    padding: 0.2em 1.5em;
    max-width: 400px;
    text-decoration: none;
    display: block;
}

.card:hover {
    border: 1px solid var(--vp-c-brand);
}

.title {
    color: var(--vp-c-text-1);
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 1.5em;
}

.description {
    font-size: 0.9rem;
    color: #aaa;
}
</style>
