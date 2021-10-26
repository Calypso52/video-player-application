# video-player
a video player with APIs

The video player has many APIs, marked by buttons:
1. play
    start the playback
2. pause
    pause the playback
3. resize
    change the player’s size
4. getHeight
    returns the player’s height
5. getWidth
    returns the player’s width
6. setAutoplay
    the 'autoplay' argument is a boolean indicating whether or not the player should autostart.
    special statement: Browser has the feature that it must be muted when the video is automatically played. In this case I set a volume switch key in the lower left corner of the video to ensure that when the video plays automatically, click the volume switch to release the sound.
    On the other hand, I assume that even if the 'autoplay' attribute is added to label 'video', it will disappear next time you open the browser. So I add it to cookie and set the expire time to 1 hour. In this case if user open the same webpage in 1 hour, the video will automatically play.
7. setVolume
    the volume argument is an integer from 0 to 100 representing the percentage of audible volume
8. getVolume
    returns the current volume as an integer from 0 to 100.
9. setMute
    the mute argument is a boolean indicating whether or not the player should be muted.
    special statement: this button has the operation of 'toggle' which means that if you press the button again, the sound will recover to its previous volume.
10. getMute
    returns a boolean indicating whether or not the player is muted
11. getDuration
    returns an integer indicating the duration of the media in seconds
12. setFullscreen
    the fullscreen argument is a boolean indicating whether or not the player should occupy the entire area of the screen
13. getPlaybackState
    returns a string indicating the player’s current playback state. The options are: “playing”, “paused”, and “ended”. The “ended” value should be returned when the media reaches the end.
    
