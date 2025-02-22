const playlists = {
    "Bollywood": [
   { title:"dil-me-chupi", file: "hindi/dil-me-chupi-old-bollywood-pop-music-2009-206524.mp3"},
   
{ title: "dreaming-indian-pop-music", file: "hindi/dreaming-indian-pop-music-265731.mp3" },
{ title: "kaise-bhula-dun", file: "hindi/kaise-bhula-dun-ashir-acoustic-hindi-new-sad-song-250585.mp3" },
{ title: "tasvir", file: "hindi/tasvir-old-bollywood-pop-music-2009-206522.mp3" },
{ title: "tere-sang-with-you", file: "hindi/tere-sang-with-you-207644.mp3" },
{ title: "romantic", file: "Songs/romantic-240213.mp3" },


    ],
    "Pop": [
         { title: "alone", file: "Songs/alone-29634.mp3" },
         { title: "chant", file: "Songs/chant-268684.mp3" },
         { title: "freesilla-x-karma030", file: "Songs/freesilla-x-karma030-type-beat-kugelsicher-by-tremoxbeatz-302838.mp3" },
         { title: "indian-bollywood-hindi-song", file: "Songs/indian-bollywood-hindi-song-background-music-294105.mp3" },
          
         { title: "spinning-head", file: "Songs/spinning-head-271171.mp3" },

         { title: "vlog-music-beat", file: "Songs/vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290.mp3" }
    ],
    "Bhojpuri": [
       
    ],

    "English": [
    { title: "neki-ki-raftar", file: "Songs/neki-ki-raftar-inspirational-pop-207646.mp3" },
        
    ],

    "itam-Songs": [
        { title: "Romantic", file: "Songs/tere-sang-with-you-207644.mp3" },
        { title: "Spinning", file: "Songs/neki-ki-raftar-inspirational-pop-207646.mp3" }
    ],

    "Ring-tons": [
        { title: "Romantic", file: "Songs/tere-sang-with-you-207644.mp3" },
        { title: "Spinning", file: "Songs/neki-ki-raftar-inspirational-pop-207646.mp3" }
    ]

};

const playlistSelector = document.getElementById("playlistSelector");
const songList = document.getElementById("songList");
const audio = document.getElementById("audio");
const prevBtn = document.getElementById("prevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPlaylist = "Bollywood";
let currentSongIndex = 0;

function loadPlaylists() {
    for (let playlist in playlists) {
        let option = document.createElement("option");
        option.value = playlist;
        option.textContent = playlist;
        playlistSelector.appendChild(option);
    }
    loadSongs(currentPlaylist);
}

function loadSongs(playlistName) {
    currentPlaylist = playlistName;
    songList.innerHTML = "";
    playlists[playlistName].forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${song.title}`;
        li.addEventListener("click", () => {
            playSong(index);
        });
        songList.appendChild(li);
    });
    playSong(0); // Load first song on playlist change
}

function playSong(index) {
    currentSongIndex = index;
    audio.src = playlists[currentPlaylist][index].file;
    audio.load();
    audio.play();
    playPauseBtn.textContent = "⏸";
}

playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
    playSong(currentSongIndex);
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % playlists[currentPlaylist].length;
    playSong(currentSongIndex);
});

playlistSelector.addEventListener("change", () => loadSongs(playlistSelector.value));
audio.addEventListener("ended", () => nextBtn.click());
loadPlaylists();

// 🎶 Audio Visualizer 🎶
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 64;

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dataArray.forEach((value, i) => {
        const barHeight = value / 2;
        ctx.fillStyle = `rgb(${value}, ${255 - value}, 150)`;
        ctx.fillRect(i * 10, canvas.height - barHeight, 8, barHeight);
    });

  

}
drawVisualizer();