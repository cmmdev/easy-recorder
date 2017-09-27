<template>
    <div>
        <div>404 Not Found</div>
        <div>页面打开时间: {{ open_at }}</div>
        <div> {{ count }}</div>
    </div>

</template>

<script>
    import moment from "moment"
    import { mapState } from 'vuex'
    export default {
        name: 'default',
        components: {},
        props: [],
        data() {
            return {
                open_at: '',
            }
        },
        methods: {},
        created() {
        },
        mounted() {
            this.open_at = moment().format('YYYY-MM-DD HH:mm:ss');
        },
        computed: {
            ...mapState([
                'count',
            ]),
        }

    }
</script>

<style>
    div {
        display: block;
    }
</style>
