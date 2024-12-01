<template>
	<footer class="footer">
	  <div class="container">
		<div class="columns">
		  <div class="column">
			<!-- Contenido del footer -->
		  </div>
		  <div class="column">
			<div class="animation-wrapper">
			  <div class="escena">
				<div class="contenedor">
				  <div 
					v-for="(pieza, index) in piezas" 
					:key="index"
					:class="['pieza', pieza.clase]"
					:style="pieza.estilo"
				  ></div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</footer>
  </template>
  
  <script>
  export default {
	name: "Footer",
	data() {
	  return {
		piezas: [
		  { clase: 'grande1', estilo: {} },
		  { clase: 'grande2', estilo: {} },
		  { clase: 'mediano', estilo: {} },
		  { clase: 'cuadrado', estilo: {} },
		  { clase: 'triangulo', estilo: {} },
		  { clase: 'pequeñoI', estilo: {} },
		  { clase: 'paralelogramo', estilo: {} },
		],
		estado: 0
	  }
	},
	mounted() {
	  this.iniciarAnimacion();
	},
	methods: {
	  iniciarAnimacion() {
		setInterval(() => {
		  this.transicionTangram();
		}, 3000);
	  },
	  transicionTangram() {
		this.estado = 1;
		
		const configuraciones = [
		  // Configuración para Imagen 34
		  [
			{ transform: 'translate(0px, 0px) rotate(0deg)' },
			{ transform: 'translate(0px, 100px) rotate(0deg)' },
			{ transform: 'translate(0px, 0px) rotate(0deg)' },
			{ transform: 'translate(0px, 0px) rotate(0deg)' },
			{ transform: 'translate(0px, 0px) rotate(0deg)' },
			{ transform: 'translate(0px, 0px) rotate(0deg)' },
			{ transform: 'translate(0px, 0px) rotate(0deg)' },
		  ],
		  // Configuración para Imagen 126
		  [
			{ transform: 'translate(20px, -130px) rotate(-135deg)' },
			{ transform: 'translate(60px, -250px) rotate(45deg)' },
			{ transform: 'translate(0px, 230px) rotate(0deg)' },
			{ transform: 'translate(0px, 100px) rotate(0deg)' },
			{ transform: 'translate(-90px, 70px) rotate(45deg)' },
			{ transform: 'translate(-290px, 10px) rotate(-135deg)' },
			{ transform: 'translate(120px, -15px) rotate(135deg)' },
		  ],
		  // Configuración para Imagen 38
		  [
			{ transform: 'translate(-120px, 100px) rotate(135deg)' },
			{ transform: 'translate(80px, 100px) rotate(-135deg)' },
			{ transform: 'translate(-60px, -80px) rotate(-90deg)' },
			{ transform: 'translate(-70px, 100px) rotate(0deg)' },
			{ transform: 'translate(-90px, 0px) rotate(-135deg)' },
			{ transform: 'translate(-40px, -45px) rotate(45deg)' },
			{ transform: 'translate(200px, 100px) rotate(45deg)' },
		  ],
		];
  
		this.piezas.forEach((pieza, index) => {
		  pieza.estilo = configuraciones[this.estado][index];
		});
	  }
	}
  }
  </script>
  
  <style scoped>
  .footer {
	background-color: #212121;
	padding: 20px;
  }
  
  .animation-wrapper {
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #181818;
	border-radius: 10px;
	overflow: hidden;
  }
  
  .escena {
	width: 100%;
	height: 100%;
	position: relative;
	transform: scale(0.5);
  }
  
  .contenedor {
	position: relative;
	width: 100%;
	height: 100%;
  }
  
  .pieza {
	position: absolute;
	transition: all 2s ease-in-out;
  }
  
  .grande1 {
	width: 0;
	height: 0;
	border-left: 100px solid transparent;
	border-right: 100px solid transparent;
	border-bottom: 100px solid #ff0000;
  }
  
  .grande2 {
	width: 100px;
	height: 100px;
	background-color: #00ff00;
  }
  
  .mediano {
	width: 75px;
	height: 75px;
	background-color: #0000ff;
  }
  
  .cuadrado {
	width: 50px;
	height: 50px;
	background-color: #ffff00;
  }
  
  .triangulo {
	width: 0;
	height: 0;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	border-bottom: 50px solid #ff00ff;
  }
  
  .pequeñoI {
	width: 25px;
	height: 25px;
	background-color: #00ffff;
  }
  
  .paralelogramo {
	width: 100px;
	height: 50px;
	background-color: #ff8800;
	transform: skew(20deg);
  }
  </style>