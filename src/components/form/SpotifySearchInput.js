import React from 'react';
import AsyncSelect from 'react-select/async';
import {SpotifyClient} from "@/components/client/SpotifyClient";

function SpotifySearchInput({setSelectedArtists}) {

	const spotifyClient = new SpotifyClient();
	const fieldId = "spofitySeachInput";


	function debouncePromise(func, delay) {
		let timer;
		let lastResolve, lastReject;

		return function(...args) {


			return new Promise((resolve, reject) => {

				clearTimeout(timer);

				lastResolve = resolve;
				lastReject = reject;

				timer = setTimeout(() => {
					try {
						const result = func.apply(this, args);
						lastResolve(result);
					} catch (error) {
						lastReject(error);
					}
				}, delay);
			});
		};
	}


	const fetchResults = debouncePromise((query) => {


		return searchSpotifyAndFormatResults(query);

	}, 500);


	async function searchSpotifyAndFormatResults(inputValue) {

		if (!inputValue) {
			return [];
		}

		try {
			let response = await spotifyClient.spotifySearch(inputValue);

			let inputOptions = formatSearchResults(response);

			return inputOptions

		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	}


	function formatSearchResults(searchResults) {

		let trackResults = searchResults.results.tracks.items;


		let artistResults = searchResults.results.artists.items;


		let artistLabels = artistResults.map((artist) => {
			return {
				value: {
					id: artist.id,
					type: 'artist'
				},
				label: artist.name
			}
		});

		let trackLabels = trackResults.map((track) => {
			let label = track.name + ' - ' + track.artists[0].name;
			return {
				value: {
					id: track.id,
					type: 'track'
				},
				label: label
			}
		})

		return [
			{
				label: 'Artists',
				options: artistLabels,
			},
			{
				label: 'Tracks',
				options: trackLabels,
			},
		]

	}

	const handleChange = (selected) => {
		// Check if the selected options are more than previously selected

		setSelectedArtists(selected);
	}


	const groupStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	};
	const groupBadgeStyles = {
		backgroundColor: '#EBECF0',
		borderRadius: '2em',
		color: '#172B4D',
		display: 'inline-block',
		fontSize: 12,
		fontWeight: 'normal',
		lineHeight: '1',
		minWidth: 1,
		padding: '0.16666666666667em 0.5em',
		textAlign: 'center',
	};

	const formatGroupLabel = (data) => (
		<div style={groupStyles}>
			<span>{data.label}</span>
			<span style={groupBadgeStyles}>{data.options.length}</span>
		</div>
	);



	return (
		<div>
			<label id={fieldId}>Search Artists and Tracks</label>
			<AsyncSelect
				loadOptions={fetchResults}
				defaultOptions
				aria-labelledby={fieldId}
				placeholder={'Type to search Spotify...'}
				isMulti
				onChange={handleChange}
				formatGroupLabel={formatGroupLabel}
			/>
		</div>

	);
}

export default SpotifySearchInput;