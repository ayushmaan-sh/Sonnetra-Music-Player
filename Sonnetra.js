let currentSong = new Audio()

function secondsToMinutesAndSeconds(seconds) {
    // Ensure the input is a valid number
    if (isNaN(seconds) || seconds < 0) {
      return "Invalid input";
    }
  
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    // Format the result as "00:00"
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

//function getting songs
async function getSongs(){
    //fetching song lists
    let fetch_songs = await fetch("http://127.0.0.1:5500/songs/")
    let response = await fetch_songs.text();

    //taking them into a separate element
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    //an array to store songs data
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playMusic = (track, pause=false)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    if(!pause){
        currentSong.play()
        play.src = "pause.svg" //when the song is playing, show pause button/icon to pause the song
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(track)      //name of the song
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00" //timer

}

async function main(){

    //get the lists of all the songs
    let songs = await getSongs()
    playMusic(songs[0], true)

    //show all the songs in the playlists
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img src="music-icon.svg" class="invert" alt="">
                            <div class="info">
                                <div class="">${song.replaceAll("%20", " ")}</div>
                            </div>
                            <div class="playnow">
                                <img src="play.svg" class="invert" alt="">
                            </div></li>`
    }

    //attach an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })

    //Attach an event listener to play, next and previous

    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    //song time updation

    currentSong.addEventListener("timeupdate", ()=>{
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)}/${secondsToMinutesAndSeconds(currentSong.duration)}`
        // document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)*100 + "%";
    })

    // event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })

    // event listener for close button
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-120%"
    })
}

main()