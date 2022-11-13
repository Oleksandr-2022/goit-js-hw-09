import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  fontSize: '16px',
  useIcon: false,
});

const formRef = document.querySelector('.form');
const labelsRef = document.getElementsByTagName('label');
const btnSubmitsRef = document.getElementsByTagName('button');
const inputDelayRef = document.getElementsByName('delay');
const inputStepRef = document.getElementsByName('step');
const inputAmountRef = document.getElementsByName('amount');

const {
  elements: { delay, step, amount },
} = formRef;

formRef.style.display = 'flex';
formRef.style.flexDirection = 'column';
formRef.style.alignItems = 'flex-start';

for (const label of labelsRef) {
  label.style.display = 'flex';
  label.style.flexDirection = 'column';
  label.style.alignItems = 'flex-start';
  label.style.marginBottom = '15px';
  label.style.fontWeight = '600';
}

btnSubmitsRef[0].style.fontSize = '1rem';
btnSubmitsRef[0].style.fontWeight = '600';
btnSubmitsRef[0].style.width = '235px';
btnSubmitsRef[0].setAttribute('disabled', true);

inputDelayRef[0].style.width = '235px';
inputStepRef[0].style.width = '235px';
inputAmountRef[0].style.width = '235px';

const onSuccess = (position, delay) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const onReject = (position, delay) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const obj = { position, delay };

      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}

formRef.addEventListener('submit', event => {
  event.preventDefault();

  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue)
      .then(res => onSuccess(res.position, res.delay))
      .catch(error => onReject(error.position, error.delay));

    delayValue += stepValue;
  }
});

function verifyAllInputs() {
  const someEmpty =
    delay.value === '' || step.value === '' || amount.value === '';

  someEmpty
    ? btnSubmitsRef[0].setAttribute('disabled', true)
    : btnSubmitsRef[0].removeAttribute('disabled');
}

inputDelayRef[0].addEventListener('input', () => {
  verifyAllInputs();
});

inputStepRef[0].addEventListener('input', () => {
  verifyAllInputs();
});

inputAmountRef[0].addEventListener('input', () => {
  verifyAllInputs();
});
