<template>
	<div class="form-container">
		<h1 style="width: 100%; text-align: center">Formulario de Usuario</h1>

		<form action="/submit" method="post">
			<!-- Campos del formulario -->
			<div class="form-group">
				<label for="gender">Género :</label>
				<div style="display: flex; justify-content: center; align-content: center">
					<label for="male">Masculino</label>
					<input type="radio" id="male" name="gender" value="male" checked />
				</div>
				<div style="display: flex">
					<label for="female">Femenino</label>
					<input type="radio" id="female" name="gender" value="female" />
				</div>
			</div>

			<div class="form-group">
				<label for="firstName">Nombre:</label>
				<input type="text" id="firstName" name="firstName" placeholder="nombre" />
			</div>

			<div class="form-group">
				<label for="lastName">Apellido:</label>
				<input type="text" id="lastName" name="lastName" placeholder="apellido" />
			</div>
			<div class="form-group">
				<label for="DNI">DNI:</label>
				<input type="text" id="DNI" name="DNI" placeholder="24995287" />
			</div>
			<div class="form-group">
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" placeholder="josef.watkins@example.com" />
			</div>

			<div class="form-group">
				<label for="username">Username:</label>
				<input type="text" id="username" name="username" placeholder="sadswan657" />
			</div>

			<div class="form-group">
				<label for="password">Contraseña:</label>
				<input type="password" id="password" name="password" placeholder="1021" />
			</div>

			<div class="form-group">
				<label for="dob">Fecha de Nacimiento (DD-MM-YYYY):</label>
				<input type="text" id="dob" v-model="dob" placeholder="DD-MM-YYYY" @input="calculateAge" />
			</div>
			<div class="form-group">
				<label for="age">Edad:</label>
				<input type="text" id="age" v-model="age" readonly />
			</div>
			<div class="form-group">
				<label for="phone">Teléfono Fijo:</label>
				<input type="tel" id="phone" name="phone" placeholder="011-088-4196" />
			</div>

			<div class="form-group">
				<label for="cell">Teléfono Celular:</label>
				<input type="tel" id="cell" name="cell" placeholder="081-708-3092" />
			</div>

			<div class="form-group">
				<label for="nacionalidad">Nacionalidad:</label>
				<input type="text" id="nacionalidad" ref="nacionalidad" name="nacionalidad" placeholder="Venezolana" />
			</div>

			<!-- Mapa de Leaflet -->
			<div id="map" style="height: 400px"></div>

			<div class="form-group">
				<label for="street">Calle:</label>
				<input type="text" id="street" v-model="street" placeholder="Avenida Intercomunal Don Julio Centeno" />
			</div>
			<div class="form-group">
				<label for="streetNumber">Número de Calle:</label>
				<input type="text" id="streetNumber" v-model="streetNumber" placeholder="5390" />
			</div>
			<div class="form-group">
				<label for="city">Ciudad:</label>
				<input type="text" id="city" v-model="city" placeholder="San Diego" />
			</div>
			<div class="form-group">
				<label for="state">Estado:</label>
				<input type="text" id="state" v-model="state" placeholder="Estado Carabobo" />
			</div>
			<div class="form-group">
				<label for="country">País:</label>
				<input type="text" id="country" v-model="country" placeholder="Venezuela" />
			</div>
			<div class="form-group">
				<label for="postcode">Código Postal:</label>
				<input type="text" id="postcode" v-model="postcode" placeholder="2006" />
			</div>
			<div class="form-group">
				<label for="latitude">Latitud:</label>
				<input type="text" id="latitude" v-model="latitude" placeholder="-0.4160" />
			</div>
			<div class="form-group">
				<label for="longitude">Longitud:</label>
				<input type="text" id="longitude" v-model="longitude" placeholder="-83.8290" />
			</div>
			<div class="form-group">
				<label for="timezone">Zona Horaria:</label>
				<input type="text" id="timezone" v-model="timezone" placeholder="America/Caracas (-4:30)" />
			</div>

			<div class="form-group">
				<label for="imageUpload">Subir Foto de Perfil:</label>
				<input type="file" id="imageUpload" ref="imageUpload" accept="image/*" @change="onImageUpload" />
				<img id="profilePicture" alt="Previsualización de la imagen" v-if="imageSrc" :src="imageSrc" />
			</div>

			<div class="image-previews" v-if="imageSrc">
				<h3>Vista Previa:</h3>
				<img v-if="imageSrc.large" :src="imageSrc.large" alt="Previsualización Grande" class="preview large" />
				<img v-if="imageSrc.medium" :src="imageSrc.medium" alt="Previsualización Mediana" class="preview medium" />
				<img
					v-if="imageSrc.thumbnail"
					:src="imageSrc.thumbnail"
					alt="Previsualización Thumbnail"
					class="preview thumbnail"
				/>
			</div>

			<!-- Botón de envío -->
			<button type="submit" class="submit-btn">Enviar</button>
		</form>
	</div>

	<div>
		<!-- Subida de archivo con FileUploader -->
		<div class="form-group">
			<FileUploader />
		</div>
	</div>
</template>

<script>
import FileUploader from "./FileUploader.vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";
export default {
	components: {
		FileUploader,
	},
	data() {
		return {
			street: "",
			streetNumber: "",
			city: "",
			state: "",
			country: "",
			postcode: "",
			latitude: "",
			longitude: "",
			timezone: "America/Caracas (-4:30)",
			map: null,
			marker: null,
			dob: "",
			age: "",
			imageSrc: {
				// Asegúrate de inicializar imageSrc aquí
				large: null,
				medium: null,
				thumbnail: null,
			},
		};
	},
	mounted() {
		this.initMap();
	},
	methods: {
		initMap() {
			this.map = L.map("map").setView([10.23685214288028, -67.96196222908381], 17); // Coordenadas iniciales

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
			}).addTo(this.map);

			// Crear un marcador arrastrable
			this.marker = L.marker([10.23685214288028, -67.96196222908381], { draggable: true }).addTo(this.map);

			// Actualizar latitud y longitud al mover el marcador
			this.marker.on("dragend", (e) => {
				const latLng = e.target.getLatLng();
				this.latitude = latLng.lat;
				this.longitude = latLng.lng;

				// Obtener dirección usando geocodificación inversa
				this.reverseGeocode(latLng.lat, latLng.lng);
			});

			// Evento de clic en el mapa para mover el marcador
			this.map.on("click", (e) => {
				this.marker.setLatLng(e.latlng); // Mover el marcador a la posición del clic
				this.latitude = e.latlng.lat;
				this.longitude = e.latlng.lng;

				// Obtener dirección usando geocodificación inversa
				this.reverseGeocode(e.latlng.lat, e.latlng.lng);
			});

			// Agregar control de búsqueda
			const geocoder = L.Control.geocoder({
				defaultMarkGeocode: false,
			})
				.on("markgeocode", (e) => {
					const latLng = e.geocode.center;
					this.marker.setLatLng(latLng).update();
					this.map.setView(latLng, 16);

					// Rellenar campos de latitud y longitud
					this.latitude = latLng.lat;
					this.longitude = latLng.lng;

					// Obtener dirección usando geocodificación inversa
					this.reverseGeocode(latLng.lat, latLng.lng);
				})
				.addTo(this.map);
		},

		reverseGeocode(lat, lng) {
			fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
				.then((response) => response.json())
				.then((data) => {
					this.street = data.address.road || "";
					this.city = data.address.city || data.address.town || "";
					this.state = data.address.state || "";
					this.country = data.address.country || "";
					this.postcode = data.address.postcode || "";
				})
				.catch((error) => console.error("Error fetching geocoding data:", error));
		},
		onImageUpload(event) {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.createImageResolutions(e.target.result);
				};
				reader.readAsDataURL(file);
			}
		},
		createImageResolutions(src) {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				this.imageSrc.large = src; // Original size
				this.imageSrc.medium = this.resizeImage(img, 300); // Medium size
				this.imageSrc.thumbnail = this.resizeImage(img, 100); // Thumbnail size
			};
		},
		resizeImage(img, width) {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			const scaleFactor = width / img.width;
			canvas.width = width;
			canvas.height = img.height * scaleFactor;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			return canvas.toDataURL(); // Return the resized image as a data URL
		},
	},
};
</script>

<style scoped>
.form-group label,
.form-group input[type="radio"] {
	display: inline-block;
	margin-right: 10px;
	vertical-align: middle;
}

body {
	font-family: Arial, sans-serif;
	margin: 20px;
}
.form-container {
	width: 50%;
	margin: auto;
	border: 1px solid #ccc;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 2px 2px 12px #aaa;
}
#map {
	height: 400px;
	margin-bottom: 20px;
}
.form-group {
	margin-bottom: 15px;
}
.form-group label {
	display: block;
	margin-bottom: 5px;
}
.form-group input,
.form-group select {
	width: 100%;
	padding: 8px;
	box-sizing: border-box;
}
.submit-btn {
	background-color: #4caf50;
	color: white;
	padding: 10px 20px;
	border: none;
	cursor: pointer;
}

body {
	font-family: Arial, sans-serif;
	margin: 20px;
}

.form-container {
	width: 50%;
	margin: auto;
	border: 1px solid #ccc;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 2px 2px 12px #aaa;
}

#map {
	height: 400px;
	margin-bottom: 20px;
}

.form-group {
	margin-bottom: 15px;
}

.form-group label {
	display: block;
	margin-bottom: 5px;
}

.form-group input,
.form-group select {
	width: 100%;
	padding: 8px;
	box-sizing: border-box;
}

.submit-btn {
	background-color: #4caf50;
	color: white;
	padding: 10px 20px;
	border: none;
	cursor: pointer;
}
.preview {
	margin: 10px;
}
.large {
	width: 600px; /* Ajusta según sea necesario */
}
.medium {
	width: 300px; /* Ajusta según sea necesario */
}
.thumbnail {
	width: 100px; /* Ajusta según sea necesario */
}
</style>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />

<!-- 
<script>
// Función para aplicar la máscara de fecha (DD-MM-YYYY)
this.$refs.dob.addEventListener("input", function (event) {
	let input = event.target.value;
	input = input.replace(/\D/g, ""); // Elimina caracteres no numéricos

	if (input.length <= 2) {
		event.target.value = input; // Día
	} else if (input.length <= 4) {
		event.target.value = input.slice(0, 2) + "-" + input.slice(2); // Día-Mes
	} else {
		event.target.value = input.slice(0, 2) + "-" + input.slice(2, 4) + "-" + input.slice(4, 8); // Día-Mes-Año
	}
});

this.$refs.imageUpload.addEventListener("change", function (event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const img = document.getElementById("profilePicture");
			img.src = e.target.result;
			img.style.display = "block";
			img.style.width = "150px"; // Tamaño thumbnail
			img.style.height = "150px"; // Tamaño thumbnail
			img.style.objectFit = "cover"; // Mantener proporción
		};
		reader.readAsDataURL(file);
	}
});

// Inicializar el mapa
var map = L.map("map").setView([10.236799099999999, -67.96227281083797], 13);

// Añadir capa de mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Añadir control de búsqueda
var geocoder = L.Control.geocoder({
	defaultMarkGeocode: false,
})
	.on("markgeocode", function (e) {
		var latlng = e.geocode.center;
		marker.setLatLng(latlng).update();
		map.setView(latlng, 16);

		// Rellenar campos de latitud y longitud
		document.getElementById("latitude").value = latlng.lat;
		document.getElementById("longitude").value = latlng.lng;

		// Obtener datos de ubicación usando geocodificación inversa
		fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
			.then((response) => response.json())
			.then((data) => {
				document.getElementById("street").value = data.address.road || "";
				document.getElementById("city").value = data.address.city || data.address.town || "";
				document.getElementById("state").value = data.address.state || "";
				document.getElementById("country").value = data.address.country || "";
				document.getElementById("postcode").value = data.address.postcode || "";
				document.getElementById("timezone").value = Intl.DateTimeFormat().resolvedOptions().timeZone;
			});
	})
	.addTo(map);

// Crear marcador de ubicación
var marker = L.marker([10.236799099999999, -67.96227281083797], {
	draggable: true,
}).addTo(map);

// Evento para cuando el marcador se arrastra
marker.on("dragend", function (e) {
	var latlng = e.target.getLatLng();
	document.getElementById("latitude").value = latlng.lat;
	document.getElementById("longitude").value = latlng.lng;

	// Actualizar campos de geocodificación inversa
	fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("street").value = data.address.road || "";
			document.getElementById("city").value = data.address.city || data.address.town || "";
			document.getElementById("state").value = data.address.state || "";
			document.getElementById("country").value = data.address.country || "";
			document.getElementById("postcode").value = data.address.postcode || "";
			document.getElementById("timezone").value = Intl.DateTimeFormat().resolvedOptions().timeZone;
		});
});
</script>  -->
