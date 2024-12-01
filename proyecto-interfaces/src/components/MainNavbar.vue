<script>
export default {
	name: "MainNavbar",
	data() {
		return {
			menuItems: [
				{ id: 1, label: "Productos", url: "/productos" },
				{ id: 2, label: "Nosotros", url: "/nosotros" },
				{ id: 3, label: "Contacto", url: "/contacto" },
				{ id: 4, label: "Iniciar Sesión", url: "/inicio-sesion" },
			],
			isMenuActive: false,
		};
	},
	methods: {
		toggleMenu() {
			this.isMenuActive = !this.isMenuActive;
		},
	},
};
</script>

<template>
	<nav class="navbar">
		<div class="navbar-brand">
			<a href="#"><img src="/logo.png" alt="Logo" class="fit-picture" /></a>
		</div>
		<div class="navbar-menu menu">
			<ul class="navbar-menu">
				<li v-for="item in menuItems" :key="item.id">
					<a class="navbar-item" :href="item.url"> {{ item.label }} </a>
				</li>
				<li>
					<a class="navbar-item button-secondary" href="/registrarse">Registrarse</a>
				</li>
			</ul>
		</div>
		<div class="burger-menu">
			<a class="navbar-burger" role="button" aria-label="menu" aria-expanded="false" @click="toggleMenu">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>
	</nav>
</template>

<style scoped>
img {
	width: 200px;
	margin: 15px;
}


</style>
