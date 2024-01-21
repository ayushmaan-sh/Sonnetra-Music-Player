//function for getting songs and there information

async function getSongs(){
    //taking audios data
    let songLists = await fetch("http://127.0.0.1:5500/songs/"); 
    let response = await songLists.text();
    console.log(response)

    // getting links of songs
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    console.log(as)

    //while getting the links of songs, we also get some other links in the data but we want only mp3 files
    //for that reason, we sort it them by using .endsWith(".mp3")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

// function for performing operations on playing songs

async function playSong(){
    let songs = await getSongs()
    console.log(songs)

    // showing up the song names in the library section through ul tag,
    // for of loop used for showing up the array's data, which are name of the songs
    
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </song>`
    }

    //play the song
    var audio = new Audio(songs[3])
    audio.play()

    audio.addEventListener("loadeddata", ()=>{
        let duration = audio.duration;
        console.log(duration)
    })
}

playSong()
