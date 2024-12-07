<template>
	<div class="container mt-5">
		<h2 class="title is-4">Subir Archivos</h2>
		<form @submit.prevent="handleSubmit">
			<!-- Selección del tipo de archivo -->
			<div class="field">
				<label class="label" for="fileType">Selecciona el tipo de archivo:</label>
				<div class="control">
					<div class="select">
						<select v-model="fileType" id="fileType" required>
							<option value="">Seleccionar...</option>
							<option value="audio">Audios (exactamente 3)</option>
							<option value="image">Imágenes (sin límite)</option>
							<option value="video">Video (máximo 1)</option>
							<option value="pdf">PDF (máximo 1)</option>
							<option value="vtt">Archivo VTT (máximo 1)</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Input para archivos -->
			<div class="field">
				<label class="label" for="fileInput">Subir archivo(s):</label>
				<div class="control">
					<input
						class="input"
						type="file"
						id="fileInput"
						:accept="acceptedFormats"
						:multiple="allowMultiple"
						@change="handleFileInput"
					/>
				</div>
			</div>

			<!-- Contenedor de vistas previas -->
			<div v-if="previews.length > 0" id="previewContainer" class="box">
				<div v-for="(preview, index) in previews" :key="index" class="preview">
					<component :is="preview.component" v-bind="preview.props" class="mb-2" />
					<button class="button is-danger is-small ml-2" @click="removeFile(index)">X</button>
				</div>
			</div>

			<div class="field">
				<div class="control">
					<button class="button is-primary" type="submit">Subir Archivos</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fileType: "",
			files: {
				audio: [],
				image: [],
				video: [],
				pdf: [],
				vtt: [],
			},
			previews: [],
		};
	},
	computed: {
		acceptedFormats() {
			switch (this.fileType) {
				case "audio":
					return "audio/*";
				case "image":
					return "image/*";
				case "video":
					return "video/*";
				case "pdf":
					return "application/pdf";
				case "vtt":
					return ".vtt";
				default:
					return "";
			}
		},
		allowMultiple() {
			return this.fileType === "audio" || this.fileType === "image";
		},
	},
	methods: {
		handleFileInput(event) {
			const selectedFiles = Array.from(event.target.files);

			if (this.fileType === "audio" && this.files.audio.length + selectedFiles.length > 3) {
				alert("Solo puedes subir 3 archivos de audio.");
				return;
			}

			if (
				["video", "pdf", "vtt"].includes(this.fileType) &&
				this.files[this.fileType].length + selectedFiles.length > 1
			) {
				alert(`Solo puedes subir 1 archivo de tipo ${this.fileType}.`);
				return;
			}

			selectedFiles.forEach((file) => {
				this.files[this.fileType].push(file);
				const url = URL.createObjectURL(file);
				const component = this.getPreviewComponent(file.type);
				this.previews.push({
					component,
					props: this.getPreviewProps(file, url),
				});
			});
		},
		getPreviewComponent(type) {
			if (type.startsWith("image/")) return "img";
			if (type.startsWith("audio/")) return "audio";
			if (type.startsWith("video/")) return "video";
			if (type === "application/pdf") return "iframe";
			if (type.endsWith(".vtt")) return "p";
			return "span";
		},
		getPreviewProps(file, url) {
			if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
				return { src: url, controls: true };
			}
			if (file.type.startsWith("image/")) return { src: url, alt: file.name };
			if (file.type === "application/pdf") return { src: url };
			if (file.name.endsWith(".vtt")) return { innerHTML: `Archivo VTT: ${file.name}` };
			return { innerHTML: `Archivo no soportado: ${file.name}` };
		},
		removeFile(index) {
			this.files[this.fileType].splice(index, 1);
			this.previews.splice(index, 1);
		},
		handleSubmit() {
			if (this.fileType === "audio" && this.files.audio.length !== 3) {
				alert("Debes subir exactamente 3 archivos de audio.");
				return;
			}

			alert("Archivos listos para subir.");
			// Aquí puedes manejar el envío de los archivos.
		},
	},
};
</script>

<style scoped>
.preview {
	display: flex;
	align-items: center;
}
.preview img,
.preview video,
.preview iframe {
	max-width: 100%;
	max-height: 300px;
}
.preview p {
	margin: 0;
}
</style>
