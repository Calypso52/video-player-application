// check cookie whether attribute 'autoplay' should be added to DOM 'voice' label
document.addEventListener('DOMContentLoaded',function(){
    function getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length)
            }
        }
        return "";
    }
    if(getCookie('autoPlay').length) {
        let autoPlay = document.createAttribute('autoplay');
        video.setAttributeNode(autoPlay);
    }
});

window.onload = function() {
    // ***************** base functions *****************
    function $(id) {
        return document.getElementById(id)
    };
    // get element style function
    function getStyle(obj, attr) {
        let css = obj.currentStyle || getComputedStyle(obj, null);
        return css[attr]
    }

    // ***************** basic objects *****************
    let video = $('video');
    let voice = $('voice');
    let duration = video.duration;
    
    // video states
    let videoPlaying = false;
    let videoPaused = true;
    let videoEnd = false;
    video.onplay = function() {
        videoPlaying = true;
        videoPaused = false;
        videoEnd = false;
    }
    video.onpause = function() {
        videoPaused = true;
        videoPlaying = false;
        videoEnd = false;
    }
    video.onended = function() {
        videoPlaying = false;
        videoPaused = false;
        videoEnd = true;
        // auto show when it ends
        $('console').innerHTML = 'ended';
    }

    // ***************** default settings *****************
    // button used to reopen the sound when press setAutoplay button
    let voiceWrap = $('voiceWrap');
    voice.addEventListener('click', restoreVoice, false);
    function restoreVoice() {
        video.muted = false;
        voiceWrap.classList.add('notMuted');
    }
    let outerWrap = $('outerWrap');
    outerWrap.style.width = getStyle(video, 'width');

    // moving function of the progress bar
    let bar = $('bar');
    let timer = null;
    timer = setInterval(run, 10);
    function run() {
        let currentTime = video.currentTime;
        bar.style.width = currentTime / duration * 100 + '%';
    }

    // progress bar clicking to jump
    let progress = $('progress');
    progress.addEventListener('click', progress_click, false);
    function progress_click(ev) {
        // x position of the click
        let x_position = ev.clientX;
        // distance to the left border of the browser of the process bar
        let left_distance = progress.offsetLeft;
        // length of the progressed bar
        let bwidth = x_position - left_distance;
        // total length of the progress bar
        let pwidth = parseInt(getStyle(progress, 'width'));
        // transfer to percent
        bar.style.width = bwidth / pwidth * 100 + '%';
        // set jumping point
        video.currentTime = duration * (bwidth / pwidth);
    }
    
    // ***************** button functions *****************
    // load
    let load = $('load');
    load.addEventListener('click', load_click, false);
    function load_click() {
        let loadUrl = prompt("Please input video url:");
        document.getElementById("video").src = loadUrl;
    };

    // play
    let play = $('play');
    play.addEventListener('click', play_click, false);
    function play_click() {
        video.muted = false
        if(!videoPlaying) {
            $('console').innerHTML = '';
        }
        video.play();
        timer = setInterval(run, 10);
    };

    // pause
    let pause = $('pause');
    pause.addEventListener('click', pause_click, false);
    function pause_click() {
        if(!videoPaused) {
            $('console').innerHTML = '';
        }
        video.pause();
        clearInterval(timer);
    };

    // reSize
    let reSize = $('resize');
    reSize.addEventListener('click', reSize_click, false);
    function reSize_click() {
        let width = prompt('Please input width');
        if(!width) return;
        video.style.width = width + 'px';
        outerWrap.style.width = video.style.width;
    }

    // getHeight
    let curHeight = $('getHeight');
    curHeight.addEventListener('click', getHeight_click, false);
    function getHeight_click() {
        $('console').innerHTML = 'The height of the current video is: ' + getComputedStyle(video).height;
    }

    // getWidth
    let curWidth = $('getWidth');
    curWidth.addEventListener('click', getWidth_click, false);
    function getWidth_click() {
        $('console').innerHTML = 'The Width of the current video is: ' + getComputedStyle(video).width;
    }

    // setAutoplay
    /* ******************************
        When setAutoplay button is pressed, attribute 'autoplay' should be the attribute
        of 'voice' label next time the webpage opens and it can only be seen next time user opens this webpage.
        When setAutoplay button is pressed, store this operation in cookie.
        When the DOM is reloaded, it checks whether there are 'autoplay' in cookie, 
        if has, add 'autoplay' attribute to 'voice' label.
    ****************************** */
    function setCookie(name,value,expireHours){
        var cookieString=name+"="+escape(value);
        if(expireHours>0){
            var date = new Date();
            date.setTime(date.getTime()+(expireHours*3600*1000));
            cookieString=cookieString+"; expires="+date.toGMTString();
        }
        document.cookie=cookieString;
    }
    function getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length)
            }
        }
        return "";
    }

    let setAutoplay = $('setAutoplay');
    setAutoplay.addEventListener('click', setAutoplay_click, false);
    function setAutoplay_click() {
        if(getCookie('autoPlay')) {
            let autoPlay = document.createAttribute('autoplay');
            video.setAttributeNode(autoPlay);
        } else {
            // cookie cache 1 hour
            setCookie('autoPlay','true',1);
        }
    }

    // setVolume
    let setVolume = $('setVolume');
    setVolume.addEventListener('click', setVolume_click, false);
    function setVolume_click() {
        let volume = prompt("Please input volume(0~100)");
        if(!volume) return;
        if(volume < 0 || volume > 100) {
            alert('Out of range, please input again!');
        } else {
            $('video').volume = volume / 100;
        }
    }

    // getVolume
    let curVolume = $('getVolume');
    curVolume.addEventListener('click', getVolume_click, false);
    function getVolume_click() {
        // console.log($('video').volume*100)
        $('console').innerHTML = 'Current volume of the video is: ' + $('video').volume*100;
    }

    // setMute (toggle)
    let curSound = 0;
    let mute = $('setMute');
    mute.addEventListener('click', mute_click, false);
    function mute_click() {
        // toggle
        if(video.volume != 0) {
            curSound = video.volume;
            video.volume = 0;
        } else {
            video.volume = curSound;
        }
    }
    
    // getDuration
    let getDuration = $('getDuration');
    getDuration.addEventListener('click', getDuration_click, false);
    function getDuration_click() {
        $('console').innerHTML = 'Duartion of the video is: ' + Math.floor(duration) + 's';
    }

    // setFullscreen
    let setFullscreen = $('setFullscreen');
    setFullscreen.addEventListener('click', setFullscreen_click, false);
    function setFullscreen_click() {
        let setFullscreenRequest = video.requestFullScreen ||
                            video.webkitRequestFullscreen ||
                            video.mozRequestFullScreen;
        if(setFullscreenRequest) {
            setFullscreenRequest.apply(video);
        }
    }

    // getPlaybackState
    let getPlaybackState = $('getPlaybackState');
    getPlaybackState.addEventListener('click', getPlaybackState_click, false);
    function getPlaybackState_click() {
        state = videoEnd ? 'ended' : (videoPlaying ? 'playing' : 'paused');
        $('console').innerHTML = 'Current playback state is ' + state;
    }
}
