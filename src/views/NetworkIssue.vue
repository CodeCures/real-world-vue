<template>
    <div>
        <h1>Uh-oh!</h1>
        <h3>Looks like you have some network issue, please the back button to refresh</h3>
        <router-link :to="{ name: 'events' }">Or return to home</router-link>
    </div>
</template>