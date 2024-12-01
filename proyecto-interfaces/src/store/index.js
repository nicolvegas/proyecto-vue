import { createStore } from "vuex";

export default createStore({
	state: {
		colors: JSON.parse(localStorage.getItem("colors")) || [],
		fontSize: localStorage.getItem("fontSize") || "16px", // valor por defecto
	},
	mutations: {
		setColors(state, colors) {
			state.colors = colors;
			localStorage.setItem("colors", JSON.stringify(colors));
		},
		setFontSize(state, fontSize) {
			state.fontSize = fontSize;
			localStorage.setItem("fontSize", fontSize);
		},
	},
});
