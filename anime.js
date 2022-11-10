const btn = document.querySelector('button');
const box = document.querySelector('#box');
btn.addEventListener('click', () => {
  anime(box, {
    prop: 'margin-left',
    value: 500,
    duration: 500
  })
});

function anime(selector, option) {
  const startTime = performance.now();
  const currentValue = parseInt(getComputedStyle(selector)[option.prop]);
  (option.value !== currentValue) && requestAnimationFrame(run);

  function run(time) {
    let timelast = time - startTime;
    let progress = timelast / option.duration;

    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    if (progress < 1) {
      requestAnimationFrame(run);
    } else {
      option.callback && option.callback();
    }
    let result = currentValue + ((option.value - currentValue) * progress);
    selector.style[option.prop] = `${result}px`;
  }

}