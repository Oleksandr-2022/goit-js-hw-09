const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');

const TIMING = 1000;
let timer;
let started = false;

function toggleBtn(started) {
    started
      ? btnStopRef.removeAttribute('disabled')
      : btnStopRef.setAttribute('disabled', true);
  
    started
      ? btnStartRef.setAttribute('disabled', true)
      : btnStartRef.removeAttribute('disabled');
  
    clearInterval(timer);
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function setColor() {
    document.body.style.backgroundColor = getRandomHexColor();
  }
  
  function changeColor() {
    timer = setInterval(setColor, TIMING);
  }
  
  window.addEventListener('load', () => {
    started = false;
  
    toggleBtn(started);
  });
  
  btnStartRef.addEventListener('click', () => {
    started = true;
  
    toggleBtn(started);
    changeColor();
  });
  
  document.addEventListener('keydown', event => {
    if (event.code === 'Enter' && !started) {
      started = true;
  
      toggleBtn(started);
      changeColor();
    }
  });
  
  btnStopRef.addEventListener('click', () => {
    started = false;
  
    toggleBtn(started);
  });
  
  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && started) {
      started = false;
  
      toggleBtn(started);
    }
  });