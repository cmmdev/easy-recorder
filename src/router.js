/**
 * Created by mengmengchen on 17/9/23.
 */

import VueRouter from 'vue-router'
import NotFoundComponent from "./NotFoundComponent.vue"
import RecordList from "./RecordList.vue"
import RecordEdit from "./RecordEdit.vue"
import Home from "./Home.vue"


const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/', component: Home },
  { path: '/record/list', component: RecordList },
  { path: '/record/edit', component: RecordEdit },
  { path: '*', component: NotFoundComponent }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  mode: 'history',
});
