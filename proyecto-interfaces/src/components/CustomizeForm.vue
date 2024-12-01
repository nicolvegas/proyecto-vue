<template>
  <div class="customization-form">
    <h2>Customizar Apariencia</h2>
    <form>
      <!-- Selector de color para la fuente de todo el cuerpo -->
      <div>
        <label for="fontColor">Color letra</label>
        <input id="fontColor" type="color" v-model="fontColor" @input="updateStyles" />
      </div>

      <!-- Selector de color para el fondo -->
      <div>
        <label for="backgroundColor">Color fondo</label>
        <input id="backgroundColor" type="color" v-model="backgroundColor" @input="updateStyles" />
      </div>

      <!-- Selector de tamaño de fuente para el texto -->
      <div>
        <label for="fontSize">Tamaño letra</label>
        <input id="fontSize" type="number" v-model="fontSize" @input="updateStyles" />
      </div>

      <!-- Selector de tamaño de fuente del botón -->
      <div>
        <label for="buttonFontSize">Tamaño letra del botón</label>
        <input id="buttonFontSize" type="number" v-model="buttonFontSize" @input="updateStyles" />
      </div>

      <!-- Selector de color de fondo del botón -->
      <div>
        <label for="buttonColor">Color fondo del botón</label>
        <input id="buttonColor" type="color" v-model="buttonColor" @input="updateStyles" />
      </div>

      <!-- Selector de color de resaltado (hover/active) -->
      <div>
        <label for="highlightColor">Color de resaltado</label>
        <input id="highlightColor" type="color" v-model="highlightColor" @input="updateStyles" />
      </div>
      
      <!-- Campo para cargar la fuente -->
      <div>
        <label for="fontFile">Cargar fuente (TTF):</label>
        <input type="file" @change="onFontFileChange" accept=".ttf" id="fontFile" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontColor: '#000000',        // Color de la letra por defecto
      backgroundColor: '#ffffff',  // Color de fondo por defecto
      fontSize: 16,                // Tamaño de letra por defecto
      buttonFontSize: 16,          // Tamaño de letra de los botones por defecto
      buttonColor: '#000000',      // Color de fondo de los botones por defecto
      highlightColor: '#ff0000',   // Color de resaltado (hover/active)
    };
  },
  methods: {
    updateStyles() {
      // Aplica los estilos globales al body
      document.body.style.color = this.fontColor;
      document.body.style.backgroundColor = this.backgroundColor;
      document.body.style.fontSize = `${this.fontSize}px`;

      // Aplica el color a todos los encabezados, párrafos, spans, y enlaces
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li').forEach(element => {
        element.style.color = this.fontColor;
      });

      // Aplica los estilos a los botones
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.style.fontSize = `${this.buttonFontSize}px`;
        button.style.backgroundColor = this.buttonColor;
        button.style.color = this.fontColor; // Aplica el color de texto del botón también

        // Resaltado (hover/active)
        button.addEventListener('mouseenter', () => {
          button.style.backgroundColor = this.highlightColor;
        });
        button.addEventListener('mouseleave', () => {
          button.style.backgroundColor = this.buttonColor;
        });
        button.addEventListener('mousedown', () => {
          button.style.backgroundColor = this.highlightColor;
        });
        button.addEventListener('mouseup', () => {
          button.style.backgroundColor = this.buttonColor;
        });
      });

      // Aplica el fondo también a los divs y otros elementos
      document.querySelectorAll('div').forEach(div => {
        div.style.backgroundColor = this.backgroundColor;
      });
    },
    
    onFontFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fontFace = new FontFace('customFont', e.target.result);
          fontFace.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
            document.body.style.fontFamily = 'customFont';
          }).catch((error) => {
            console.error("Error cargando la fuente:", error);
          });
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }
};
</script>

<style scoped>
.customization-form {
  position: fixed;
  top: 0;
  right: 0; /* Cambia esto a 'left: 0;' si prefieres que esté en el lado izquierdo */
  width: 300px;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 1rem;
  border-left: 1px solid #ccc;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Asegúrate de que esté encima de otros elementos */
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  display: block;
}

input[type="color"],
input[type="number"] {
  width: 100%;
}
</style>
