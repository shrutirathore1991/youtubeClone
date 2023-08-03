const apiKey = "AIzaSyAcFdYIanOlgSO6zECZvZdtLaA7SF5JzbU" ;
const baseUrl = "https://www.googleapis.com/youtube/v3";

// async function fetchChannelDetails(channelId = "UCwlt7XMFAYUkqw84XPhZxUg"){
//     let url = `${baseUrl}/channels?key=${apiKey}&part=snippet,statistics&id=${channelId}`
//     const response = await fetch(url);
//     const result = await response.json();
//     return result ;
// }

// async function fetchVideoDetails(videoId = "28ewOqp-5ds") {
//     let url = `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;

//     const response = await fetch(url, {method: "GET"}); 
//     const videoInfo = await response.json();
//     const channelDetails = await fetchChannelDetails(videoInfo.items[0].snippet.channelId);
//     addDetailsOntoDOM(videoInfo, channelDetails)
//     console.log(channelDetails);
// }

// function addDetailsOntoDOM(videoInfo, channelDetails) {
  
//    const container = document.createElement("div");
//    container.id = "container"; 

//    container.innerHTML = `
//    <div id="video">

//    </div>
//    <p>${videoInfo.items[0].snippet.title}</p>
//    <div class="statistics">
//        <div class="left">
//            ${videoInfo.items[0].statistics.viewCount} views.
//        </div>
//        <div class="right">
//            <div>
//                <span class="material-icons">
//                    thumb_up
//                </span>
//                <span>${videoInfo.items[0].statistics.likeCount}</span>
//            </div>
//            <div>
//                <span class="material-icons">
//                    thumb_down
//                </span>
//                <span>${"NA"}</span>
//            </div>
//        </div>
//    </div>
//    <div class="channel-container">
//        <div class="left">
//            <img src="${channelDetails.items[0].snippet.thumbnails.high.url}" alt="">
//            <div>
//                <span>${channelDetails.items[0].snippet.title}</span>
//                <span style="color: #AAA">${channelDetails.items[0].statistics.subscriberCount} subscribers</span>
//            </div>
//        </div>
//        <button class="right">Subscribe</button>
//    </div>
//    `

//    document.body.appendChild(container)
// }

// fetchVideoDetails();

let data = JSON.parse(localStorage.getItem("video_details"));
var comments = data.videoId;
async function comment() {
  // let data = JSON.parse(localStorage.getItem("video_details"));

  let res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&videoId=${comments}&key=${apiKey}`
  );
  let datas = await res.json();
  let com = datas.items;
  appendComments(com);
  // console.log(com);
}
comment();

function appendComments(data) {
  let container = document.querySelector("#comments");
  container.innerHTML = null;

  data.forEach(({ snippet }) => {
    let image = snippet.topLevelComment.snippet.authorProfileImageUrl;
    let comments = snippet.topLevelComment.snippet.textDisplay;
    let div = document.createElement("div");
    div.setAttribute("id", "commentdiv");
    let div1 = document.createElement("div");
    div1.setAttribute("id", "reply");
    let img = document.createElement("img");
    img.src = image;
    let p = document.createElement("p");
    p.innerHTML = comments;

    //console.log(snippet);
    div.append(img, p);
    container.append(div);
  });
}


function playVideo(data)
{
    let contain = document.getElementById("play");

    let iframe = document.createElement("iframe");

    iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=0&mute=1`;

    iframe.height = "100%";
    iframe.width = "100%";
    iframe.setAttribute = ("allowfullscreen", true);
    contain.append(iframe);
    let title = document.createElement("h2");
  title.innerHTML = data.snippet.title;
  detail.append(title);
}

playVideo(data);