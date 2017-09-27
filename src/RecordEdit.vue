<template>
    <div>
        <div>record edit：</div>

        <div v-if="[types.LEFT, types.RIGHT, types.BOTH].indexOf(type) >= 0">
            <div>吃左／右／奶</div>
            新建 弹框（多少分钟之前） or （xx 时间）开始 ？ 确认。
            标记结束。

            编辑 修改 开始/结束时间
            删除
        </div>

        <div v-if="[types.BOTTLE].indexOf(type) >= 0">
            <div>奶瓶</div>
            新建 弹框（多少分钟之前） or （xx 时间）开始 ？ ml 确认。

            修改 时间／ml
            删除
        </div>

        <div v-if="[types.DIAPERS].indexOf(type) >= 0">
            <div>尿布</div>
            新建 弹框（多少分钟之前） or （xx 时间）开始

            修改 时间
            删除
        </div>
    </div>

</template>

<script>
    import Component from 'vue-class-component'
    import {mapState} from "vuex";
    import Vue from 'vue'
    import {types} from "./models/constants";
    import {getUrlParams} from "./utils";

    @Component({
        computed: {
            ...mapState([
                'records',
                'ongoingTask',
            ]),
        },
        data() {
            return {
                // constants
                types,
                // page edit,
                type: '',
            }
        }
    })
    export default class RecordEdit extends Vue {
        mounted() {
            this.type = getUrlParams().type;
            console.log(this.type);
        }
    }
</script>

<style>
</style>
