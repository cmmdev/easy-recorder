<template>
    <div>
        <button @click="greet">Greet</button>
        <div>{{firstName}}----{{ secondName }}</div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {log} from '../testnode/test2'

    @Component({
        props: ['firstName', 'secondName']
    })
    export default class Greeting extends Vue {

        // method
        @log
        greet() {
            alert('greeting: ' )
        }

        @log
        hello() {
            console.log('hello world');
        }

        mounted() {
            console.log('mounted');
        }

    }
</script>