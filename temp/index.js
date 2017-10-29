// Test function to retrieve json
// use the fetch function to make ajax request
// https://rallycoding.herokuapp.com/api/music_albums

// ES 2015 method, using fetch & promises
// function fetchAlbums() {
// 	'use strict';
// 	fetch('https://rallycoding.herokuapp.com/api/music_albums').then(res =>
// 		res.json()
// 	).then(json => console.log(json));
// }

// ES 2017 method, using async/await
// async function fetchAlbums() {
//     'use strict';
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//     const json = await res.json();
//
//     console.log(json);
// }

// Can be written as fat arrow function
const fetchAlbums = async () => {
    'use strict';
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();

    console.log(json);
}

fetchAlbums();