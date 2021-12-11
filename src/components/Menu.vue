<template>
  <div class="menu">
	<div class="subpage">
		<i class="icon-star"></i>
	</div>
	<div class="subpage master">
		<i class="icon-search"></i>
	</div>
	<div class="subpage">
		<i class="icon-user"></i>
	</div>
  </div>
</template>

<script>
  export default {
	name: 'Menu',
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  div.menu {
	position: fixed;
	bottom: -20px;
	z-index: 10000;
	display: flex;
	flex-direction: row;
	width: 100vw;
	background-color: #2ecc71;
	height: 100px;
	border-radius: 20px;
	justify-content: space-around;
	align-items: center;
  }

  div.menu div.subpage {
	margin: -20px 0 0 0;
	color: #fff;
	font-size: 25px;
	width: 80px;
	height: 80px;
	text-align: center;
	line-height: 80px;
  }

  div.menu div.master {
	width: 80px;
	height: 80px;
	color: #fff;
	background-color: #e67e22;
	margin: -80px 0 0 0;
	font-size: 30px;
	line-height: 80px;
	border-radius: 90px;
  }

</style>
