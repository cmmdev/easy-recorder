<template>
    <div id="app">
        {{ babyName }}记录助手
        <router-view></router-view>
    </div>
</template>

<script>
    import RouterView from "vue-router"
    import Vue from "vue"
    import Component from 'vue-class-component'
    import {mapState} from "vuex";
    @Component({
        computed: {
            ...mapState([
                'babyName',
            ]),
        },
    })
    export default class App extends Vue {
    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    div {
        display: block;
    }
</style>
