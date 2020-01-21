<template>
	<div
		class="background"
		:style="{
			backgroundImage: `url(${'https://image.tmdb.org/t/p/w1280/' +
				movie.backdrop_path})`
		}"
		v-if="movie.backdrop_path !== null"
	>
		<div class="container informationText d-flex align-items-end">
			<div class="flex-direction-column">
				<div>
					<div class="rating-release justify-content-between d-flex">
						<h1>{{ movie.original_title }}</h1>

						<div class="imdbScore">
							<h3>Imdb Rating</h3>
							<div @click="imdb_id(movie.id)">
								<div class="score">
									<div style="color: black;">
										{{ movie.vote_average | imdbNumber }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<h3>Plot</h3>
					<p>{{ movie.overview }}</p>
				</div>

				<div class="movieDetails">
					<router-link :to="{ name: 'show', params: { id: movie.id } }">
						<button class="movieDetailsButton">
							Movie Details
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SliderCard',

	props: ['movie', 'background_url', 'imdb_id']
};
</script>

<style scoped>
.background {
	width: 100%;
	min-height: 600px;
	height: 100%;
	position: relative;
	padding: 60px 20px;
	background-size: cover;
	background-position: center center, center center !important;
}
.informationText {
	height: 100%;
	color: rgb(255, 255, 255);
	background: rgba(0, 0, 0, 0);
	margin-bottom: 0px;
}
.d-flex {
	display: flex !important;
}
.align-items-end {
	align-items: flex-end;
}
.flex-direction-column {
	max-width: 700px;
	margin-bottom: 50px;
	flex-direction: column;
	padding: 20px;
	background: rgba(0, 0, 0, 0.8);
	border-radius: 20px;
}

.rating-release {
	margin-top: 40px;
}
.release {
	margin-left: 40px;
}
.imdbScore h3 {
	padding: 0 0 20px 0;
}
.justify-content-between {
	justify-content: space-between;
}
.score {
	cursor: pointer;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	width: 35px;
	height: 35px;
	color: rgb(0, 0, 0);
	font-weight: 800;
	background: rgb(255, 255, 255);
	border-radius: 25px;
	margin: 0 auto;
}
.movieDetails {
	color: #fff;
	transition: 0.5s;
	padding: 20px 0;
}
.movieDetailsButton {
	cursor: pointer;
	width: 125px;
	height: 35px;
	border-radius: 20px;
	border: none;
	font-size: 14px;
	font-weight: bold;
	background: mintcream;
	transition: 0.5s;
}
.movieDetailsButton:hover {
	transform: scale(1.05);
	transition: 0.5s;
}
h1 {
	color: #fff;
	font-size: 24px;
}
h3 {
	font-weight: 400;
}
p {
	font-size: 18px;
	padding: 20px 0;
	color: rgb(255, 255, 255);
}
</style>
