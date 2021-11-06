const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }; 

start.addEventListener("click", () => {
    timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
}, 1000);
    start.setAttribute('disabled', true);
    stop.removeAttribute('disabled');
}); 

stop.addEventListener("click", () => {
    clearInterval(timerId);
    start.removeAttribute('disabled');
    stop.setAttribute('disabled', true);
});