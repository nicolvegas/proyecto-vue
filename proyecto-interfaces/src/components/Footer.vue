<template>
	<div id="iframe-container" class="container">
		<iframe id="iframe" src="/src/tangram/index.html" frameborder="0"></iframe>
	</div>
</template>

<style scoped>
#iframe-container {
	width: 400px;
	height: 400px;
	overflow: hidden;
	position: relative;
	transform-style: preserve-3d;
	display: flex;
	flex-shrink: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transform: rotateY(40deg);
	perspective: 800px;
}

#iframe {
	width: 100%;
	height: 700vh;
	display: flex;
	justify-content: center;
	align-items: center;
	scale: 0.4;
	border: none;
}

.contenedor {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
