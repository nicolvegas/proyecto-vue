<template>
	<div class="card">
		<div class="card-title">
			<h1>{{ title }}</h1>
		</div>
		<div class="card-content">
			<p>{{ content }}</p>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: "Card",
	props: {
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: false,
		},
	},
};
</script>
