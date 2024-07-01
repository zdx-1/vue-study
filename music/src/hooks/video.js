/** 
 * @param {element} video 
 * @param {number} currentTime
 * @return {void}
 */

import { ref } from 'vue'
const videoDuration = ref()
const videoCurrentTime = ref()
const cutCover = (video, currentTime) => {
  video.currentTime = currentTime;
  const canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = parseInt(this.width);
  canvas.height = parseInt(this.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const img = canvas.toDataURL("image/png");
  return img;
}

const init = ()=> {
  const videoContentShow = document.getElementById(
      this.uid + "-video"
  );
  videoContentShow.style.height = this.height;
  videoContentShow.style.width = this.width;
  const videoContent = videoContentShow.cloneNode();
  videoContent.addEventListener("canplay", () => {
      if (videoCurrentTime.value < videoDuration.value) this.cut(videoContent);
      else this.progressValue = 0;
  });
}
const cut = (video) => {
  const duration = video.duration;
  videoDuration.value = duration;
  videoCurrentTime.value += duration / this.stepNums;
  const img = this.cutCover(video, videoCurrentTime.value);
  this.imgList.push(img);
  if (this.imgList.length == 2) {
      this.coverSrc = img;
      const coverImg = document.getElementById(
          this.uid + "-coverImg"
      );
      coverImg.setAttribute("src", img);
  }
}
