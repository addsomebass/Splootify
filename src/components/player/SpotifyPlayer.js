import React from 'react';

const SpotifyPlayer = ({ trackId }) => {

	return (
		<div>
			<div
				dangerouslySetInnerHTML={{
					__html: `<iframe style="border-radius:12px" 
							src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator" 
							width="100%" height="352" 
							frameBorder="0" 
							allowfullscreen="" 
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
							loading="lazy"></iframe>`,
				}}
			/>
		</div>
	);
};

export default SpotifyPlayer;
