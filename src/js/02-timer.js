import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

let timerOfCountdownId = null;

refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
      return;
    }

    Notify.success('Thank`s, you selected a right date');
    refs.startBtn.removeAttribute('disabled');
  },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', startСountdown);

function updateCountdownFields({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = `${days}`;
  refs.hoursField.textContent = `${hours}`;
  refs.minutesField.textContent = `${minutes}`;
  refs.secondsField.textContent = `${seconds}`;
}

function startСountdown() {
  refs.startBtn.setAttribute('disabled', true);
  const startTime = new Date(refs.input.value).getTime();

  timerOfCountdownId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    const time = convertMs(deltaTime);

    stopCountdown(time);
    updateCountdownFields(time);
  }, 1000);
}

function stopCountdown({ days, hours, minutes, seconds }) {
  if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
    clearInterval(timerOfCountdownId);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
