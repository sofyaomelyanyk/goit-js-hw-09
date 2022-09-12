import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');

buttonStart.addEventListener('click', onClickStart);

buttonStart.disabled = true;
const SELECTED_DATE = 'selected date';
let diffTime = 0;
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

function onClickStart() {
  intervalId = setInterval(differenceTime, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function differenceTime() {
  const savedTime = new Date(localStorage.getItem(SELECTED_DATE)).getTime();
  diffTime = savedTime - new Date().getTime();
  console.log(diffTime);
  if (diffTime < 1) {
    clearInterval(intervalId);
    return;
  }

  const timeComponents = convertMs(diffTime);

  for (let key in timeComponents) {
    const values = document.querySelector(`[data-${key}]`);
    values.textContent = timeComponents[key];
  }
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

timer.style.display = 'flex';
timer.style.marginTop = '60px';
timer.style.justifyContent = ' center';
timer.style.gap = '60px';

fields.forEach(
  field => (
    (field.style.display = 'flex'),
    (field.style.flexDirection = 'column'),
    (field.style.alignItems = 'center')
  )
);
