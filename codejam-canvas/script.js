
function getArr(scale) {
    let url = '';
    if (scale == '4') {
        url = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json';
    } else if (scale == '32') {
        url = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json';
    } else {
        let img = document.createElement('img');
        img.crossOrigin = "Anonymous";
        img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png';
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return;
        }
    }
    fetch(url)
        .then(res => res.json())
        .then(data => drawPixel(data, scale));
}

function drawPixel(color, scale) {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0, k = 0; i < color.length; i++) {
        for (let m = 0; m < canvas.width / scale; m++) {
            for (let j = 0; j < color[i].length; j++) {
                if (/[A-F]/.test(color[i][j])) color[i][j] = [parseInt(color[i][j].slice(0, 2), 16), parseInt(color[i][j].slice(2, 4), 16), parseInt(color[i][j].slice(4, 6), 16)];
                for (let r = 0; r < canvas.width / scale; r++, k += 4) {
                    imageData.data[k] = color[i][j][0];
                    imageData.data[k + 1] = color[i][j][1];
                    imageData.data[k + 2] = color[i][j][2];
                    imageData.data[k + 3] = 255;
                }
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}