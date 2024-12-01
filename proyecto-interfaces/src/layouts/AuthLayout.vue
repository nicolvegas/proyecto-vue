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

<style scoped></style>
