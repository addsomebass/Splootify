"use client";


export class SpotifyAuth {
	clientId = "c34637d8e75249bf9b7b965b5772260d";
	redirectUri = "http://localhost:3000/auth";
	// redirectUri = "https://s3.amazonaws.com/com.splootify/auth.html";
	tokenStoreKey = "spotifyTokenStore";


	constructor() {

	}

	isTokenStoreExpired(tokenStore) {
		if (!tokenStore.timestamp) {
			return true;
		}

		let oneHourAgo = Date.now() - (60 * 60 * 1000);
		return tokenStore.timestamp < oneHourAgo;
	}

	getToken() {
		let tokenStore = {};
		let item = localStorage.getItem(this.tokenStoreKey);
		if (item && (item !== "undefined")) {
			tokenStore = JSON.parse(item);
			if (!tokenStore.access_token) {
				tokenStore = undefined;
			}
		} else {
			tokenStore = undefined;
		}

		if (!tokenStore) {
			this.redirectToAuthCodeFlow(this.clientId);
			return;
		}

		if (this.isTokenStoreExpired(tokenStore)) {
			this.getRefreshToken(tokenStore.refresh_token);
		}

		tokenStore = JSON.parse(localStorage.getItem(this.tokenStoreKey));
		return tokenStore.access_token;

	}

	async redirectToAuthCodeFlow(clientId) {
		const verifier = this.generateCodeVerifier(128);
		const challenge = await this.generateCodeChallenge(verifier);

		// When redirecting to login page
		sessionStorage.setItem('preLoginURL', window.location.href);

		localStorage.setItem("verifier", verifier);

		const params = new URLSearchParams();
		params.append("client_id", this.clientId);
		params.append("response_type", "code");
		params.append("redirect_uri", this.redirectUri);
		params.append("scope", "user-read-private user-read-email");
		params.append("code_challenge_method", "S256");
		params.append("code_challenge", challenge);

		document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
	}

	generateCodeVerifier(length) {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	async generateCodeChallenge(codeVerifier) {
		const data = new TextEncoder().encode(codeVerifier);
		const digest = await window.crypto.subtle.digest('SHA-256', data);
		return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}

	async executeTokenRequest(url, params) {
		let tokenResponse = {};

		await fetch(url, {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: params
		}).then(response => {
			if (!response.ok) {
				// Clone the response to read it twice
				const clonedResponse = response.clone();

				// Read the response body as text
				return clonedResponse.text().then(body => {
					throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
				});

			}
			return response.json();
		}).then(data => {
			console.log(data)
			data.timestamp = Date.now();
			tokenResponse.tokenStore = data;
		}).catch(error => {
			tokenResponse.error = error;
		});

		return tokenResponse;
	}

	async getAccessToken(code) {
		const verifier = localStorage.getItem("verifier");

		const params = new URLSearchParams();
		params.append("client_id", this.clientId);
		params.append("grant_type", "authorization_code");
		params.append("code", code);

		params.append("redirect_uri", this.redirectUri);
		params.append("code_verifier", verifier);

		let url = "https://accounts.spotify.com/api/token";


		let tokenResponse = await this.executeTokenRequest(url, params);

		if (tokenResponse.error) {
			alert("Error while fetching tokenStore: " + tokenResponse.error);
		} else {
			localStorage.setItem(this.tokenStoreKey, JSON.stringify(tokenResponse.tokenStore))
		}
	}


	async getRefreshToken(refreshToken) {

		const params = new URLSearchParams();
		params.append("client_id", this.clientId);
		params.append("grant_type", "refresh_token");
		params.append("refresh_token", refreshToken);

		let url = "https://accounts.spotify.com/api/token";

		let tokenResponse = await this.executeTokenRequest(url, params);

		if (tokenResponse.error) {
			alert("Error while fetching tokenStore: " + tokenResponse.error);
		} else {
			localStorage.setItem(this.tokenStoreKey, JSON.stringify(tokenResponse.tokenStore))
		}
	}


}

