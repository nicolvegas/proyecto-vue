document.getElementById("apply-btn").addEventListener("click", function() {
    // Obtener los valores de los inputs
    const labelColor = document.getElementById("label-color").value;
    const backgroundColor = document.getElementById("background-color").value;
    const fontSize = document.getElementById("font-size").value + "px";
    const buttonFontSize = document.getElementById("button-font-size").value + "px";
    const buttonBgColor = document.getElementById("button-bg-color").value;

    // Aplicar los estilos dinámicamente
    document.getElementById("nombre-label").style.color = labelColor;
    document.getElementById("apellido-label").style.color = labelColor;
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.fontSize = fontSize;
    document.getElementById("submit-btn").style.fontSize = buttonFontSize;
    document.getElementById("submit-btn").style.backgroundColor = buttonBgColor;
});
