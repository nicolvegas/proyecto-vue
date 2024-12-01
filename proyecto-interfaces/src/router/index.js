import { createRouter, createWebHistory } from "vue-router";

import Configuracion from "../pages/Configuracion.vue";
import Contacto from "../pages/Contacto.vue";
import Dashboard from "../pages/Dashboard.vue";
import FAQ from "../pages/FAQ.vue";
import Index from "../pages/Index.vue";
import InicioSesion from "../pages/InicioSesion.vue";
import Nosotros from "../pages/Nosotros.vue";
import NotFound from "../pages/NotFound.vue";
import Perfil from "../pages/Perfil.vue";
import Politicas from "../pages/Politicas.vue";
import Productos from "../pages/Productos.vue";
import Registro from "../pages/Registro.vue";
import Terminos from "../pages/Terminos.vue";
import Usuarios from "../pages/Usuarios.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Index,
		},
		{
			path: "/productos",
			name: "productos",
			component: Productos,
		},
		{
			path: "/nosotros",
			name: "nosotros",
			component: Nosotros,
		},
		{
			path: "/inicio-sesion",
			name: "inicio-sesion",
			component: InicioSesion,
		},
		{
			path: "/registrarse",
			name: "registrarse",
			component: Registro,
		},
		{
			path: "/contacto",
			name: "contacto",
			component: Contacto,
		},
		{
			path: "/terminos-y-condiciones",
			name: "terminos-y-condiciones",
			component: Terminos,
		},
		{
			path: "/politica-de-privacidad",
			name: "politica-de-privacidad",
			component: Politicas,
		},
		{
			path: "/preguntas-frecuentes",
			name: "preguntas-frecuentes",
			component: FAQ,
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: Dashboard,
		},
		{
			path: "/editar-perfil",
			name: "editar-perfil",
			component: Perfil,
		},
		{
			path: "/usuarios",
			name: "usuarios",
			component: Usuarios,
		},
		{
			path: "/configuracion",
			name: "configuracion",
			component: Configuracion,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: NotFound,
		},
	],
});

export default router;
