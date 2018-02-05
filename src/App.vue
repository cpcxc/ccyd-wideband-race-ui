<template>
  <el-container id="app">
    <el-main>
      <router-view/>
    </el-main>
    <el-footer class="footer" height="48px">
		  <span>中国移动吉林分公司长春公司 © 2018</span>
		</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
