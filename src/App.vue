<template>
<body>
  <div id="app">
    <router-view/>
  </div>

</body>
</template>

<script>
export default {
		name: 'app'
	}
</script>

<style lang="css" scoped>
body{
  margin: 0px;
  height: 100%;
  width: 100%;
}
#app{
  height: 100%;
  width: 100%;
}
</style>
