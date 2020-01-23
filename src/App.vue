<template>
	<div>
		<Header />
		<!-- HeaderComponent -->

		<div id="app">
			<!-- Main Content  -->

			<router-link to="/"></router-link>

			<router-view></router-view>
		</div>
		<Footer />
	</div>
</template>

<script>
import axios from 'axios';
import 'bulma/css/bulma.css';
import 'nprogress/nprogress.css';
import Header from './components/Header.vue';
import NProgress from 'nprogress';
import Footer from './components/Footer.vue';

export default {
	name: 'app',
	components: {
		Header,
		Footer
	},
	mounted() {
		// Add a request interceptor
		axios.interceptors.request.use(function(config) {
			NProgress.start();
			return config;
		});
		// Add a response interceptor
		axios.interceptors.response.use(function(config) {
			NProgress.done();
			return config;
		});
	}
};
</script>

<style>
* {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box !important;
	outline: none !important;
}
body {
	overflow: hidden;
}
header {
	display: flex;
	background: rgb(28, 28, 28);
	padding: 30px 20px;
}
</style>
