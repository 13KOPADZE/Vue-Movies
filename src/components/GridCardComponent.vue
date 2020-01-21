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

		<button
			class="loadMore"
			@click="loadMoreMovies"
			:class="{ 'display-none': isHiding }"
			@keydown="SearchResult(query)"
		>
			Load More
		</button>
	</div>
</template>

<script>
import axios from 'axios';
import MovieCardComponent from './MovieCardComponent';
import {
	API_KEY,
	API_URL,
	IMG_W500,
	IMG_W1280,
	MOVIE_IMDB_URL
} from '@/config';
import Events from '../Events';

export default {
	name: 'GridCardComponent',

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
		}
	}
};
</script>
