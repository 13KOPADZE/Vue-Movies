<template>
	<div>
		<div class="grid">
			<div
				class="gridElement movie-info"
				v-for="result in results"
				:key="result.id"
			>
				<MovieCardComponent
					:movie="result"
					:image_url="IMG_W500"
					:launchModal="launchModal"
					:imdb_id="imdb_id"
				/>
			</div>
		</div>

		<button class="loadMore" @click="loadMoreMovies">
			Load More
		</button>
	</div>
</template>

<script>
import axios from 'axios';
import MovieCardComponent from './MovieCardComponent.vue';
import {
	API_KEY,
	API_URL,
	IMG_W500,
	IMG_W1280,
	MOVIE_IMDB_URL
} from '@/config';
// import Events from '../Events';

export default {
	name: 'GridCardComponent',

	props: [''],

	components: {
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
		fetch(query) {
			axios.get(query).then(response => {
				this.results = response.data.results;
			});
		}
	},
	mounted: function mounted() {
		console.log(this.$router.options.routes);
		this.fetch(API_URL + '/3/movie/popular?api_key=' + API_KEY);
	}
};
</script>
<style scoped>
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
.movie-info {
	display: block;
	font-family: Abel, sans-serif;
	color: rgb(255, 255, 255);
	text-align: center;
	background: rgb(28, 28, 28);
	border-radius: 8px;
	padding: 5px;
	height: 100%;
}
.loadMore {
	width: 25%;
	min-width: 200px;
	height: 70px;
	color: rgb(255, 255, 255);
	cursor: pointer;
	font-family: Abel, sans-serif;
	font-size: 28px;
	display: block;
	background: rgb(0, 0, 0);
	transition: all 0.3s ease 0s;
	border-radius: 40px;
	border: none;
	margin: 45px auto;
	padding: 0px 20px;
	outline: none;
}
.loadMore:hover {
	opacity: 0.8;
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
