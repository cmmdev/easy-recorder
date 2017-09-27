<template>
  <div>
    Comp here
    <img src="../assets/logo.png" @click="foo">
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

const log = (target, name, descriptor) => {
  const method = descriptor.value
  descriptor.value = (...args) => {
    console.log(target, descriptor)
    method.apply(target, args)
  }
  return descriptor;
}

@Component({
  components: {
  }
})
class Comp extends Vue {

  str = 'Hello'

  @log
  foo() {
    console.log(this.str)
  }
}

console.info('Comp', Comp)
export default Comp
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
</style>