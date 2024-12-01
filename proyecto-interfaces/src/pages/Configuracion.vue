<script setup>
import AuthLayout from "../layouts/AuthLayout.vue";

</script>

<template>
	<AuthLayout>
		<div>
			<h1 class="title" id="title">Configuración</h1>
			<form action="" class="color-container">
				<label for="textColor">Color del texto:</label>
				<input type="color" id="textColor" v-model="textColor" />

				<label for="backgroundColor">Color de fondo:</label>
				<input type="color" id="backgroundColor" v-model="backgroundColor" />

				<label for="buttonTextColor">Color del texto del botón:</label>
				<input type="color" id="buttonTextColor" v-model="buttonTextColor" />

				<label for="buttonBackgroundColor">Color de fondo del botón:</label>
				<input type="color" id="buttonBackgroundColor" v-model="buttonBackgroundColor" />

				<label for="fontSize">Tamaño de la fuente:</label>
				<input type="number" id="fontSize" v-model.number="fontSize" min="10" max="50" value="20" />

				<label for="fontFileTitle">Tipografía títulos:</label>
				<input type="file" id="fontFileTitle" accept=".ttf" @change="loadFont" />

				<label for="fontFilePar">Tipografía párrafos:</label>
				<input type="file" id="fontFilePar" accept=".ttf" @change="loadFont" />
				<button @click="applyChanges" id="applyChanges">Aplicar cambios</button>
			</form>
		</div>
	</AuthLayout>
</template>

<style scoped lang="scss">
div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80vh;
	margin-top: 20px;
}

form.color-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

#applyChanges {
	background-color: red;
	color: white;
	margin-top: 10px;
	outline: 5px;
}

@import "@/styles/main.scss";

#app {
	font-family: Arial, sans-serif;
}

.button-primary {
	color: var(--$primary);
	background-color: var(--$secondary);
	border-color: var(--$primary);

	&:hover {
		background-color: var(--$primary);
	}
}
</style>
