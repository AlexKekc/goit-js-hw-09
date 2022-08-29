import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

let delayValue = null;
let stepValue = null;
let amountValue = null;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', submitingOfCreatePromise);

function submitingOfCreatePromise(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  delayValue = event.currentTarget.delay.value;
  stepValue = event.currentTarget.step.value;
  amountValue = event.currentTarget.amount.value;

  createPromise(1, delayValue)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  for (let i = 2; i <= amountValue; i += 1) {
    delayValue = parseInt(delayValue, 10) + parseInt(stepValue, 10);
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  event.currentTarget.reset();
}
