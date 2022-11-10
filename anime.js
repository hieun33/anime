const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
  anime(box, {
    prop: 'margin-left',
    value: 100,
    duration: 500
   
  })
});

function anime(selector, option) {
  const startTime = performance.now();
  const currentValue = parseInt(getComputedStyle(selector)[option.prop]);
  if (option.value === currentValue) return;
  if (option.value > currentValue) requestAnimationFrame(plus);
  if (option.value < currentValue) requestAnimationFrame(minus);

  

  function plus(time) {
    let timelast = time - startTime;
    let progress = timelast / option.duration;

    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    if (progress < 1) {
      requestAnimationFrame(plus);
    } else {
      option.callback && option.callback();
    }
    let result = currentValue + ((option.value - currentValue) * progress)
    selector.style[option.prop] = `${result}px`;
  }

    function minus(time) {
        let timelast = time - startTime;
        let progress = timelast / option.duration;
    
        (progress < 0) && (progress = 0);
        (progress > 1) && (progress = 1);
        if (progress < 1) {
          requestAnimationFrame(plus);
        } else {
          option.callback && option.callback();
        }
        let result = currentValue - ((currentValue - option.value) * progress)
        selector.style[option.prop] = `${result}px`;
      }
    }