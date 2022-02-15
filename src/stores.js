import { browser } from '$app/env';
import { writable } from 'svelte/store';

const localAuth = browser && window.localStorage.getItem('isAuth', 0);
export const isAuth = writable(localAuth);
isAuth.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('isAuth', value);
	}
});

const localUser = browser && window.localStorage.getItem('userData');
export let userData = writable(JSON.parse(localUser));
userData.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('userData', JSON.stringify(value));
	}
});

let localMovies = browser && window.localStorage.getItem('favMovies');
export let favMovies = writable(JSON.parse(localMovies));
favMovies.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('favMovies', JSON.stringify(value));
	}
});
 
let allLocalMovies = browser && window.localStorage.getItem('allMovies');
export let allMovies = writable(JSON.parse(allLocalMovies));
allMovies.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('allMovies', JSON.stringify(value ?? []));
	}
});

let allLocalMoviesByUser = browser && window.localStorage.getItem('popular');
export let popular = writable(JSON.parse(allLocalMoviesByUser));
popular.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('popular', JSON.stringify(value));
	}
});

let commentMovieIdLocal = browser && window.localStorage.getItem('commentMovieId');
export let commentMovieId = writable(JSON.parse(commentMovieIdLocal));
commentMovieId.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('commentMovieId', JSON.stringify(value) ?? '');
	}
});
let commentsByMovieLocal = browser && window.localStorage.getItem('commentsByMovie');
export let commentsByMovie = writable(JSON.parse(commentsByMovieLocal));
commentsByMovie.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('commentsByMovie', JSON.stringify(value) ?? '');
	}
});

 