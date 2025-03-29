<script setup lang="ts">
type Post = {
    title: string;
    url: string;
    date: string;
    date_machine: string;
};

const posts: Post[] = [
    {
        title: 'Soundtracks',
        url: '/blog/soundtracks',
        date: 'January 30, 2025',
        date_machine: '2025-01-30',
    },
];
</script>

<template>
    <ul class="posts">
        <li class="post" v-for="post of posts" :key="post.url">
            <article>
                <time class="date" :datetime="post.date_machine">{{
                    post.date
                }}</time>
                <h2 class="title">
                    <a class="link" :href="post.url">{{ post.title }}</a>
                </h2>
            </article>
        </li>
    </ul>
</template>

<style scoped>
.posts {
    list-style: none;
    padding: 0;
}

.post {
    margin-top: 3em;
    border-bottom: 1px solid var(--vp-c-divider);
}

.date {
    font-size: 0.9rem;
}

.title {
    border: none;
    padding-top: 0.2em;
    margin-top: 0;
}

.link {
    text-decoration: none;
}
</style>
