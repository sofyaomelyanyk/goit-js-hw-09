function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onClickButtonStart);
buttonStop.addEventListener('click', onClickButtonStop);

let timerId = null;

function onClickButtonStart() {
  timerId = setInterval(() => {
    const bgColor = getRandomHexColor();
    body.style.background = bgColor;
  }, 1000);

  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
}

function onClickButtonStop() {
  clearInterval(timerId);
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);
}
