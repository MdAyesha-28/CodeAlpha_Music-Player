const songs = [
  {
    title: "Pulse of the Night",
    artist: "Zayn Nova",
    src: "songs/song1.mp3"
  },
  {
    title: "Electric Skies",
    artist: "Kairo Flux",
    src: "songs/song2.mp3"
  },
  {
    title: "Afterglow",
    artist: "Vexa Moon",
    src: "songs/song3.mp3"
  }
];

const audio = document.getElementById("audio");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

let songIndex = 0;

/* Load song */
function loadSong(index) {
  const song = songs[index];
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  audio.src = song.src;
  audio.load(); // 🔥 VERY IMPORTANT
  updatePlaylist();
}

loadSong(songIndex);

/* Play / Pause */
function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/* Update play button */
audio.addEventListener("play", () => {
  playBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "▶️";
});

/* Next */
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
}

/* Previous */
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
}

/* Progress bar */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

/* Click progress */
function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

/* Volume */
function setVolume(value) {
  audio.volume = value;
}

/* Format time */
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

/* Playlist */
playlist.innerHTML = "";
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    songIndex = index;
    loadSong(songIndex);
    audio.play();
  };
  playlist.appendChild(li);
});

function updatePlaylist() {
  [...playlist.children].forEach((li, i) => {
    li.classList.toggle("active", i === songIndex);
  });
}

/* Autoplay */
audio.addEventListener("ended", nextSong);
