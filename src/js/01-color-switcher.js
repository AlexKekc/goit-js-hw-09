const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  resetBtn: document.querySelector('button[data-reset]'),
};

let timerOfChangeBodyColorId = null;

refs.startBtn.addEventListener('click', changeBodyColor);
refs.stopBtn.addEventListener('click', stopChangingBodyColor);
refs.resetBtn.addEventListener('click', resetBodyColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
  refs.resetBtn.removeAttribute('disabled');

  refs.body.style.backgroundColor = getRandomHexColor();

  timerOfChangeBodyColorId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 700);
}

function stopChangingBodyColor() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);

  clearInterval(timerOfChangeBodyColorId);
}

function resetBodyColor() {
  refs.resetBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.removeAttribute('disabled');

  refs.body.style.backgroundColor = '#ffffff';

  clearInterval(timerOfChangeBodyColorId);
}
