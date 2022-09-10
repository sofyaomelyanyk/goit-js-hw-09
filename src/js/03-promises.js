const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;

  const elems = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  };

  let firstDelay = elems.delay;

  for (let i = 1; i <= elems.amount; i += 1) {
    createPromise(i, firstDelay).then(onSuccess).catch(onError);
    firstDelay += elems.step;
  }
}

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

function onSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
