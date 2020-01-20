<template>
	<div>
		<div class="navigation-bar">
			<div class="container navigation-content">
				<router-link to="/">
					<p>Home</p>
				</router-link>
				<p>|</p>
				<p>{{ results.name }}</p>
			</div>
		</div>
		<div
			class="background"
			:style="{
				backgroundImage: `url(${'https://image.tmdb.org/t/p/w1280' +
					results.profile_path})`
			}"
			v-if="results.profile_path !== undefined"
		>
			<div class="movieDetails">
				<div class="actor-image">
					<img
						v-bind:src="
							'https://image.tmdb.org/t/p/w500' + results.profile_path
						"
						v-if="results.profile_path !== null"
					/>
					<img src="../assets/no-image.jpg" v-else />
				</div>
				<section class="informationSection">
					<div>
						<h1>{{ results.name }}</h1>
						<h3>Biography</h3>
						<p v-if="results.biography !== null">{{ results.biography }}</p>
						<p v-else>No Info</p>
					</div>
					<div class="actor-info">
						<div>
							<h3>Imdb Id</h3>
							<div class="imdb_id" v-if="results.imdb_id !== null">
								<a :href="ACTOR_IMDB_URL + results.imdb_id" target="_blank"
									><div style="color: #fff !important">
										{{ results.imdb_id }}
									</div></a
								>
							</div>
							<p v-else>No Info</p>
						</div>

						<div class="release">
							<h3>Place Of Birth</h3>
							<p v-if="results.place_of_birth !== null">
								{{ results.place_of_birth }}
							</p>
							<p v-else>No Info</p>
						</div>
						<div class="birthday">
							<!-- <p>{{result.birthday}}</p> -->
						</div>
					</div>
				</section>
			</div>
		</div>
		<div class="navigation-bar">
			<div class="container justify-content-between d-flex">
				<div class="actor-info paddingAround">
					<div>
						<h3>Gender</h3>
						<div class="gender" v-if="results.gender == 1">
							<svg
								height="15px"
								width="15px"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 349.54 349.54"
							>
								<path
									fill="#fff"
									d="M284.17 89.848a110.29 110.29 0 00-6.32-20.84 110.857 110.857 0 00-10.32-19.28 112.403 112.403 0 00-30.92-30.96 110.512 110.512 0 00-40-16.64 113.15 113.15 0 00-43.68 0 110.47 110.47 0 00-40 16.64 112.409 112.409 0 00-30.92 30.92 110.53 110.53 0 00-16.64 40 113.112 113.112 0 000 43.68 110.47 110.47 0 0016.64 40 112.243 112.243 0 0043.04 37.96 110.987 110.987 0 0033.6 10.88 4.4 4.4 0 014 4.56v31.6a4.4 4.4 0 01-4.4 4.4h-46.64a11.999 11.999 0 00-8.4 3.48c-4.484 4.545-4.625 11.805-.32 16.52l.24.2a11.99 11.99 0 004 2.56c1.433.596 2.968.909 4.52.92h46.72a4.399 4.399 0 013.12 1.28 4.4 4.4 0 011.16 3.04v46.76a12.015 12.015 0 00.88 4.56 11.753 11.753 0 002.56 4 11.723 11.723 0 004 2.56 12.003 12.003 0 009.08 0 11.753 11.753 0 004-2.56 11.753 11.753 0 002.56-4c.587-1.448.886-2.997.88-4.56v-46.76a4.399 4.399 0 011.28-3.12 4.399 4.399 0 013.12-1.28h46.68a12.015 12.015 0 004.56-.88 11.738 11.738 0 004-2.56 11.753 11.753 0 002.56-4 12.003 12.003 0 000-9.08 12.004 12.004 0 00-1.16-2.16l-1.56-1.56a11.999 11.999 0 00-8.4-3.48h-46.76a4.399 4.399 0 01-3.12-1.28 4.399 4.399 0 01-1.28-3.12v-31.48a4.4 4.4 0 011.08-2.88 4.362 4.362 0 012.68-1.44 110.882 110.882 0 0034.12-10.64 111.999 111.999 0 0053.44-57.4 110.363 110.363 0 006.32-20.88 113.112 113.112 0 000-43.68zm-23.32 39v.16c-9.803 47.805-56.504 78.612-104.309 68.809-47.805-9.803-78.612-56.504-68.809-104.309 9.803-47.805 56.504-78.612 104.309-68.809 41.276 8.464 70.833 44.895 70.609 87.029a87.851 87.851 0 01-1.8 17.12z"
								/>
							</svg>
							Female
						</div>
						<div class="gender" v-else>
							<svg
								height="15px"
								width="15px"
								viewBox="0 0 384 384"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill="#fff"
									d="M383.793 13.938c-.176-1.38-.48-2.708-.984-3.954-.016-.03-.016-.074-.024-.113 0-.008-.008-.016-.015-.023-.555-1.313-1.313-2.504-2.168-3.61-.211-.261-.418-.52-.641-.765-.914-1.032-1.906-1.985-3.059-2.762-.03-.024-.07-.031-.101-.055-1.114-.734-2.344-1.289-3.633-1.726-.32-.114-.633-.211-.961-.297C370.855.266 369.465 0 368 0H256c-8.832 0-16 7.168-16 16s7.168 16 16 16h73.367l-95.496 95.496C208.406 107.13 177.055 96 144 96 64.602 96 0 160.602 0 240s64.602 144 144 144 144-64.602 144-144c0-33.04-11.121-64.383-31.504-89.871L352 54.625V128c0 8.832 7.168 16 16 16s16-7.168 16-16V16c0-.336-.078-.656-.098-.984a16.243 16.243 0 00-.109-1.079zM144 352c-61.762 0-112-50.238-112-112s50.238-112 112-112c29.902 0 58.055 11.64 79.223 32.734C244.359 181.945 256 210.098 256 240c0 61.762-50.238 112-112 112zm0 0"
								/>
							</svg>
							Male
						</div>
					</div>

					<div class="release">
						<h3>Place Of Birth</h3>
						<p v-if="results.place_of_birth !== null">
							{{ results.place_of_birth }}
						</p>
						<p v-else>No Info</p>
					</div>
					<div class="birthday">
						<h3>Date Of Birth</h3>
						<p v-if="results.birthday !== null">
							{{ results.birthday | moment('dddd, MMMM Do YYYY') }}
						</p>
						<p v-else>No Info</p>
					</div>
				</div>
			</div>
		</div>

		<div class="container paddingAround">
			<h1 class="actors-heading">Movies</h1>

			<div class="grid">
				<div
					class="gridElement movie-info"
					v-for="movie in movies"
					:key="movie.id"
				>
					<MovieCardComponent
						:movie="movie"
						:image_url="IMG_W500"
						:imdb_id="imdb_id"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import {
	API_KEY,
	API_URL,
	IMG_W500,
	ACTOR_IMDB_URL,
	MOVIE_IMDB_URL
} from '@/config';
import MovieCardComponent from './MovieCardComponent.vue';

Vue.use(require('vue-moment'));

export default {
	name: 'ActorDetailsPage',

	components: {
		MovieCardComponent
	},

	data() {
		return {
			results: '',
			movies: '',
			ACTOR_IMDB_URL: ACTOR_IMDB_URL,
			IMG_W500: IMG_W500
		};
	},

	methods: {
		imdb_id(id) {
			axios
				.get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
				.then(response => {
					let imdbId = response.data.imdb_id;
					window.open(MOVIE_IMDB_URL + imdbId, '_blank');
				});
		}
	},

	mounted() {
		axios
			.get(
				API_URL + '/3/person/' + this.$route.params.id + '?api_key=' + API_KEY
			)
			.then(response => {
				this.results = response.data;
			});
		axios
			.get(
				API_URL +
					'/3/person/' +
					this.$route.params.id +
					'/movie_credits?api_key=' +
					API_KEY
			)
			.then(response => {
				this.movies = response.data.cast;
			});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
	width: 100%;
	min-height: 600px;
	position: relative;
	padding: 60px 20px;
	background-size: cover;
	background-position: center center, center center !important;
}
.movieDetails {
	max-width: 1280px;
	min-height: 450px;
	position: relative;
	margin: 0px auto;
	background: rgba(0, 0, 0, 0.7);
	border-radius: 20px;
	align-items: center;
}
.actor-image {
	width: 300px;
	float: left;
}
.actor-image img {
	width: 100%;
	height: auto;
	object-fit: cover;
	transition: all 0.3s ease 0s;
	border-radius: 20px;
}
.informationSection {
	font-family: Arial, Helvetica, sans-serif;
	color: rgb(255, 255, 255);
	padding: 40px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
.informationSection p {
	font-family: Abel, sans-serif;
	font-size: 18px;
	line-height: 26px;
	margin-top: 20px;
}
.actor-info {
	display: flex;
	-webkit-box-pack: start;
	justify-content: space-between;
	width: 100%;
}
.gender {
	text-align: center;
}
.imdb_id {
	margin-top: 15px;
}
.release {
	margin: 0px 0px 0px 40px;
}
.svgStyle p {
	margin-right: 10px;
}
.svgStyle {
	width: 15px !important;
}
.score {
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
.informationSection h1 {
	font-family: Abel, sans-serif;
	font-size: 48px;
	color: rgb(255, 255, 255);
}
.actors-heading {
	margin-top: 20px;
	font-family: Abel, sans-serif;
	font-size: 48px;
	color: rgb(0, 0, 0);
}
.informationSection h3 {
	font-size: 23px;
	line-height: 0;
	margin-top: 30px;
}
.actors-info {
	display: block;
	cursor: pointer;
	font-family: Abel, sans-serif;
	color: rgb(255, 255, 255);
	text-align: center;
	background: rgb(28, 28, 28);
	border-radius: 20px;
	padding: 5px;
	height: 100%;
}
.actors-info img {
	display: block;
	width: 100%;
	height: auto;
	object-fit: cover;
	border-radius: 15px;
}
.actor-name {
	display: block;
	font-size: 18px;
	margin: 10px 0px 0px;
}
.actor-character {
	display: block;
	font-size: 16px;
	margin: 0px 0px 10px;
}
.align-items-end {
	align-items: flex-end;
}
.justify-content-between {
	justify-content: space-between;
}
.d-flex {
	display: flex;
}
.informationText {
	height: 100%;
	color: rgb(255, 255, 255);
	background: rgba(0, 0, 0, 0);
	margin-bottom: 0px;
}
.flex-direction-column {
	max-width: 700px;
	margin-bottom: 50px;
	flex-direction: column;
}
.paddingAround {
	padding: 0 20px;
}
.navigation-bar {
	display: flex !important;
	-webkit-box-align: center;
	align-items: center;
	width: 100%;
	height: 70px;
	color: rgb(255, 255, 255);
	background: rgb(53, 53, 53);
}
.navigation-content {
	display: flex;
	width: 100%;
	margin: 0px auto;
	padding: 0px 20px;
}
img {
	width: 100%;
	height: auto;
	object-fit: cover;
	transition: all 0.3s ease 0s;
	border-radius: 20px;
}
.pagination {
	margin: 60px 0;
}

.grid {
	position: relative;
	display: grid;
	grid-template-columns: repeat(5, minmax(100px, 1fr));
	gap: 40px;
	margin-top: 40px;
	margin-bottom: 40px;
}
.gridElement {
	animation: 0.5s ease 0s 1 normal none running animateGrid;
	position: relative;
}
.movie-info {
	display: block;
	font-family: Abel, sans-serif;
	color: rgb(255, 255, 255);
	text-align: center;
	background: rgb(28, 28, 28);
	border-radius: 20px;
	padding: 5px;
	height: 100%;
}

p {
	font-family: Abel, sans-serif;
	font-size: 22px;
	float: left;
	color: rgb(255, 255, 255);
	padding-right: 10px;
	text-decoration: none;
}

@media screen and (max-width: 1024px) {
	.grid {
		grid-template-columns: repeat(4, minmax(100px, 1fr));
		gap: 40px;
	}
	.actor-image {
		margin: 0 auto;
		float: none;
		width: 500px;
	}
	.informationSection p {
		font-family: Abel, sans-serif;
		font-size: 22px;
		line-height: 26px;
		margin-top: 20px;
	}
	.informationSection h3 {
		font-size: 24px !important;
	}
}
@media screen and (max-width: 768px) {
	.grid {
		grid-template-columns: repeat(3, minmax(100px, 1fr));
	}
	.informationSection h3 {
		font-size: 17px !important;
		line-height: 0;
		margin-top: 30px;
	}
	.actor-info p {
		font-size: 17px;
	}
}
@media screen and (max-width: 600px) {
	.grid {
		grid-template-columns: repeat(2, minmax(100px, 1fr));
	}
	.actor-image {
		margin: 0 auto;
		float: none;
		width: auto;
	}
	.navigation-bar {
		height: auto;
	}
	.justify-content-between {
		flex-direction: column;
		padding: 20px;
	}
	.spacing {
		margin: 10px;
	}
}
@media screen and (max-width: 375px) {
	.grid {
		grid-template-columns: repeat(1, minmax(100px, 1fr));
	}
	.informationSection h3 {
		font-size: 9px !important;
	}
	.informationSection p {
		font-size: unset;
	}
}
</style>
