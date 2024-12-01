<template>
    <div class="container mt-5">
      <h2 class="title is-4">Subir Archivos</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Selección del tipo de archivo -->
        <div class="field">
          <label class="label" for="fileType">Selecciona el tipo de archivo:</label>
          <div class="control">
            <div class="select">
              <select v-model="fileType" id="fileType" required @change="clearPreviews">
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

        <!-- Input para archivos de audio -->
        <div v-if="fileType === 'audio'">
          <div v-for="index in 3" :key="index" class="field">
            <label class="label">Audio Tagram {{ index }}</label>
            <div class="control">
              <input
                type="file"
                :accept="'audio/*'"
                @change="handleAudioInput($event, index - 1)"
              />
            </div>
          </div>
        </div>

        <!-- Input para archivos de imágenes -->
        <div v-if="fileType === 'image'">
          <label class="label" for="fileInput">Subir imagen(s):</label>
          <div class="control">
            <input
              class="input"
              type="file"
              id="fileInput"
              :accept="acceptedFormats"
              :multiple="allowMultiple"
              @change="handleImageInput"
            />
          </div>
          <div v-for="(preview, index) in previews" :key="index">
            <input
              type="text"
              v-model="preview.name"
              @change="changeImageName(index, preview.name)"
              placeholder="Cambiar nombre de la imagen"
            />
          </div>
        </div>

        <!-- Input para archivos de video -->
        <div v-if="fileType === 'video'">
          <label class="label" for="videoInput">Subir video:</label>
          <div class="control">
            <input
              type="file"
              id="videoInput"
              accept="video/*"
              @change="handleVideoInput"
            />
          </div>
        </div>

        <!-- Input para archivos PDF -->
        <div v-if="fileType === 'pdf'">
          <label class="label" for="pdfInput">Subir PDF:</label>
          <div class="control">
            <input
              type="file"
              id="pdfInput"
              accept="application/pdf"
              @change="handlePdfInput"
            />
          </div>
        </div>

        <!-- Input para archivos VTT -->
        <div v-if="fileType === 'vtt'">
          <label class="label" for="vttInput">Subir archivo VTT:</label>
          <div class="control">
            <input
              type="file"
              id="vttInput"
              accept=".vtt"
              @change="handleVttInput"
            />
          </div>
        </div>

        <!-- Contenedor de vistas previas -->
        <div v-if="previews.length > 0" id="previewContainer" class="box">
          <div
            v-for="(preview, index) in previews"
            :key="index"
            class="preview"
          >
            <component
              :is="preview.component"
              v-bind="preview.props"
              class="mb-2"
            />
            <span class="file-size">{{ preview.size }} MB</span>
            <span v-if="preview.dimensions" class="image-dimensions">
              ({{ preview.dimensions }})
            </span>
            <span v-if="preview.format" class="video-format">
              (Formato: {{ preview.format }})
            </span>
            <button
              class="button is-danger is-small ml-2"
              @click="removeFile(index)"
            >
              X
            </button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is -primary" type="submit">
              Subir Archivos
            </button>
          </div>
        </div>
      </form>

      <!-- Vista previa del PDF -->
      <div v-if="files.pdf.length > 0" class="pdf-preview">
        <h3>Vista previa del PDF:</h3>
        <iframe
          v-for="(file, index) in files.pdf"
          :key="index"
          :src="URL.createObjectURL(file)"
          style="width: 100%; height: 500px;"
        ></iframe>
      </div>

      <!-- Vista previa del archivo VTT -->
      <div v-if="files.vtt.length > 0" class="vtt-preview">
        <h3>Vista previa del archivo VTT:</h3>
        <pre>{{ files.vtt[0].text }}</pre>
      </div>
    </div>
</template>

<script>
import Quill from 'quill';
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
      clearPreviews() {
        this.previews = [];
        this.files.pdf = [];
        this.files.vtt = [];
      },
      handleAudioInput(event, index) {
        const file = event.target.files[0];
        if (file) {
          this.files.audio[index] = file;
          const url = URL.createObjectURL(file);
          const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
          this.previews[index] = {
            component: 'audio',
            props: { src: url, controls: true },
            size: sizeInMB,
          };
        }
      },
      handleImageInput(event) {
        const selectedFiles = Array.from(event.target.files);
        selectedFiles.forEach((file) => {
          const url = URL.createObjectURL(file);
          const img = new Image();
          img.src = url;
          img.onload = () => {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            this.previews.push({
              component: 'img',
              props: { src: url, alt: file.name },
              size: sizeInMB,
              dimensions: `${img.width} x ${img.height}`,
              name: file.name, // Guardar el nombre original
            });
            this.files.image.push(file);
          };
        });
      },
      handleVideoInput(event) {
        const file = event.target.files[0];
        if (file) {
          this.files.video.push(file);
          const url = URL.createObjectURL(file);
          const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
          const videoElement = document.createElement('video');
          videoElement.src = url;
          videoElement.onloadedmetadata = () => {
            const duration = videoElement.duration;
            this.previews.push({
              component: 'video',
              props: { src: url, controls: true },
              size: sizeInMB,
              format: file.type, // Guardar el formato
              name: file.name,
              duration: duration.toFixed(2),
            });
          };
        }
      },
      handlePdfInput(event) {
        const file = event.target.files[0];
        if (file) {
          this.files.pdf.push(file);
          const url = URL.createObjectURL(file);
          const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
          this.previews.push({
            component: 'iframe',
            props: { src: url },
            size: sizeInMB,
          });
        }
      },
      handleVttInput(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.files.vtt.push({ text: e.target.result });
            this.previews.push({
              component: 'pre',
              props: { text: e.target.result },
              size: (file.size / (1024 * 1024)).toFixed(2),
            });
 
          };
          reader.readAsText(file);
        }
      },
      removeFile(index) {
        this.previews.splice(index, 1);
        // Remove the corresponding file from the files array
        if (this.fileType === 'audio') {
          this.files.audio.splice(index, 1);
        } else if (this.fileType === 'image') {
          this.files.image.splice(index, 1);
        } else if (this.fileType === 'video') {
          this.files.video.splice(index, 1);
        } else if (this.fileType === 'pdf') {
          this.files.pdf.splice(index, 1);
        } else if (this.fileType === 'vtt') {
          this.files.vtt.splice(index, 1);
        }
      },
      changeImageName(index, newName) {
        if (this.previews[index]) {
          this.previews[index].name = newName;
          // Aquí podrías agregar lógica adicional si necesitas cambiar el nombre en el archivo real
        }
      },
      handleSubmit() {
        if (this.fileType === "audio" && this.files.audio.length !== 3) {
          alert("Debes subir exactamente 3 archivos de audio.");
          return;
        }
        this.files.audio.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audio_${index + 1}.mp3`; // Cambia la extensión según el tipo de archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Manejo de descarga de archivos de imagen
    this.files.image.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `image_${index + 1}.png`; // Cambia la extensión según el tipo de archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Manejo de descarga de archivos de video
    this.files.video.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `video_${index + 1}.mp4`; // Cambia la extensión según el tipo de archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Manejo de descarga de archivos PDF
    this.files.pdf.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document_${index + 1}.pdf`; // Cambia la extensión según el tipo de archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Manejo de descarga de archivos VTT
    this.files.vtt.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subtitle_${index + 1}.vtt`; // Cambia la extensión según el tipo de archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
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
.file-size {
    margin-left: 10px;
    font-weight: bold;
}
.image-dimensions {
    margin-left: 10px;
    font-style: italic;
}
.video-format {
    margin-left: 10px;
    font-style: italic;
}
.pdf-preview {
    margin-top: 20px;
}
.vtt-preview {
    margin-top: 20px;
}
</style>