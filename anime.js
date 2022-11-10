const btn = document.querySelector('button');
const box = document.querySelector('#box');
btn.addEventListener('click', () => {
  anime(box, {
    prop: 'margin-left',
    value: '50%',
    duration: 500
  })
});

function anime(selector, option) {
  const startTime = performance.now();
  const currentValue = parseInt(getComputedStyle(selector)[option.prop]);

//옵션으로 전달받은 속성값이 문자열이면 %처리를 위해 option.value값을 실수로 보정
const isString = typeof option.value;
isString === 'string' && (option.value = parseFloat(option.value));
  
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
   //만약 isString값이 문자열 뒤에 퍼센트 적용, 그렇지 않으면 px적용
   if (isString === 'string') selector.style[option.prop] = `${result}%`;
   else selector.style[option.prop] = `${result}px`;
  }

}