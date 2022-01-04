<template>
    <div>
        <h1>Oops!</h1>
        <h3>The {{ resource }} you are looking for is not here</h3>
        <router-link :to="{ name: 'events' }">Return to Home</router-link>
    </div>
</template>
<script>
export default {
    props: {
        resource: {
            type: String,
            default: 'page',
            requred: true,
        },
    },
}
</script>