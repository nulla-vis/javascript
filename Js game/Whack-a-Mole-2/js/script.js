const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('#skor');
const audio = document.querySelector('audio');

document.querySelector('.mulai').addEventListener('click', mulai);

let tanahSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if (tRandom === tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(100, 800);
    tRandom.classList.add('muncul');

    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanTikus();
        }
    }, wRandom);
}

function mulai() {
    skor = 0;
    papanSkor.textContent = skor;
    selesai = false;
    munculkanTikus();
    setTimeout(() => {
        selesai = true;
    }, 10000);
}

function pukul() {
    skor++;
    this.parentNode.classList.remove('muncul') // this.style.transition = "top 0"; //this di sini adalah element dari t dibawah (yang tikus.foreach(t))
    papanSkor.textContent = skor;
    suara();
}

function suara() {
    audio.currentTime = 0;
    audio.play();
}

tikus.forEach(t => {
    t.addEventListener('click', pukul);
    // t.style.transition = "top 0.3s";
})