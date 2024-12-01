<script>
export default {
	name: "AuthNavbar",
	data() {
		return {
			menuItems: [
				{
					id: 1,
					label: "Editar perfil",
					url: "/editar-perfil",
				},
				{ id: 2, label: "Configuración", url: "/configuracion" },
				{ id: 3, label: "Usuarios", url: "/usuarios" },
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
			<a href="/dashboard"><img src="/logo.png" alt="Logo" class="fit-picture" /></a>
		</div>
		<div class="navbar-menu menu">
			<ul class="navbar-menu">
				<li v-for="item in menuItems" :key="item.id">
					<a class="navbar-item" :href="item.url"> {{ item.label }} </a>
				</li>
				<li>
					<a class="navbar-item button-warning" href="/">Cerrar sesión</a>
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
