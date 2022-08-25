const qualityArray = ["full", "large", "tall", "medium", "small", "thumb", "thumb_small", "thumb_tiny"]
let lastId = null;

function GetBestRepresentations(r) {
    for (const i in qualityArray) {
        let key = qualityArray[i];
        if (r.hasOwnProperty(key)) {
            return r[key]
        }
    }
    return null;
}

function beginDerp() {
    fetch("https://derpibooru.org/api/v1/json/images/featured")
        .then(
            (e) => {
                e.json().then((json) => {
                    if (json.image == null) {
                        console.error("Invalid Json")
                        return;
                    }
                    if (lastId == json.image.id) {
                        console.log("No Need to reload");
                        return;
                    }

                    let imgElement = document.getElementById("image");
                    let videoElement = document.getElementById("video");

                    if (json.image.mime_type.includes("image") && imgElement !== null) {
                        imgElement.src = GetBestRepresentations(json.image.representations);
                        imgElement.style.display = "block";
                    } else if (videoElement !== null && json.image.mime_type.includes("video")) {
                        videoElement.src = GetBestRepresentations(json.image.representations);
                        videoElement.style.display = "block";
                        videoElement.play().catch(() => {
                            console.error("Play() failed.");
                        })
                    } else {

                    }

                    let postInfo = document.getElementById("post-text");
                    if (postInfo !== null) {
                        postInfo.textContent = `by ${json.image.uploader}`;
                    }

                    lastId = json.image.id;
                });
            })
        .catch((ex) => {
            let postInfo = document.getElementById("post-text");
            if (postInfo !== null) {
                postInfo.textContent = ex;
            }
        });
    
    setTimeout(beginDerp, 60*1000);
}

beginDerp();