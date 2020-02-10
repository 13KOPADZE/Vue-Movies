import axios from 'axios';
import { API_KEY, API_URL, MOVIE_IMDB_URL } from '@/config';

export function imdb_id(id) {
  axios
    .get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
    .then(response => {
      let imdb_id = response.data.imdb_id;
      window.open(MOVIE_IMDB_URL + imdb_id, '_blank');
    });
}

export function geners() {
  axios
    .get(API_URL + '/3/genre/movie/list?api_key=' + API_KEY)
    .then(response => {
      this.geners = response.data.genres;
    });
}
