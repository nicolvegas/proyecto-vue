<script setup>
import { IconArrowLeft } from "@tabler/icons-vue";
</script>

<template>
	<header>
		<a href="/"><IconArrowLeft stroke="{3}" size="48" /></a>
	</header>
	<main>
		<slot></slot>
	</main>
</template>

<script>
export default {
	name: "GoBack",
};
</script>

<style scoped>
header {
	display: flex;
	justify-content: start;
	position: fixed;
	z-index: 100;
	height: 50px;
	margin: 20px;
}

a {
	display: flex;
	align-items: center;
	text-decoration: none;
	text-align: center;
	border-radius: 100%;
	background-color: #3e3d3d;
}
</style>
