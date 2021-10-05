let accessToken;
const clientId = 'myClientId'; 
const redirectURI = 'https://projectjamming.surge.sh/';

export const Spotify = {

search(term) {
    const accessToken  = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, 
        { headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(response => {
           return response.json();
    })
    .then(jsonResponse => {
        if (!jsonResponse.tracks) {
            console.log('there are no tracks');
            return [];
        } 
        console.log(jsonResponse)
        return jsonResponse.tracks.items.map(track => ({
            id: track.id, 
            name: track.name, 
            artist: track.artists[0].name, 
            album: track.album.name, 
            uri: track.uri,
            imgSrc: track.album.images[2].url
        }));
    });
},

savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
        return
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {'Authorization': 'Bearer '+ accessToken};
    let userId;
    return fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
        userId = jsonResponse.id;
        const url = `https://api.spotify.com/v1/users/${userId}/playlists`
        return fetch(url, 
            {method: 'POST', 
            headers: headers,
            body: JSON.stringify({name: name})
         });

    })
    .then(response =>  response.json())
    .then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
        {method: 'POST',
        headers: {Authorization: 'Bearer '+ accessToken,
                   'Content-Type': 'application/json' },
        body: JSON.stringify({uris: trackURIs})}
        );
    });
   
    
},

getAccessToken() {
    
    if(accessToken) {
        return accessToken;
    } 

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {

        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);

        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');

        return  accessToken;

    }    else { 
            window.location =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }

}
}
