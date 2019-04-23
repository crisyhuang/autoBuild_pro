<template>
  <div id="app">
      <p>我是一个vue</p>
      <app-header></app-header>
  </div>
</template>

<script>
import Header from './components/header/header.vue'

export default {
    components: {
        'app-header': Header
    }
}

</script>

<style scoped lang="less">
#app{
    p{
        color: red;
    }
}
</style>