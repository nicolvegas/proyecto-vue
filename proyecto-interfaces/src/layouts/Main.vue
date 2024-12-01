<script setup>
import Footer from "@/components/Footer.vue";
import MainNavbar from "@/components/MainNavbar.vue";
</script>

<template>
	<section>
		<header>
			<MainNavbar />
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
main {
	padding: 20px 0px;
}
</style>
