const btn = document.querySelector('button');
const box = document.querySelector('#box');
btn.addEventListener('click', () => {
  anime(box, {
    prop: 'opacity',
    value: 0.1,
    duration: 1000
  })
});

function anime(selector, option) {
  const startTime = performance.now();
 //px, % 값을 모두 커버하기 위해서 parseFloat으로 속성값 반환
 let currentValue = parseFloat(getComputedStyle(selector)[option.prop]);

//옵션으로 전달받은 속성값이 문자열이면 %처리를 위해 option.value값을 실수로 보정
const isString = typeof option.value;
if (isString === 'string'){
    const parenW = parseInt(getComputedStyle(selector.parentElement).width);
    const parenH = parseInt(getComputedStyle(selector.parentElement).height);
    const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
    const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];


    //퍼센트로 동작할지도 모를 가로폭에 관련된 속성명을 반복을 돌며 조건문
    //해당 조건일때 해당 요소의 직계부모 넓이값을 기준으로 변환한 퍼센트 값을 currnetValue에 담음
    for(let cond of x) (option.prop === cond) && ( currentValue = (currentValue / parenW) * 100); 
    for(let cond of y) (option.prop === cond) && (currentValue = (currentValue / parenH) * 100); 
     
      option.value = parseFloat(option.value);
}
  
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
  //만약 속성명이 opacity이면 실수값을 바로 적용
    else if (option.prop === 'opacity') selector.style[option.prop] = result;
   else selector.style[option.prop] = `${result}px`;
  }

}