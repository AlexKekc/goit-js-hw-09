import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify.failure('Please choose a date in the future');
// Notify.success('Thank`s, you selected a right date');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
