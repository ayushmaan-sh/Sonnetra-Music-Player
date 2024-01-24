async function getSongs(){
    //fetching song lists
    let fetch_songs = await fetch("http://127.0.0.1:5500/songs/")
    let response = await fetch_songs.text();

    //taking them into a separate element
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    //an array to store songs
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

async function main(){
    //get the lists of all the songs
    let songs = await getSongs()
    console.log(songs)

    //show all the songs in the playlists
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img src="music-icon.svg" class="invert" alt="">
                            <div class="info">
                                <div class="">${song.replaceAll("%20", " ")}</div>
                                <div class=""></div>
                            </div>
                            <div class="playnow">
                                <img src="play.svg" class="invert" alt="">
                            </div></li>`
    }
}

main()