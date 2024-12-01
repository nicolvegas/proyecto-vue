<script setup>
import Card from "@/components/Card.vue";
import GoBack from "@/layouts/GoBack.vue";
</script>

<template>
	<GoBack>
		<div>
			<Card title="Registarse">
				<form action="submit">
					<label for="user">Nombre de usuario</label>
					<input type="text" id="user" name="user" />
					<label for="email">Correo electrónico</label>
					<input type="email" id="email" name="email" />
					<label for="password">Contraseña</label>
					<input type="password" id="password" name="password" />
					<label for="password">Confirmar contraseña</label>
					<input type="password" id="password2" name="password" />
				</form>
				<button type="submit" class="button-primary"><a href="/dashboard">Registrarse</a></button>
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
	height: auto;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	transition: all 0.3s;
}

form {
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	width: 100%;
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
