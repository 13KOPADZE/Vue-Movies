<template>
	<div>
		<hooper
			:hoverPause="false"
			:itemsToShow="1"
			:progress="true"
			:autoPlay="true"
			:wheelControl="false"
			:playSpeed="3500"
			:infiniteScroll="true"
			:centerMode="true"
			:class="{ 'display-none': isHiding }"
		>
			<slide v-for="result in results" :key="result.id">
				<SliderCardComponent
					:movie="result"
					:background_url="IMG_W1280"
					:imdb_id="imdb_id"
				/>
			</slide>
		</hooper>
		<div></div>
		<div class="search-background">
			<!-- <div class="container control">
				<p class="control has-icons-left relative">
					<input
						class="input"
						type="text"
						placeholder="Search Movie"
						v-model.trim="query"
						@keyup="SearchResult(query)"
					/>
					<svg
						class="pos"
						xmlns="http://www.w3.org/2000/svg"
						width="25px"
						viewBox="0 0 512 512"
					>
						<path
							fill="#fff"
							d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"
						/>
					</svg>
				</p>
			</div> -->

			<div class="genres" :class="{ 'display-none': isHiding }">
				<ul class="container d-flex wrapped genres">
					<li
						@click="filterGeners(genres.id)"
						v-for="genres in genres"
						:key="genres.name"
					>
						{{ genres.name }}
					</li>
				</ul>
			</div>
		</div>

		<div
			class="container tabs is-large"
			:class="{ 'display-none': searchText }"
		>
			<ul>
				<li class="searchText">Searched Movies</li>
			</ul>
		</div>

		<div class="container paddingAround">
			<div class="tabs is-large" :class="{ 'display-none': isHiding }">
				<ul>
					<li class="is-active">
						<router-link to="/popular-movies">Popular Movies</router-link>
					</li>
					<li>
						<router-link to="/upcoming-movies">Upcoming Movies</router-link>
					</li>
				</ul>
			</div>
			<!-- Grid -->
			<GridCardComponent />
			<!--  -->
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import NProgress from 'nprogress';

import {
	API_KEY,
	API_URL,
	IMG_W500,
	IMG_W1280,
	MOVIE_IMDB_URL,
	YOUTUBE_URL
} from '@/config';
import SliderCardComponent from './SliderCardComponent.vue';
import GridCardComponent from './GridCardComponent';

import { Hooper, Slide } from 'hooper';

export default {
	name: 'MoviesList',

	components: {
		SliderCardComponent,
		GridCardComponent,
		Hooper,
		Slide
	},

	data() {
		return {
			nextPage: 2,
			IMG_W500: IMG_W500,
			IMG_W1280: IMG_W1280,
			query: '',
			results: '',
			upcoming: '',
			loadMore: '',
			isHiding: false,
			searchText: true,
			genres: '',
			MOVIE_IMDB_URL: MOVIE_IMDB_URL,
			YOUTUBE_URL: YOUTUBE_URL,
			trailers: '',
			movie_id: ''
		};
	},

	methods: {
		/**
		 *
		 */

		loadMoreMovies() {
			axios
				.get(
					API_URL +
						'/3/movie/popular?api_key=' +
						API_KEY +
						'&page=' +
						this.nextPage
				)
				.then(response => {
					this.results = this.results.concat(response.data.results);
				});
			this.nextPage++;
		},

		/**
		 *
		 */

		launchModal(id) {
			axios
				.get(API_URL + '/3/movie/' + id + '/videos?api_key=' + API_KEY)
				.then(response => {
					this.trailers = response.data.results[0].key;
				});
		},

		/**
		 *
		 */

		imdb_id(id) {
			axios
				.get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
				.then(response => {
					let imdbId = response.data.imdb_id;
					window.open(MOVIE_IMDB_URL + imdbId, '_blank');
				});
		},

		/**
		 *
		 */
		filterGeners(id) {
			NProgress.start();
			let query =
				API_URL +
				'/3/discover/movie?api_key=' +
				API_KEY +
				'&sort_by=popularity.desc&with_genres=' +
				id;
			this.fetch(query);
			NProgress.done();
		},

		/**
		 *
		 */
		fetch(query) {
			axios.get(query).then(response => {
				this.results = response.data.results;
			});
		},

		// SearchResult(query) {
		// 	let url =
		// 		API_URL + '/3/search/movie?api_key=' + API_KEY + '&query=' + query;
		// 	query == ''
		// 		? (url = API_URL + '/3/movie/popular?api_key=' + API_KEY)
		// 		: true;
		// 	this.fetch(url);

		// 	if (query == '') {
		// 		this.isHiding = false;
		// 	} else {
		// 		this.isHiding = true;
		// 	}
		// 	if (query == '') {
		// 		this.searchText = true;
		// 	} else {
		// 		this.searchText = false;
		// 	}
		// },

		/**
		 *
		 */
		styleAction(attribute, selector, style) {
			var sliderUl = this.$el.querySelector(attribute);
			sliderUl.setAttribute('style', selector + ':' + style);
		}
	},

	mounted: function mounted() {
		this.styleAction('.hooper-track', 'display', 'flex');
		this.styleAction('.hooper-liveregion', 'display', 'none');

		this.fetch(API_URL + '/3/movie/popular?api_key=' + API_KEY);

		axios
			.get(API_URL + '/3/movie/upcoming?api_key=' + API_KEY)
			.then(response => {
				this.upcoming = response.data.results;
			});

		axios
			.get(API_URL + '/3/genre/movie/list?api_key=' + API_KEY)
			.then(response => {
				this.genres = response.data.genres;
			});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display-none {
	display: none !important;
}
.display-block {
	display: none !important;
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
.hooper {
	display: flex;
	outline: none;
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
.wrapped li {
	padding: 15px;
	cursor: pointer;
}
.active {
	color: aqua;
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
h3 {
	color: #fff;
}
.pagination {
	margin: 60px 0;
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
.movie-name {
	margin-top: 52px;
	display: block;
	color: #fff;
}
iframe {
	width: 640px;
	height: 400px;
	padding: 20px;
}
.modal-close {
	position: absolute;
	right: 2%;
	top: -2%;
}
.delete:active,
.modal-close:active {
	background-color: none !important;
}
.modal-content {
	justify-content: center !important;
	align-items: center !important;
	display: flex;
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
.relative {
	position: relative;
}
.pos {
	position: absolute;
	left: 16px;
	top: 18px;
}

.genres p {
	text-align: center;
	color: #3298dc;
}

.genres {
	padding: 5px;
	margin-top: 20px;
	color: #fff;
}
.genres li {
	padding: 10px;
	margin: 5px;
	cursor: pointer;
	transition: 0.5s;
	border: 1px solid #32a2ec;
	border-radius: 5px;
}

.genres li:hover {
	border: 1px solid #3273dc;
	background: #3273dc;
	transition: 0.5s;
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
	.modal-close {
		position: absolute;
		right: 5%;
		top: -2%;
	}
}
@media screen and (max-width: 600px) {
	.grid {
		grid-template-columns: repeat(2, minmax(100px, 1fr));
	}
	ul {
		flex-direction: column;
	}
}
@media screen and (max-width: 375px) {
	.grid {
		grid-template-columns: repeat(1, minmax(100px, 1fr));
	}
}
</style>
