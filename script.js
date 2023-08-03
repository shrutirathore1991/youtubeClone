const apiKey="AIzaSyAcFdYIanOlgSO6zECZvZdtLaA7SF5JzbU";
const baseUrl = "https://www.googleapis.com/youtube/v3";

// searchString is the value typed by user in the input box.


const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("#container");
// accessing search button


searchButton.addEventListener("click" , () =>
{
    
    let searchString = searchInput.value.trim();
    // console.log(searchString);
    if(searchString === "")
    {
        return;
    }
   search(searchString); 
});

async function search(searchString)
{
    // make call to search api , send apikey and string to be seacrched.
let url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=32`;

const response = await fetch(url , {method : "GET"});
const result = await response.json();
append(result.items);
//  addDataOntoUI(result.items);
//  

} 

// function addDataOntoUI(videosList)
// {

//     videosList.forEach(video => {
//         const {snippet} = video;
//         // const snippet = video.snippet; same lines 39 and 40

//         const videoElement = document.createElement("div");
//         videoElement.className = "video";

//         videoElement.innerHTML =
//         `
//         <img src= "${snippet.thumbnails.high.url}">
//             <p>${snippet.title}</p>
//            <b>${snippet.channelTitle}</b>
//            <b>${snippet.publishTime}</b>
//         `;

//         let data = {
//             snippet,
//             videoId,
//           };
//           div.addEventListener("click", function () {
//             localStorage.setItem("video_details", JSON.stringify(data));
//             window.location.href = "videoDetails.html"
//           });
      

//         container.appendChild(videoElement)

//     })
// }
let id;
window.debounce = (func, delay) => {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(() => {
    func();
  }, delay);
};

async function mostPopular(){

  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=50&chart=trending&regionCode=IN`;

    const res = await fetch(url);
    let data = await res.json();
    console.log(data)
    append(data.items)

}

mostPopular();

function append(data) {
    // let container = document.getElementById("container");
    let container = document.querySelector("#container");
    container.innerHTML = null;
    data.forEach(({ snippet, id: { videoId } }) => {
      
      let title = snippet.title;
      let image = snippet.thumbnails.high.url;
      let channelName = snippet.channelTitle;
      
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.src = image;
      let channel = document.createElement("p");
      channel.innerText = channelName;
      channel.style.fontSize = "smaller";
      let name = document.createElement("h4");
      name.innerText = title;
  
      let data = {
        snippet,
        videoId,
      };
      div.addEventListener("click", function () {
        localStorage.setItem("video_details", JSON.stringify(data));
        window.location.href = "videoDetails.html"
      });
  
      div.append(img, name, channel);
      container.appendChild(div);
    });
  }