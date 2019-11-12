class Song {
    constructor() {
        this.songs = [
            'audio/I Fall Apart-Post Malone.mp3',
            'audio/Viva La Vida.mp3',
            'audio/茜さす.mp3',
        ]
        this.pictures = [
            'image/post-malone.jpg',
            'image/viva.jpg',
            'image/茜さす.jpg',
        ]
        this.names = [
            'I Fall Apart',
            'Viva La Vida',
            '茜さす',
        ]
        this.singers = [
            'Post Malone',
            'ColdPlay',
            'Aimer',
        ]

        this.index = 0
    }

    nextSong () {
        let s = this.songs
        this.index = (this.index + 1) % s.length
        return s[this.index]
    }

    prevSong() {
        let s = this.songs
        this.index = (this.index + s.length - 1) % s.length
        return s[this.index]
    }

    nextPic() {
        let pic = this.pictures
        this.index = (this.index + 1) % pic.length
        return pic[this.index]
    }

    prevPic() {
        let pic = this.pictures
        this.index = (this.index + pic.length - 1) % pic.length
        return pic[this.index]
    }
}

//上一曲
const bindBackward = (audio) => {
    let song = new Song()
    let button = e('#id-button-prev')
    bindEvent(button, 'click', () => {
        let s = song.prevSong()
        log('s', s)
        audio.src = s
        audio.play()
        playChange()
    })
}
//下一曲
const bindForward = (audio) => {
    let song = new Song()
    let button = e('#id-button-next')
    bindEvent(button, 'click', () => {
        let s = song.nextSong()
        log('s', s)
        audio.src = s
        audio.play()
        playChange()
    })
}

//切换图片
const picturePrev = (img) => {
    let song = new Song()
    let last = e('#id-button-prev')
    let singer = e('#id-singer')
    let name = e('#id-name')
    bindEvent(last, 'click', () =>{
        let pic = song.prevPic()
        img.src = pic
        // 修改歌曲与歌手信息
        singer.textContent = song.singers[song.index]
        name.textContent = song.names[song.index]
    })

}

const pictureNext = (img) => {
    let song = new Song()
    let next = e('#id-button-next')
    let singer = e('#id-singer')
    let name = e('#id-name')
    bindEvent(next, 'click', () => {
        let pic = song.nextPic()
        img.src = pic
        singer.textContent = song.singers[song.index]
        name.textContent = song.names[song.index]
    })
}
const playPrev = (audio, img) => {
    bindBackward(audio)
    picturePrev(img)
}

const playNext = (audio, img) => {
    bindForward(audio)
    pictureNext(img)
}


// //循环播放
const bindEventLoop = (audio) => {
    let song = new Song()
    audio = e('#id-audio-player')
    bindEvent(audio, 'ended', () => {
        log('播放结束')
        let s = song.nextSong()
        log('s is', s)
        audio.src = s
        audio.play()
    })
}
const bindClickLoop = () => {
    let button = e('#click-loop')
    bindEvent(button, 'click', (audio) => {
        // log('点击了循环播放')
        // bindEventLoop(audio)
        log('随机播放')
        loopChange()
        bindRandom(audio)
    })
}

//随机播放
const choice =(array) => {
    array = this.songs
    let a = Math.random()
    log('a', a)
    let index = Math.floor(a * array.length)
    log('array', index)
    let src = 'audio/' + array[index]
    return src
}
const bindRandom =(audio) => {
    audio = e('#id-audio-player')
    bindEvent( audio, 'ended', () => {
        log('播放结束')
        let song = choice()
        log('s is', song)
        audio.src = song
        audio.play()
    })
}
const bindClickRandom = () => {
    let button = e('#click-random')
    bindEvent(button, 'click', (audio) => {
        log('循环播放')
        randomChange()
        bindEventLoop(audio)
    })
}

//单曲循环
const bindSingle = (audio) => {
    audio = e('#id-audio-player')
    bindEvent(audio, 'ended', () => {
        audio.play()
    })
}
const bindClickSingle = () => {
    let button = e('#click-single')
    bindEvent(button, 'click', (audio) => {
        // log('随机播放')
        // bindSingle(audio)
    })
}

//歌曲播放
const bindEventPlay = (audio) => {
    let button = e('#id-button-play')
    bindEvent(button, 'click', () => {
        if (audio.paused) {
            audio.play()
            playChange()
        } else {
            audio.pause()
            pauseChange()
        }
    })
}

// 播放暂停时图标变化
const playChange = () => {
    let button = e('#id-button-play')
    button.classList.remove('j-play-circle')
    button.classList.add('j-pause-circle')
}
const pauseChange = () => {
    let button = e('#id-button-play')
    button.classList.remove('j-pause-circle')
    button.classList.add('j-play-circle')
}

// 播放模式图标变化
const loopChange = () => {
    let loop = e('#click-loop')
    loop.classList.remove('j-sync-alt')
    loop.classList.add('j-random')
}
const randomChange = () => {
    let loop = e('#click-loop')
    loop.classList.remove('j-random')
    loop.classList.add('j-sync-alt')
}
const singleChange = () => {
    let single = e('#click-random')
    single.classList.remove('j-sync-single')
    single.classList.add('j-random')
}

const showTime = (current, idName) => {
    let span = e(idName)
    let min = Math.floor(Number(current) / 60)
    let sec = Math.floor(Number(current) - min * 60)
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    let time = `${min} : ${sec}`
    span.innerHTML = time
}

//歌曲时长
const bindDuration =(audio) => {
    bindEvent(audio, 'canplay', () => {
        let duration = audio.duration
        showTime(duration, '.time-duration')

    })
}
//开始时间
const bindCurrenTime =(audio) => {
    let current = audio.currentTime
    showTime(current, '.time-current')
}
//歌曲时间实时计时
const bindEventTimer = (audio) => {
    setInterval(() => {
        bindCurrenTime(audio)
        baseAutoPlay(audio)
    }, 1000)
}
//点击切歌
const bindChange = () => {
    let change = '.audio'
    let audio = e('#id-audio-player')
    bindAll(change, 'click', (event) => {
        let self = event.target
        let song = self.dataset.path
        log('song', song)
        audio.src = song
        audio.play()
    })
}

//进度条
const baseAutoPlay = (audio) => {
    let progressbar = e('.progressbar')
    let played = audio.currentTime
    let total = audio.duration
    progressbar.style.width = `${played / total * 100}%`
}
const progressControl = (audio) => {
    let base = e('.base-progress')
    let progress = e('.progressbar')
    bindEvent(base, 'click', (event) => {
        let playedX = Number(event.offsetX)
        let dur = audio.duration
        let time = playedX / 295 * dur
        audio.currentTime = time
        let played = audio.currentTime
        progress.style.width = `${played / dur * 100}%`
    })
}

const bindEvents = (audio, img) => {
    audio = e('#id-audio-player')
    bindEventPlay(audio)
    bindCurrenTime(audio)
    bindDuration(audio)
    bindEventTimer(audio)
    //bindChange()
    //bindForward(audio)
    //bindBackward(audio)
    bindClickLoop()
    bindClickRandom()
    bindClickSingle()
    progressControl(audio)
    playPrev(audio, img)
    playNext(audio, img)

}


const templateButton = (title, index) => {
    let t = `
    <button class="modal-action-button" data-index="${index}"">
        ${title}
    </button>
    `
    return t
}
const music = (title, actions, callback) => {
    let buttons = []
    for (let i = 0; i < actions.length; i++) {
        let a = actions[i]
        buttons.push(templateButton(a, i))
    }
    let buttonActions = buttons.join('')
    let t = `
    <div class="modal">
        <div class='modal-container'>
        <div class='modal-mask'></div>
        <div class="modal-alert vertical-center">
            <div class="modal-title">
                ${title}
            </div>
            <div class="modal-message">
                ${buttonActions}
            </div>
            <div class='modal-alter-button'>
                <button class="modal-button modal-action-button" data-index="-1">关闭</button>
            </div>
        </div>
    </div>
    </div>
    `
    let body = e('body')
    appendHtml(body, t)

    let css = `
        <style>
            .modal {
                position: absolute;
                top: 98%;
                margin-top: -335px;
                left: 0;
                width: 100%;
            }
            .modal-container {
            width: 375px;
            height: 330px;
            margin: 0 auto;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            overflow: hidden;
            position: relative;
            background: white;
        }
        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .modal-alert {
            margin: 0 auto;
            width: 200px;
            opacity: 1;
        }
        .modal-title {
            text-align: center;
            font-size: 27px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .modal-message {
            padding: 10px 5px 70px;
            }

        .modal-alter-button {
            font-size: 0;
            margin-top: -55px;
            width: 40%;
            margin-left: 55px;
        }
        .modal-button {
            height: 100%;
            font-size: 18px;
            border: 0;
            margin-left: 10px;
            margin-top: 48px;
            outline: none;
        }
        .vertical-center {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }
        button {
            width: 380px;
            text-align: left;
            border-color: transparent;
            background-color: white;
            margin-left: -85px;
            border-bottom: 1px solid lightgrey;
            height: 55px;
            outline: none;
        }
    </style>
    `
    let head = e('head')
    appendHtml(head, css)

    let button = '.modal-action-button'
    bindAll(button, 'click', (event) => {
        let index = event.target.dataset.index
        callback(index)
        removeClassAll('modal-container')
    })
}
const clickMusic = function () {
    let button = e('#click-music')
    bindEvent(button, 'click', () => {
        let songs = [
            'I Fall Apart - Post Malone',
            'Viva La Vida - ColdPlay',
            '茜さす - Aimer',
        ]
        music('我的音乐', songs, (index) => {
            if (index == -1) {
                log('用户点了取消')
            } else {
                log('用户选择了 ', songs[index])

            }
        })
    })
}
const __main = () => {
    bindEvents()
    clickMusic()
}
__main()
