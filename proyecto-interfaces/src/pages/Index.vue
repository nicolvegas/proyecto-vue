<script setup>
import Safe from "@/assets/icons/Safe.vue";
import SearchIcon from "@/assets/icons/Search.vue";
import Card from "@/components/Card.vue";
import Main from "@/layouts/Main.vue";

import Check from '@/assets/icons/Check.vue';
import { onMounted, ref } from "vue";
import Credit from '../assets/icons/Credit.vue';
import supabase from "../supabase";

const cars = ref([]);

async function getCars() {
	const { data } = await supabase.from("products").select();
	cars.value = data;
}

onMounted(() => {
	getCars();
});
</script>

<template>
	<Main>
		<div class="hero">
			<div class="video">
				<video autoplay muted loop id="myVideo">
					<source src="/bg-video.mp4" type="video/mp4">
				</video>
			</div>
			<div class="text">
				<h1>Encuentra tu carro <span class="catchphrase">ideal</span> en Vroomify</h1>
				<h3>Busca en nuestro inventario extensivo de vehículos de calidad y llévate a casa la mejor opción</h3>
				<div class="searchbanner">
					<input class="searchbar" placeholder="Busca por marca, modelo, año o precio"> </input>
					<SearchIcon />
				</div>
			</div>
		</div>

		<div>
			<h1>Vehículos populares</h1>
			<ul>
				<li v-for="car in cars" :key="car.id">
					<Card :title="car.name">
						<div><img :src="`/Carros${car.image}`" alt="car" /></div>
						<label>{{ car.year }}</label>
						<div class="description">
							<p class="price">{{ car.price }}</p>
							-
							<p>{{ car.transmission }}</p>
						</div>
					</Card>
				</li>
			</ul>
		</div>

		<div>
				<h1>Beneficios</h1>
				<div class="boxes">
					<Card title="Compra segura">
						<Safe />
					<p>Compra tu vehículo con la confianza de que estás adquiriendo un producto de calidad</p>
					</Card>
					<Card title="Financiamiento">
						<Credit />
						<p>Ofrecemos planes de financiamiento para que puedas adquirir tu vehículo de manera cómoda</p>
					</Card>
					<Card title="Garantía">
						<Check />
						<p>Garantizamos la calidad de nuestros vehículos y ofrecemos garantía en todos nuestros productos</p>
					</Card>
				</div>
		</div>
	</Main>
</template>

<style scoped>
h1 {
	text-align: center;
	padding: 15px;
	margin-top: 40px;
	color: #FFFFFF;
}

h3 {
	text-align: center;
	font-size: medium;
	text-wrap: pretty;
	color: #ccc;
}

ul {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

li {
	list-style: none;
	margin: 10px;
}

img {
	width: 400px;
	height: 200px;
	object-fit: contain;
}

label{
	font-size: small;
	font-weight: bold;
	color: #0a783f;
}

#myVideo {
	min-width: 100%;
	height: 75vh;
	z-index: -10;
	object-fit: cover;
}

.hero {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 75vh;
}

.video {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50%;
	z-index: 0;
}

.text{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(2px) !important;	
	width: 100%;
	height: 75vh;
	color: white;
	border-radius: 10px;
	z-index: 10;
}

.searchbar {

	padding: 10px;
	margin: 10px 0;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.searchbanner {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90vh;
	gap: 10px;
}

.card {
	display: flex;
	flex-direction: column;
	place-items: center;
	text-align: center;
	padding: 14px;
	border-radius: 5px;
	width: 400px;
	height: auto;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	transition: all 0.3s;
}

.card:hover {
	transform: scale(1.01);
	opacity: 0.9;

}

.description {
	display: flex;
	justify-content: center;
	gap: 4px;
	font-size: smaller;
}

.price {
	font-weight: bolder;
	font-family: "Irina sans";
}

.boxes {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-basis: content;
	width: 100%;
	gap: 20px;
}
</style>
