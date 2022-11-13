import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// import "flatpickr/dist/flatpickr.min.css";

Notiflix.Report.init({
  svgSize: '48px',
  messageFontSize: '16px',
  buttonFontSize: '16px',
  backOverlayClickToClose: true,
});

const btnStartRef = document.querySelector('[data-start]');
const timerRef = document.querySelector('.timer');
const fieldsRef = document.querySelectorAll('.field');
const spanValuesRef = document.querySelectorAll('.value');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const spanLabelsRef = document.querySelectorAll('.label');

let now = new Date();
let selectedDate = now;
let resultMs = 0;
let timer;
const TIMING = 1000;

function resetTimer() {
  now = new Date();

  setAttributeDisabled(btnStartRef, true);

  dataDays.textContent = '00';
  dataHours.textContent = '00';
  dataMinutes.textContent = '00';
  dataSeconds.textContent = '00';

  clearInterval(timer);
}

function setAttributeDisabled(element, disabled) {
  disabled
    ? element.setAttribute('disabled', true)
    : element.removeAttribute('disabled');
}

for (const span of spanLabelsRef) {
  span.style.fontSize = '0.65rem';
  span.style.textTransform = 'uppercase';
}

for (const span of spanValuesRef) {
  span.style.fontSize = '2rem';
  span.style.fontWeight = '500';
}

for (const field of fieldsRef) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.justifyContent = 'center';
  field.style.alignItems = 'center';
  field.style.marginRight = '10px';
}

timerRef.style.display = 'flex';
timerRef.style.marginTop = '20px';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onOpen() {
    resetTimer();
  },
  onChange(selectedDates, dateStr, instance) {
    instance.selectedDateElem.addEventListener('dblclick', () => {
      this.close();
    });
  },

  onClose(selectedDates) {
    now = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate <= now) {
      setAttributeDisabled(btnStartRef, true);
      return Notiflix.Report.failure(
        'Error exception:',
        'Please choose a date in the future.',
        'Select date again'
      );
    }

    setAttributeDisabled(btnStartRef, false);
    resultMs = selectedDate - now;
  },
};

const calendar = flatpickr('#datetime-picker', options);

function addLeadingZero(valueStr) {
  return valueStr.length > 2 ? valueStr : valueStr.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  const dataObj = convertMs(resultMs);

  if (resultMs <= 0) {
    clearInterval(timer);
    return Notiflix.Report.info(
      'Information:',
      'Сountdown is over.',
      'Select date again'
    );
  }

  resultMs -= TIMING;

  dataDays.textContent = addLeadingZero(String(dataObj.days));
  dataHours.textContent = addLeadingZero(String(dataObj.hours));
  dataMinutes.textContent = addLeadingZero(String(dataObj.minutes));
  dataSeconds.textContent = addLeadingZero(String(dataObj.seconds));
}

window.addEventListener('load', () => {
  resetTimer();
});

btnStartRef.addEventListener('click', () => {
  setAttributeDisabled(btnStartRef, true);
  timer = setInterval(startTimer, TIMING);
});
