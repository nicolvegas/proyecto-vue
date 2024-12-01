<script setup>
import AuthLayout from "../layouts/AuthLayout.vue";
</script>

<template>
	<AuthLayout>
		<div>
			<h1>Usuarios</h1>
			<a href="/">Click Me!</a>
			<p>Tabla de usuarios</p>
		</div>
	</AuthLayout>
</template>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80vh;
}
</style>
