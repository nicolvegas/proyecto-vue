<template>
	<div class="full">
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
			<input type="number" id="fontSize" min="0" max="100" v-model="fontSize" />

			<label for="fontFileTitle">Tipografía títulos:</label>
			<input type="file" id="fontFileTitle" accept=".ttf" @change="loadFont" v-on:change="fontFileTitle"/>

			<label for="fontFilePar">Tipografía párrafos:</label>
			<input type="file" id="fontFilePar" accept=".ttf" @change="loadFont" v-on:change="fontFilePar" />

			<button @click="applyChanges" v-on:submit="applyChanges" id="applyChanges">Aplicar cambios</button>
		</form>
	</div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const textColor = ref("");
const backgroundColor = ref("");
const buttonTextColor = ref("");
const buttonBackgroundColor = ref("");
const fontSize = ref(20);
const fontFileTitle = ref("");
const fontFilePar = ref("");

function calcularTonos(hexColor, percent = 0.2) {
	const r = parseInt(hexColor.slice(1, 3), 16);
	const g = parseInt(hexColor.slice(3, 5), 16);
	const b = parseInt(hexColor.slice(5, 7), 16);

	if (!Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) {
		console.error("Error: Valores RGB deben ser números válidos.");
		return { lighter: hexColor, darker: hexColor };
	}

	const lighter = ajustarColor(r, g, b, percent);
	const darker = ajustarColor(r, g, b, -percent);

	return {
		lighter: `rgb(${lighter.join(", ")})`,
		darker: `rgb(${darker.join(", ")})`,
	};
}

function ajustarColor(r, g, b, percent = 0.2) {
	return [mitad(r + (255 - r) * percent), mitad(g + (255 - g) * percent), mitad(b + (255 - b) * percent)];
}

function mitad(val) {
	return Math.max(0, Math.min(255, Math.round(val)));
}

const applyChanges = async () => {
	try {
		const formData = new FormData();
		formData.append("id", "001");
		formData.append("text", textColor.value);
		formData.append("background", backgroundColor.value);
		formData.append("button_text", buttonTextColor.value);
		formData.append("button_background", buttonBackgroundColor.value);
		formData.append("font_size", fontSize.value);
		formData.append("font_title", "edu.ttf");
		formData.append("font_par", "kaypho.ttf");

		console.log(textColor.value)
		const response = await axios.put("http://127.0.0.1:8000/api/v1/colors/001", formData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		alert("Changes applied successfully!");
	} catch (error) {
		console.error("Error applying changes:", error);
		alert("Failed to apply changes. Please try again.");
	}
};

async function fetchData() {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/v1/colors/001");
		const colors = response.data;

		document.documentElement.style.setProperty("--text", colors.text);
		document.documentElement.style.setProperty("--background", colors.background);
		document.documentElement.style.setProperty("--button-text", colors.button_text);
		document.documentElement.style.setProperty("--button-background", colors.button_background);
		document.documentElement.style.setProperty("--font-size", `${colors.font_size}px`);
		document.documentElement.style.setProperty("--font-title",`/fonts/${colors.font_title}` );
		document.documentElement.style.setProperty("--font-par", `/fonts/${colors.font_par}`);

	} catch (error) {
		console.error(error);
	}
}
onMounted(() => {
	fontFileTitle.addEventListener
	fetchData();
});
</script>

<style scoped lang="scss">
div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

form.color-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

#applyChanges {
	margin-top: 10px;
	outline: 5px;
}

button{
	padding: 12px
}
</style>

<style>
:root {
	--text: #ffffff;
	--background: #1b1b1b;
	--button-text: #ffffff;
	--button-background: #00ff26;
	--font-size: 20px;
	--font-title: "/fonts/Roboto-Regular.ttf";
	--font-par: "/fonts/kaypho.ttf";

	--figura-1: var(--text);
	--figura-2: var(--button-background);
	--figura-3: var(--background);
	--figura-4: var(--text);
	--figura-5: var(--button-text);
	--figura-6: var(--button-background);
	--figura-7: var(--background);
}

input[type="file"]::file-selector-button {
  color: var(--text) !important;
	background-color: var(--background) !important;
	font-size: var(--font-size) !important; 
}

* :not(div) {
	color: var(--text) !important;
	background-color: var(--background) !important; 
	font-size: var(--font-size) !important; 
}


h1, h2{
	font-family: var(--font-title)
}

* :not(h1):not(h2){ 
	font-family: var(--font-par)
}
button {
	color: var(--button-text) !important;
	background-color: var(--button-background) !important;
}
</style>