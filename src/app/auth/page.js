"use client";

import React, {useEffect} from "react";
import {SpotifyAuth} from "@/components/auth/SpotifyAuth";

function SpotifyAuthComponent(props) {

	useEffect(() => {
		var params = new URLSearchParams(window.location.search);
		const code = params.get("code");

		let spotifyAuth = new SpotifyAuth();


		let tokenStore = {};

		if (!code) {
			spotifyAuth.redirectToAuthCodeFlow(clientId);
		} else {
			(async () => {
				await spotifyAuth.getAccessToken(code);

				let preLoginURL = sessionStorage.getItem('preLoginURL');
				if (preLoginURL) {
					window.location.href = preLoginURL;
					sessionStorage.removeItem('preLoginURL'); // Clear from session
				}

			})();
		}

	}, []);


	return <div>You should not be here <i>Sean</i></div>
}


export default SpotifyAuthComponent;