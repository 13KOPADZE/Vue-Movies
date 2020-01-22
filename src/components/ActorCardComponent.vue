<template>
	<div>
		<router-link :to="{ name: 'actor', params: { id: actor.id } }">
			<div class="actors-info" v-if="actor !== []">
				<div class="imgStyle">
					<img
						v-bind:src="'http://image.tmdb.org/t/p/w500/' + actor.profile_path"
						v-if="actor.profile_path !== null"
					/>
					<img src="../assets/no-image.jpg" v-else />
				</div>
				<div class="actorStyle">
					<div class="actor-name">Name: {{ actor.name }}</div>

					<br />

					<div class="actor-character">Character: {{ actor.character }}</div>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'ActorCard',

	props: ['actor', 'image_url']
};
</script>

<style scoped>
.actors-info {
	display: block;
	cursor: pointer;
	font-family: Abel, sans-serif;
	color: rgb(28, 28, 28);
	text-align: center;
	height: 100%;
	display: flex;
	border-bottom: 1px solid #000;
}
.actors-info img {
	display: block;
	width: 100%;
	height: auto;
	max-height: 160px;
	object-fit: cover;
}
.actor-name {
	display: block;
	font-size: 18px;
	padding: 20px;
	float: left;
}
.actor-character {
	display: block;
	font-size: 18px;
	float: left;
	padding: 20px;
}
.imgStyle {
	max-width: 120px;
	width: 100%;
}
</style>
