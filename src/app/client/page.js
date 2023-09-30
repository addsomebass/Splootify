"use client";

import React, {useState} from "react";
import {SpotifyAuth} from "@/components/auth/SpotifyAuth";
import SpotifyPlayer from "@/components/player/SpotifyPlayer";

function ClientComponent() {

	const [input, setInput] = useState('');
	const [trackList, setTrackList] = useState([]);
	const [albumResults, setAlbumResults] = useState([]);
	const [artistResults, setArtistResults] = useState([]);
	const [playerId, setPlayerId] = useState('');


	let genres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"]


	// function setPlayerId(myString) {
	// 	console.log(myString);
	// }

	async function fetchData() {


		console.log("clicked");

		let recommendations = await getRecommendations(10, '4tZwfgrHOc3mvqYlEYSvVi', "electronic", null,
			null, null, null,
			0.5, 0.8, 0.9,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null,
			null, null, null
			);


		// let myList = recommendations.results.tracks.map((track, index) => {
		// 	return `<a href="${track.external_urls.spotify}">${track.name}</a><br>`
		// });
		//
		// console.log(myList);

		setTrackList(recommendations.results.tracks);

	}

	async function getRecommendations(limit = 10, seedArtists, seedGenres, seedTracks,
									  minAcousticness, maxAcousticness, targetAcousticness,
									  minDanceability, maxDanceability, targetDanceability,
									  minEnergy, maxEnergy, targetEnergy,
									  minInstrumentalness, maxInstrumentalness, targetInstrumentalness,
									  minKey, maxKey, targetKey,
									  minLiveness, maxLiveness, targetLiveness,
									  minLoudness, maxLoudness, targetLoudness,
									  minMode, maxMode, targetMode,
									  minPopularity, maxPopularity, targetPopularity,
									  minSpeechiness, maxSpeechiness, targetSpeechiness,
									  minTempo, maxTempo, targetTempo,
									  minTimeSignature, maxTimeSignature, targetTimeSignature,
									  minValence, maxValence, targetValence) {



			// Define the URL and parameters

		let params = {
			limit: limit,
			//The target size of the trackList of recommended tracks

			market: 'US',

			seed_artists: seedArtists,
			//A comma separated trackList of Spotify IDs for seed artists.
			//Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
			//Note: only required if seed_genres and seed_tracks are not set.

			seed_genres: seedGenres,
			// A comma separated trackList of any genres in the set of available genre seeds.
			// Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
			// Note: only required if seed_artists and seed_tracks are not set.

			seed_tracks: seedTracks,
			// A comma separated trackList of Spotify IDs for a seed track.
			// Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
			// Note: only required if seed_artists and seed_genres are not set.

			min_acousticness: minAcousticness, //range 0-1
			max_acousticness: maxAcousticness, //range 0-1
			target_acousticness: targetAcousticness, //range 0-1
			// I think acousticness determines how acoustical a track is

			min_danceability: minDanceability, //range 0-1
			max_danceability: maxDanceability, //range 0-1
			target_danceability: targetDanceability, //range 0-1
			// get funky


			min_energy: minEnergy,  //range 0-1
			max_energy: maxEnergy,  //range 0-1
			target_energy: targetEnergy,  //range 0-1
			// how pumped you are going to get, on a scale from 0-1

			min_instrumentalness: minInstrumentalness,  //range 0-1
			max_instrumentalness: maxInstrumentalness,  //range 0-1
			target_instrumentalness: targetInstrumentalness,  //range 0-1
			// For example, max_instrumentalness=0.35 would filter out most tracks that are likely to be instrumental

			min_key: minKey,  //range 0-11
			max_key: maxKey,  //range 0-11
			target_key: targetKey,  //range 0-11
			// Maybe the key the song is in? interesting

			min_liveness: minLiveness,  //range 0-1
			max_liveness: maxLiveness,  //range 0-1
			target_liveness: targetLiveness,  //range 0-1
			// Maybe whether the song is live or not?

			min_loudness: minLoudness,  //range 0-1
			max_loudness: maxLoudness,  //range 0-1
			target_loudness: targetLoudness,  //range 0-1
			// Maybe whether the song is live or not?

			min_mode: minMode,  //range 0-1
			max_mode: maxMode,  //range 0-1
			target_mode: targetMode,  //range 0-1
			// No idea what this means

			min_popularity: minPopularity,  //range 0-1
			max_popularity: maxPopularity,  //range 0-1
			target_popularity: targetPopularity,  //range 0-1
			// Maybe how popular the song is

			min_speechiness: minSpeechiness,  //range 0-1
			max_speechiness: maxSpeechiness,  //range 0-1
			target_speechiness: targetSpeechiness,  //range 0-1
			// Maybe how speechy the song is

			min_tempo: minTempo,
			max_tempo: maxTempo,
			target_tempo: targetTempo,

			min_time_signature: minTimeSignature,  //max value 11
			max_time_signature: maxTimeSignature,  //max value 11
			target_time_signature: targetTimeSignature,  //max value 11
			// seems strange to dictate a time signature with only one number

			min_valence: minValence,  //max value 1
			max_valence: maxValence,  //max value 1
			target_valence: targetValence,  //max value 1
			// how happy a song is

		};

		let url = new URL('https://api.spotify.com/v1/recommendations');

		let method = 'GET';

		return await executeSpotifyRequest(params, url, method);
	}

	async function searchAndDisplayResult() {
		let response = await spotifySearch(input);

		displaySearchResults(response);
	}

	function displaySearchResults(searchResults) {

		let artists = {};
		let albums = {};

		let albumResults = searchResults.results.albums.items;

		for (const album of albumResults) {
			albums[album.id] = album.name;

			for (const artist of album.artists) {
				artists[artist.id] = artist.name;
			}
		}

		let artistResults = searchResults.results.artists.items;

		for (const artist of artistResults) {
			artists[artist.id] = artist.name;
		}

		setAlbumResults(albums);
		setArtistResults(artists);

	}


	async function spotifySearch(artistSearchString) {

		let url = new URL('https://api.spotify.com/v1/search');
		// Add the parameters to the URL
		let params = {
			q : artistSearchString,
			type: "artist,album",
			market: "US",
			limit: 15
		}


		let method = 'GET';

		return await executeSpotifyRequest(params, url, method);

	}


	async function executeSpotifyRequest(params, url, method) {
		Object.keys(params).forEach(key => {
			if (params[key]) {
				url.searchParams.append(key, params[key])
			}
		});


		let spotifyAuth = new SpotifyAuth();

		let access_token = spotifyAuth.getToken();

		let headers = {'Authorization': 'Bearer ' + access_token};

		let response = {};

		await fetch(url, {
			method: method,
			headers: headers
		})
			.then(urlResponse => {
				if (!urlResponse.ok) {
					// Clone the response to read it twice
					const clonedResponse = urlResponse.clone();

					// Read the response body as text
					return clonedResponse.text().then(body => {
						throw new Error(`HTTP error! status: ${urlResponse.status}, body: ${body}`);
					});

				}
				return urlResponse.json();
			})
			.then(data => {
				// Use the data
				response.results = data;
			})
			.catch(error => {
				console.log('There was a problem with the fetch operation: ' + error.message);
				response.error = "Error: " + error.message;
			});

		return response;
	}


	return (
		<div>
			<button onClick={fetchData}>Fetch Data</button>

			<ul>
				{trackList.map((track, index) => {
					return <li key={index}><button onClick={() => setPlayerId(track.id)}>{track.name}</button></li>
				})}
			</ul>

			<input type="text" value={input} onChange={e => setInput(e.target.value)}/>
			<button onClick={searchAndDisplayResult}>Spotify Search</button>

			<ul>
				{Object.keys(albumResults).map((albumId, index) => (
					<li key={index}>{albumResults[albumId]} - {albumId}</li>
				))}
			</ul>

			<ul>
				{Object.keys(artistResults).map((artistId, index) => (
					<li key={index}>{artistResults[artistId]} - {artistId}</li>
				))}
			</ul>

			<div>
				<SpotifyPlayer trackId={playerId}/>
			</div>

		</div>
	);

}

export default ClientComponent;
