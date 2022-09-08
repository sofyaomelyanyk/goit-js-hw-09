// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const day = document.querySelector('button[data-days]');
const hour = document.querySelector('button[data-hours]');
const minute = document.querySelector('button[data-minutes]');
const second = document.querySelector('button[data-seconds]');

buttonStart.addEventListener('click', convertMs);

buttonStart.disabled = true;
const SELECTED_DATE = 'selected date';
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      buttonStart.disabled = true;
      alert('Please choose a date in the future');
    } else {
      const selectedTime = selectedDates[0];
      localStorage.setItem(SELECTED_DATE, selectedTime);
      buttonStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

buttonStart.addEventListener('click', onClickStart);

function onClickStart() {
  timer();
}

function timer() {
  intervalId = setInterval(differenceTime, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function differenceTime() {
  const savedTime = new Date(localStorage.getItem(SELECTED_DATE)).getTime();
  const diffTime = savedTime - new Date().getTime();
  if (diffTime === 0) {
    clearInterval(intervalId);
    return;
  }

  const timeComponents = convertMs(diffTime);
  console.log(timeComponents);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
