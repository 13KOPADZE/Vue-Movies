<template>
	<div>
		<div class="container tabs is-large">
			<ul>
				<li class="is-active">Searched Movies</li>
			</ul>
		</div>
		<div class="container">
			<div v-if="results.length > 0">
				<div class="grid container">
					<div
						class="gridElement movie-info"
						v-for="result in results"
						:key="result.id"
					>
						<MovieCardComponent
							:movie="result"
							:image_url="IMG_W500"
							:imdb_id="imdb_id"
						/>
					</div>
				</div>
				<button class="loadMore" @click="loadMoreMovies">Load More</button>
				<!-- <GridCardComponent :result="searchResult" /> -->
			</div>

			<div v-else>
				<div class="svgStyle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="200px"
						height="200px"
						viewBox="0 0 451.74 451.74"
					>
						<path
							d="M446.324 367.381L262.857 41.692c-15.644-28.444-58.311-28.444-73.956 0L5.435 367.381c-15.644 28.444 4.267 64 36.978 64h365.511c34.133-1.422 54.044-35.556 38.4-64z"
							fill="#e24c4b"
						/>
						<path
							d="M225.879 63.025l183.467 325.689H42.413L225.879 63.025z"
							fill="#fff"
						/>
						<g fill="#3f4448">
							<path
								d="M196.013 212.359l11.378 75.378c1.422 8.533 8.533 15.644 18.489 15.644 8.533 0 17.067-7.111 18.489-15.644l11.378-75.378c2.844-18.489-11.378-34.133-29.867-34.133-18.49-.001-31.29 15.644-29.867 34.133z"
							/>
							<circle cx="225.879" cy="336.092" r="17.067" />
						</g>
					</svg>
					<h1 class="Danger">
						Sorry, we couldn't find any results matching "{{
							this.$route.query.query
						}}"
					</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
// import GridCardComponent from './GridCardComponent';
import MovieCardComponent from './MovieCardComponent';
import {
	API_KEY,
	API_URL,
	IMG_W500,
	IMG_W1280,
	MOVIE_IMDB_URL
} from '@/config';
import Events from '../Events';

// import VueRouter from 'vue-router'

export default {
	name: 'search',

	components: {
		// GridCardComponent
		MovieCardComponent
	},

	data() {
		return {
			nextPage: 2,
			IMG_W500: IMG_W500,
			IMG_W1280: IMG_W1280,
			query: '',
			results: '',
			loadMore: ''
		};
	},

	methods: {
		setResults(results) {
			this.results = results;
		},

		imdb_id(id) {
			axios
				.get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
				.then(response => {
					let imdbId = response.data.imdb_id;
					window.open(MOVIE_IMDB_URL + imdbId, '_blank');
				});
		},
		loadMoreMovies(query) {
			axios
				.get(
					API_URL +
						'/3/search/movie?api_key=' +
						API_KEY +
						'&query=' +
						query +
						'&page=' +
						this.nextPage
				)
				.then(response => {
					this.results = this.results.concat(response.data.results);
				});
			this.nextPage++;
		}
	},

	created() {
		Events.$on('search', this.setResults);
	}
};
</script>
<style scoped>
.display-none {
	display: none !important;
}
.display-block {
	display: none !important;
}
.svgStyle {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 70vh;
}
.svgStyle h1 {
	margin-top: 30px;
	font-weight: bold;
	color: #1c1c1c;
	text-align: center;
	padding: 20px;
	font-size: 25px;
}
.searchText {
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	border-bottom-color: #dbdbdb;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	color: #4a4a4a;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	margin-bottom: -1px;
	padding: 0.5em 1em;
	vertical-align: top;
}

.background {
	background: linear-gradient(
			rgba(0, 0, 0, 0) 39%,
			rgba(0, 0, 0, 0) 41%,
			rgba(0, 0, 0, 0.65) 100%
		),
		url('../assets/background.jpg');
	width: 100%;
	height: 600px;
	position: relative;
	background-size: cover;
	background-position: center center, center center !important;
}
.grid {
	position: relative;
	display: grid;
	grid-template-columns: repeat(5, minmax(100px, 1fr));
	gap: 40px;
	margin-top: 40px;
}
.gridElement {
	animation: 0.5s ease 0s 1 normal none running animateGrid;
	position: relative;
	overflow: hidden;
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
.align-items-end {
	align-items: flex-end;
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
	padding: 20px;
}
h1 {
	font-family: Abel, sans-serif;
	font-size: 48px;
	color: rgb(255, 255, 255);
}
p {
	font-family: Abel, sans-serif;
	font-size: 22px;
	line-height: 26px;
	color: rgb(255, 255, 255);
}
.d-flex {
	display: flex !important;
}
.align-items-center {
	align-items: center;
}
.justify-content-between {
	justify-content: space-between;
}
.wrapped {
	flex-wrap: wrap;
}
ul li {
	margin-top: 15px;
	color: #3273dc !important;
	border-bottom: 1px solid #3273dc !important;
	font-size: 30px;
}
.wrapped li {
	padding: 15px;
	cursor: pointer;
}
input:focus {
	box-shadow: none;
}
.paddingAround {
	padding: 0 20px;
}
a {
	transition: 0.5s;
}
a:hover {
	opacity: 0.8;
	transition: 0.5s;
}
img {
	width: 100%;
	height: auto;
	object-fit: cover;
	transition: all 0.3s ease 0s;
	border-radius: 20px;
}
.movie-info {
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
.movie-name {
	color: #fff;
	display: block;
	font-size: 16px;
	margin: 0px 0px 10px;
}

.grid {
	position: relative;
	display: grid;
	grid-template-columns: repeat(5, minmax(100px, 1fr));
	gap: 40px;
	margin-top: 40px;
}
.gridElement {
	animation: 0.5s ease 0s 1 normal none running animateGrid;
	cursor: pointer;
}

h1 {
	font-family: Abel, sans-serif;
	font-size: 42px;
	color: #fff;
	padding: 20px 0;
}
.search-background {
	background: #1c1c1c;
	padding: 30px 20px;
}
::placeholder {
	font-size: 20px;
	color: #ccc;
}
.pos {
	position: absolute;
	left: 16px;
	top: 18px;
}

.input {
	border: none;
	border-radius: 30px;
	background: #353535;
	color: aliceblue;
	font-size: 20px;
	outline: none;
	height: 60px;
}
.loadMore {
	width: 25%;
	min-width: 200px;
	height: 55px;
	color: rgb(255, 255, 255);
	cursor: pointer;
	font-family: Abel, sans-serif;
	font-size: 28px;
	display: block;
	background: rgb(0, 0, 0);
	-webkit-transition: all 0.3s ease 0s;
	transition: all 0.3s ease 0s;
	border-radius: 40px;
	border: none;
	margin: 50px auto;
	padding: 0px 20px;
	outline: none;
}
.loadMore:hover {
	opacity: 0.8;
}
.control {
	font-size: 1.5rem !important;
}
@media screen and (max-width: 1024px) {
	.grid {
		grid-template-columns: repeat(4, minmax(100px, 1fr));
		gap: 40px;
	}
}
@media screen and (max-width: 768px) {
	.grid {
		grid-template-columns: repeat(3, minmax(100px, 1fr));
	}
}
@media screen and (max-width: 600px) {
	.grid {
		grid-template-columns: repeat(2, minmax(100px, 1fr));
	}
}
@media screen and (max-width: 375px) {
	.grid {
		grid-template-columns: repeat(1, minmax(100px, 1fr));
	}
}
</style>
