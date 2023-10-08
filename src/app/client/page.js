"use client";

import React, {useEffect, useState} from "react";
import SpotifyPlayer from "@/components/player/SpotifyPlayer";
import MultiSelectInput from "@/components/form/MultiSelectInput";
import {SpotifyClient} from "@/components/client/SpotifyClient";

function ClientComponent() {

	const [input, setInput] = useState('');
	const [trackList, setTrackList] = useState([]);
	const [albumResults, setAlbumResults] = useState([]);
	const [artistResults, setArtistResults] = useState([]);
	const [playerId, setPlayerId] = useState('');
	const [selectedArtists, setSelectedArtists] = useState([]);
	const [allOptions, setAllOptions] = useState([])

	/*const allOptions = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	]*/

	const client = new SpotifyClient();


	let genres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"]


	// function setPlayerId(myString) {
	// 	console.log(myString);
	// }

	async function fetchData() {


		console.log("clicked");

		let recommendations = await client.getRecommendations(10, '4tZwfgrHOc3mvqYlEYSvVi', "electronic", null,
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



	async function searchAndDisplayResult() {
		let response = await client.spotifySearch(input);

		displaySearchResults(response);
	}

	function displaySearchResults(searchResults) {

		let artists = {};
		let albums = {};

		let albumResults = searchResults.results.albums.items;



		let artistResults = searchResults.results.artists.items;

		for (const artist of artistResults) {
			artists[artist.id] = artist.name;
		}

		setAlbumResults(albums);
		setArtistResults(artists);

		let artistLabels = artistResults.map( (artist) => {
			return {
				value: artist.id,
				label: artist.name
			}
		});

		let albumLabels = albumResults.map( (album) => {
			return {
				value: album.id,
				label: album.name
			}
		})

		artistLabels.concat(albumLabels);



		setAllOptions(artistLabels);

	}


	useEffect(() => {


	}, []); // Note the empty dependency array


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

			<MultiSelectInput selectedOptions={selectedArtists}
							  setSelectedOptions={setSelectedArtists}
							  allOptions={allOptions}
			/>

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
