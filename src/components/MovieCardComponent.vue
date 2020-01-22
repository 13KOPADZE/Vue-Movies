<template>
	<div class="movie-avatar" @keydown.esc="showModal = false" tabindex="0">
		<img
			:src="image_url + movie.poster_path"
			v-if="movie.poster_path !== null"
		/>
		<img src="../assets/no-image.jpg" v-else />
		<div class="trailer_play">
			<div class="d-flex justify-content-between">
				<div @click="imdb_id(movie.id)">
					<div class="score">
						<div style="color: black;">
							{{ movie.vote_average | imdbNumber }}
						</div>
					</div>
				</div>

				<div @click="launchModal(movie.id)">
					<svg
						style="cursor: pointer;"
						@click="showModal = true"
						xmlns="http://www.w3.org/2000/svg"
						width="40px"
						height="40px"
						viewBox="0 0 461.001 461.001"
					>
						<path
							d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663l-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z"
							fill="#f61c0d"
						/>
					</svg>
				</div>
			</div>
			<router-link :to="{ name: 'show', params: { id: movie.id } }">
				<span class="movie-name">{{ movie.original_title }}</span>
			</router-link>
		</div>
		<div v-if="showModal" @click="showModal = false" class="modal is-active">
			<div class="modal-background"></div>

			<div class="modal-content">
				<iframe v-bind:src="YOUTUBE_URL + this.trailers"></iframe>

				<button
					class="modal-close is-large"
					aria-label="close"
					@click="$emit('close')"
				></button>
			</div>
		</div>
		<!-- Modal for Trailer -->
	</div>
</template>

<script>
import axios from 'axios';
import { API_URL, API_KEY, YOUTUBE_URL } from '@/config';

export default {
	name: 'MovieCard',

	props: ['movie', 'image_url', 'imdb_id'],

	data() {
		return {
			YOUTUBE_URL: YOUTUBE_URL,
			showModal: false,
			trailers: ''
		};
	},

	methods: {
		launchModal(id) {
			axios
				.get(API_URL + '/3/movie/' + id + '/videos?api_key=' + API_KEY)
				.then(response => {
					this.trailers = response.data.results[0].key;
				});
		}
	}
};
</script>

<style scoped>
.movie-avatar {
	width: 100%;
	position: relative;
}
.movie-avatar .trailer_play {
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);
	text-align: center;
	width: 100%;
	height: 100%;
	transition: 0.5s;
}
.movie-avatar:hover .trailer_play {
	transition: 0.5s;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.d-flex {
	display: flex !important;
}
.justify-content-between {
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	margin-bottom: auto;
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
.modal-content {
	justify-content: center !important;
	align-items: center !important;
	display: flex;
}
.modal-close {
	position: absolute;
	right: 2%;
	top: -2%;
}
</style>
