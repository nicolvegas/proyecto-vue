<script setup>
import GoBack from "@/layouts/GoBack.vue";
import Card from "../components/Card.vue";
</script>

<template>
	<GoBack>
		<div>
			<Card title="Iniciar sesión">
				<form action="submit">
					<label for="user">Nombre de usuario o correo electrónico</label>
					<input type="text" id="user" name="user" />
					<label for="password">Contraseña</label>
					<input type="password" id="password" name="password" />
				</form>
				<a href="/dashboard"><button type="submit" class="button-primary">Iniciar sesión</button></a>
			</Card>
		</div>
	</GoBack>
</template>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90vh;
}

.card {
	display: flex;
	flex-direction: column;
	place-items: center;
	text-align: center;
	padding: 14px;
	margin: 10px;
	border-radius: 5px;
	width: 70vh;
	height: 55vh;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	transition: all 0.3s;
}

form {
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
}

label {
	margin-bottom: 10px;
	font-size: smaller;
}

button {
	margin-top: 10px;
	width: 100%;
}
</style>
