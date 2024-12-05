<script setup>
import Wysiwyg from "@/components/Wysiwyg.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
</script>

<template>
	<AuthLayout>
		<div>
			<h1>Términos y condiciones</h1>
			<Wysiwyg />
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
