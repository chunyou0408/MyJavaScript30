const video = document.querySelector('video');
const toggle = document.querySelector('.toggle');

const volume = document.querySelector('.player__slider[name="volume"]');
const playbackRate = document.querySelector('.player__slider[name="playbackRate"]');


const progress = document.querySelector('.progress');
const progress__filled = document.querySelector('.progress__filled');

const skip_back = document.querySelector('.player__button[data-skip="-10"]');
const skip_forward = document.querySelector('.player__button[data-skip="25"]');

video.addEventListener('timeupdate', Progresshandler);

video.addEventListener('click',videoPlayHandler);
toggle.addEventListener('click',videoPlayHandler);

video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);


let mousedown = false;

//當進度條被點時,單點時,移動時且滑鼠需要是點著的狀態 的動作
progress.addEventListener('click',playTimeHandler);
progress.addEventListener('mousemove',(e)=>mousedown && playTimeHandler(e));
progress.addEventListener('mousedown',()=>mousedown = true);
progress.addEventListener('mouseup',()=>mousedown = false);


//切換進度
function playTimeHandler(e){
    const playTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = playTime;
}

//播放時顯示進度
function Progresshandler(){
    const percent = (video.currentTime / video.duration) * 100;
    progress__filled.style.flexBasis = `${percent}%`;
}

//控制音量
volume.addEventListener('mousemove',volumeHandler);
function volumeHandler(){
    video.volume = volume.value;
}

//控制進度按鈕(往前,往後按鈕)
skip_back.addEventListener('click',()=>{
    video.currentTime = video.currentTime + parseInt(skip_back.dataset.skip);
});
skip_forward.addEventListener('click',()=>{
    video.currentTime = video.currentTime + parseInt(skip_forward.dataset.skip);
});

//控制播放速度
playbackRate.addEventListener('mousemove',playbackRateHandler);
function playbackRateHandler(){
    video.playbackRate = playbackRate.value;
}


//播放,停止影片
function videoPlayHandler(){

    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause();
    // }

    video.paused ? video.play() : video.pause();
}

//播放,停止影片的時候按鈕更新
function updateBtn(){

    // if(video.paused){
    //     toggle.innerHTML='►';
    // }else{
    //     toggle.innerHTML='❚ ❚';
    // }

    icon = video.paused?'►':'❚ ❚';
    toggle.textContent=icon;

}