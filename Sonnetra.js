console.log("Let's write javascript")

async function getSongs(){
    let songLists = await fetch("http://127.0.0.1:5500/songs/");
    let response = await songLists.text();
    console.log(response)

    let div = document.createElement("div");
    div.innerHTML = response;

    // getting links of songs
    let as = div.getElementsByTagName("a")
    console.log(as)

    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href)
        }
    }
    return songs
}

async function main(){
    let songs = await getSongs()
    console.log(songs)

    //play the first song
    var audio = new Audio(songs[4])
    audio.play()
}

main()
