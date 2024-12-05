<script setup>
import Footer from "@/components/Footer.vue";
import AuthNavbar from "../components/AuthNavbar.vue";
</script>

<template>
	<section>
		<header>
			<AuthNavbar />
		</header>
		<main>
			<slot />
		</main>
		<div class="footer">
			<Footer />
		</div>
	</section>
</template>

<script>
export default {
	name: "Main",
};
</script>

<style scoped>
.footer {
	margin-top: 20px;
	background-color: #212121;
	height: 35vh;
	bottom: 0;
}
</style>
