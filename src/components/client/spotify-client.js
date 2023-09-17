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

	let access_token = 'BQCvuO0dkWTlkmZl-VI3HL_B3Q-6h-0SSic8_1xcyR3QZyVW0ESDxHtEyhnPwMDoIelB9LUKn5JQS9khooEzMAxWfgBrSlx1I4DgRQrjxLVaSYPBsU5iePA8NSpHb6UAsslKt5JFvGk8Jz--UncMqqYUGlHOWWWUL9J8fXgNackJrHhR8ZfHKvojBU4e0HPnW4M8LW3c_MH5Yx5j8RpVxg';

	// Define the URL and parameters

	let params = {
		limit: limit,
		//The target size of the list of recommended tracks

		market: 'US',

		seed_artists: seedArtists,
		//A comma separated list of Spotify IDs for seed artists.
		//Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
		//Note: only required if seed_genres and seed_tracks are not set.

		seed_genres: seedGenres,
		// A comma separated list of any genres in the set of available genre seeds.
		// Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
		// Note: only required if seed_artists and seed_tracks are not set.

		seed_tracks: seedTracks,
		// A comma separated list of Spotify IDs for a seed track.
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
		// how pumped you are going to get

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
	// Add the parameters to the URL
	Object.keys(params).forEach(key => {
		if (params[key]) {
			url.searchParams.append(key, params[key])
		}
	});


	let recommendations;
	let error;

	await fetch(url, {
		method: 'GET',
		headers: {'Authorization': 'Bearer ' + access_token}
	})
		.then(response => {
			if (!response.ok) {
				// Clone the response to read it twice
				const clonedResponse = response.clone();

				// Read the response body as text
				return clonedResponse.text().then(body => {
					throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
				});

			}
			return response.json();
		})
		.then(data => {
			// Use the data
			recommendations = data;
		})
		.catch(error => {
			console.log('There was a problem with the fetch operation: ' + error.message);
			error = "Error: " + error.message;
		});

	return {
		results: recommendations,
		error: error
	}
}

function convertToHref(recommendations) {

	let links = [];

	for (const track of recommendations.results.tracks) {
		links.push(`<a href="${track.external_urls.spotify}">${track.name}</a><br>`)
	}

	return links.join('\n');

}





window.onload = async function () {

	let recommendationsResults = await getRecommendations(10, null, 'classical,country', null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null,
		null, null,null
		);

	console.log(recommendationsResults); // Outputs: 3



	// You can also display the result on your HTML page
	document.body.innerHTML += `<p>${convertToHref(recommendationsResults)}</p>`;
};