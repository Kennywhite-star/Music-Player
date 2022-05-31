let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');


let playPause_Btn = document.querySelector('.playpause-track');
let next_Btn = document.querySelector('.next-track');
let prev_Btn = document.querySelector('.prev-track');

let seek_slider=document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

let wave = document.getElementById('wave')
let randomIcon  = document.querySelector('.fa-random')
let curr_track = document.createElement('audio')

//create a gobaly used value
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

//create the audio elemeent for the payer
let  curr_task = document.createElement ('audio');



const music_list = [
    {
        img: 'images/music 1.jpg',
        name: 'white-flag' ,
        artist: 'Dido',
        music: 'music/music 1.mp3'
    },
    {
        name: 'Begin-Again' ,
        artist: 'Taylor Swift',
        img: 'images/music 2.png',
        music: 'music/music 2.mp3'
    },
    {
        name: 'Westlife' ,
        artist: 'Westlife',
        img: 'images/music 3.jpg',
        music: 'music/music 3.mp3'
    },
    {
        name: 'Let Her Go' ,
        artist: 'Enrique',
        img: 'images/music 4.jpg',
        music: 'music/music 4.mp3'
    },
    {
        name: 'Like I never Left' ,
        artist: 'Whitney',
        img: 'images/music 5.jpg',
        music: 'music/music 5.mp3'
    },
    {
        name: 'you are beautiful' ,
        artist: 'James Blunt',
        img: 'images/music 6.jpg',
        music: 'music/music 6.mp3'
    },
    {
        name: 'Hero' ,
        artist: 'Enrique',
        img: 'images/music 7.jpg',
        music: 'music/music 7.mp3'
    },
    {
        name: 'Ocean Drive' ,
        artist: 'light house',
        img: 'images/music 8.jpg',
        music: 'music/music_8.mp3'
    },
    {
        name: 'Lifted' ,
        artist: 'light house',
        img: 'images/music 9.jpg',
        music: 'music/music 9.mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    //clear the previous seek timer
    clearInterval(updateTimer);
    reset();
    //load a new track
    curr_track.src = music_list[track_index].music;
    curr_track.load();
    //update the details of the track
    track_art.style.backgroundImage = 'url(' + music_list[track_index].img + ')';
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent  = music_list[track_index].artist;
    now_playing.textContent = 'playing music' + (track_index + 1) + 'of' + music_list.length;

    //set Interval of 1000 milliseconds
    //for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000)
    
    //move to the next track if the current finishes plaaying
    //use the 'ended event'
    curr_time.addEventListener('ended', nextTrack);
    //apply a random background color
    random_bg_color();

}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}

   //function to reset all value to their default
    function reset(){
    curr_time.textContent = '00:00'
    total_duration.textContent = '00:00'
    seek_slider.value = 0;
}




function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true
    randomIcon.classList.add('randomActive')
}

function pauseRandom(){
    isRandom = false
    randomIcon.classList.remove('randomActive')
}

function repeatTrack(){
   let current_index = track_index;
   loadTrack(current_index);
   playTrack();
}

function playpauseTrack(){
    //switch between playing and pausing
    //depending on the current state
    if(!isPlaying) playTrack();
    else pauseTrack();
}

function  playTrack(){
    //play the loaded track
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('Loader')
    //repace icon with the pause icon
    playPause_Btn.innerHTML = '<i class= "fas fa-pause-circle fa-3x"></i> '
}


function  pauseTrack(){
    //pause the loaded track
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('Loader')

    //replace icon with the play icon
    playPause_Btn.innerHTML =  '<i class= "fas fa-play-circle fa-3x"></i> '
}

function nextTrack(){
    // Go back to the first track if the
  // current one is the last in the track list
    if (track_index < music_list.length - 1)
    track_index += 1;
    else track_index = 0;

     // Load and play the new track
    loadTrack(track_index);
    playTrack();
   }
 
   
function prevTrack(){
    //go back to the last track if the
    //current one is the first in track list
    if(track_index > 0){
        track_index -=1;
    } else{
        track_index = music_list.length -1;
    }
    //load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    //calculate the seek position by the
    //percentage of the seek sider
    //and get the relativr duration to the track

    let seekto = curr_track.duration * (seek_slider.value /100);

    //set the current track position to the calcuated seek position
    curr_track.currentTime = seekto;
}

function setVolume(){
    //set the voume according to the 
    //percentage of the volume of slider set
    curr_track.volume = volume_slider.value/100;

}

function seekUpdate(){
    let seekPosition = 0;

    //check if the curre nt track duration is a legible number
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 /  curr_track.duration)
        seek_slider.value = seekPosition;

        //calcualte the time left and total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60)
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

            // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
     } 
    
}

// Load the first track in the tracklist
loadTrack(track_index);



