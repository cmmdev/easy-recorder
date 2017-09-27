<template>
    <div>
        <div>
            <a href="/">创建新记录</a>
        </div>
        <div>全部记录:
            <Table :columns="columns1" :data="data1" style="margin: 0 auto; width: 40rem;"></Table>
        </div>
    </div>
</template>

<script>
    import Component from 'vue-class-component'
    import {mapState} from "vuex";
    import Vue from 'vue'
    import {storageMixin} from "./storageMixin"
    @Component({
        mixins: [storageMixin]
    })
    export default class RecordList extends Vue {
        mounted() {
            window.list = this;
        }

        get columns1() {
            return [
                {
                    title: '开始时间',
                    key: 'start_at'
                },
                {
                    title: '类型',
                    key: 'event'
                },
                {
                    title: '持续时间',
                    key: 'duration'
                },
                {
                    title: '容量',
                    key: 'volume'
                }
            ];
        }

        get data1() {
            console.log(this.records);
            return (this.records || []).map(item=>item.asDict());
        }
    }
</script>

<style>
</style>
