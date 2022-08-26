//standard
const standard = {
    lineWidth: 2,
    color: 'rgba(255, 255, 255, 1)',

}
//Useful 
function aToB(ax, ay, bx, by) {
    return Math.sqrt((ax - bx)**2 + (ay - by)**2);
}
let rainbow = 0;
let cheat = '';

//SEARCH BOX
const searchBox = document.querySelector('.search-box__search-box');
const searchIcon = document.querySelector('.search-box__icon');

searchBox.addEventListener('keydown', e => {
    if (e.code == 'Enter') {
        window.open(`https://www.google.com/search?q=${searchBox.value}`)
    }
})

//console.log(aToB(3, 10, 30, 10));
//TEST
// let awjdij= {
//     '/':'dw',
//     '\'': 'awd',
//     '"':1,
//     ',': 2,
//     '.':1,
//     '[':1,
//     ']':1,
//     ';':1,
//     '\\': 2,
// }
// console.log(awjdij);  
//Kiểm tra xem các kí tự đó dùng làm key đc ko, được!
// /TEST

//KEY
let fontPixel   = 16;
let keySide     = 4 * fontPixel;
let keyOnColor  = '#00FCFF';
let keyOffColor = 'rgb(0, 0, 0)';
let waveColor   = 'rgba(41, 235, 99,';
// x, y = style left, top theo absolute * fontPixel do tính bằng rem
const keyBoard = { self: document.getElementById('canvas__keyboard')};
keyBoard.x = parseInt(keyBoard.self.style.left) * fontPixel;
keyBoard.y = parseInt(keyBoard.self.style.top) * fontPixel;

//Get key probaties from HTML
const key = {};
const htmlKey = document.getElementsByClassName('canvas__key');
//console.log(htmlKey);
for (var i=0; i < htmlKey.length; i++) {
    let keyType = htmlKey[i].attributes.keyCode.value;
    key[keyType] = {};
    key[keyType].self = htmlKey[i];
    key[keyType].x = parseInt(htmlKey[i].style.left) * fontPixel + keyBoard.x + htmlKey[i].clientWidth/2;
    key[keyType].y = parseInt(htmlKey[i].style.top ) * fontPixel + keyBoard.y + htmlKey[i].clientHeight/2;
    
};
//console.log(key);


const canvas = document.getElementById('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', e => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

//WAVE STUFF

const waveArray = [];
class Wave {
    constructor(x, y, radius = 0, alpha = 1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.alpha = alpha;
    }
    update() {
        this.alpha  -= 0.05;
        this.radius += 5;
    }
    draw() {
        ctx.beginPath();
        ctx.lineWidth = 10;
        if (rainbow) ctx.strokeStyle = waveColor; 
        ctx.strokeStyle = `${waveColor} ${this.alpha})`;
        if (this.radius > 0)
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = standard.lineWidth;
        ctx.strokeStyle = standard.color;
        ctx.closePath();
    }
}

//wave handle
function waveHandle() {
    for (var i=0; i < waveArray.length; i++) {
        waveArray[i].update();
        waveArray[i].draw();
        
        //Splice
        //if (waveArray[i].radius > Math.max(aToB(waveArray[i].x, waveArray[i].y, 0, 0), aToB(waveArray[i].x, waveArray[i].y, canvas.width, canvas.height), aToB(waveArray[i].x, waveArray[i].y, canvas.width, 0), aToB(waveArray[i].x, waveArray[i].y, 0, canvas.height))) {
        if (waveArray[i].alpha <= 0) {
            waveArray.splice(i, 1);
            //console.log(waveArray.length);
            i--;
        }
    }
}
 
//Creating Wave & Key Effect
window.addEventListener('keydown', e => {
    //console.log(e.code);
        key[e.code].self.style.backgroundColor = keyOnColor;
        key[e.code].self.style.boxShadow = `0 0 18px 0 ${keyOnColor}`;
        waveArray.push(new Wave(key[e.code].x, key[e.code].y));
        waveArray.push(new Wave(key[e.code].x, key[e.code].y, -10, 0.9));
        setTimeout(function () {
            key[e.code].self.style.backgroundColor = keyOffColor;
            key[e.code].self.style.boxShadow = '';        
        }, 300)
    // waveArray.push(new Wave(100, 100));
    //console.log(waveArray);
})
window.addEventListener('keyup', e => {
    // key[e.code].self.style.backgroundColor = keyOffColor;
    // key[e.code].self.style.boxShadow = '';

    //RAINBOW ACTIVATING
    cheat += e.key.toLowerCase();
    if (cheat.indexOf('rainbow') != -1) {
        rainbow += 1;
        cheat = '';
    }; 
    if (cheat.length >= 200) {
        cheat = '';
    }
})

//Rainbow color 
function rainbowColor() {
    if (rainbow > 0) {
        rainbow +=1;
        keyOnColor = `hsl(${rainbow}, 100%, 50%)`;
        waveColor  = `hsl(${rainbow}, 100%, 50%)`;
        searchBox.style.borderColor = `hsl(${rainbow}, 100%, 50%)`;
        searchBox.style.color = `hsl(${rainbow}, 100%, 50%)`;
        searchIcon.style.color = `hsl(${rainbow}, 100%, 50%)`;
    }
}
console.log(searchBox.style);

//ANIMATION
function animation(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0, 0, 0, 1)' ;
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    rainbowColor();
    waveHandle();
    requestAnimationFrame(animation);
}

animation(0);
