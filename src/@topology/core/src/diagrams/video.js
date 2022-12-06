import { setElemPosition } from '../pen';
export var videos = {};
export function video(pen) {
    var _a;
    if (!pen.onDestroy) {
        pen.onDestroy = destory;
        pen.onMove = move;
        pen.onResize = move;
        pen.onRotate = move;
        pen.onClick = click;
        pen.onValue = value;
        pen.onChangeId = changeId;
    }
    if (!videos[pen.id]) {
        var player = document.createElement('div');
        var progress_1 = document.createElement('div');
        progress_1.style.position = 'absolute';
        progress_1.style.outline = 'none';
        progress_1.style.left = '0';
        progress_1.style.bottom = '0';
        progress_1.style.width = '0';
        progress_1.style.height = '2px';
        progress_1.style.background = '#52c41a';
        progress_1.style.zIndex = '1';
        player.appendChild(progress_1);
        var media_1;
        if (pen.video) {
            media_1 = document.createElement('video');
            media_1.src = pen.video;
        }
        else if (pen.audio) {
            media_1 = document.createElement('audio');
            media_1.src = pen.audio;
        }
        media_1.loop = pen.playLoop;
        media_1.ontimeupdate = function () {
            resizeProcessWidth(progress_1, media_1, pen.calculative.worldRect.width);
        };
        media_1.onended = function () {
            pen.calculative.onended && pen.calculative.onended(pen);
        };
        pen.calculative.media = media_1;
        media_1.style.position = 'absolute';
        media_1.style.outline = 'none';
        media_1.style.left = '0';
        media_1.style.top = '0';
        media_1.style.width = '100%';
        media_1.style.height = '100%';
        player.appendChild(media_1);
        videos[pen.id] = player;
        (_a = pen.calculative.canvas.externalElements) === null || _a === void 0 ? void 0 : _a.appendChild(player);
        setElemPosition(pen, player);
        if (pen.autoPlay) {
            media_1.autoplay = true;
            media_1.muted = true;
        }
    }
    else if (pen.video &&
        pen.calculative.media &&
        pen.video !== pen.calculative.video) {
        console.warn('video 更改, 此处是否执行？');
        pen.calculative.media.src = pen.video;
        if (pen.autoPlay) {
            pen.calculative.media.muted = true;
            pen.calculative.media.autoplay = true;
        }
        pen.calculative.media.loop = pen.playLoop;
        pen.calculative.video = pen.video;
    }
    else if (pen.audio &&
        pen.calculative.media &&
        pen.audio !== pen.calculative.audio) {
        pen.calculative.media.src = pen.audio;
        if (pen.autoPlay) {
            pen.calculative.media.muted = true;
            pen.calculative.media.autoplay = true;
        }
        pen.calculative.media.loop = pen.playLoop;
        pen.calculative.audio = pen.audio;
    }
    if (pen.calculative.patchFlags) {
        setElemPosition(pen, videos[pen.id]);
    }
    return new Path2D();
}
function destory(pen) {
    videos[pen.id].remove();
    videos[pen.id] = undefined;
}
function move(pen) {
    setElemPosition(pen, videos[pen.id]);
    var progress = videos[pen.id].children[0];
    var media = videos[pen.id].children[1];
    resizeProcessWidth(progress, media, pen.calculative.worldRect.width);
}
function click(pen) {
    if (pen.calculative.media) {
        pen.calculative.media.muted = false;
        if (pen.calculative.media.paused) {
            pen.calculative.media.play();
        }
        else {
            pen.calculative.media.pause();
        }
    }
}
function resizeProcessWidth(progress, media, width) {
    // worldRect 会重新赋值，而 pen 不会变，这里才能取到实时的 worldRect
    progress.style.width = (media.currentTime / media.duration) * width + 'px';
}
function changeId(pen, oldId, newId) {
    if (!videos[oldId]) {
        return;
    }
    videos[newId] = videos[oldId];
    delete videos[oldId];
}
function value(pen) {
    var video = videos[pen.id];
    if (!video) {
        return;
    }
    setElemPosition(pen, video);
    var currentSrc = pen.calculative.media.getAttribute('src');
    if (pen.video) {
        if (currentSrc !== pen.video) {
            pen.calculative.media.src = pen.video;
        }
    }
    else if (pen.audio) {
        if (currentSrc !== pen.audio) {
            pen.calculative.media.src = pen.audio;
        }
    }
    // TODO: 下面每次都改动，是否影响性能？
    if (pen.autoPlay) {
        pen.calculative.media.muted = true;
        // TODO: 自动播放何时关？
        pen.calculative.media.autoplay = true;
    }
    pen.calculative.media.loop = pen.playLoop;
}
//# sourceMappingURL=video.js.map