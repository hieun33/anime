const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
  anime(box, {
    prop: 'margin-left',
    value: 300,
    duration: 500,
    callback: () => {
      anime(box, {
        prop: 'margin-top',
        value: 200,
        duration: 500
      })
    }
  })
});

function anime(selector, option) {
  const startTime = performance.now();
  requestAnimationFrame(move);

  function move(time) {
    let timelast = time - startTime;            //걸린시간 = 전체시간-에니메 시작전까지 시간
    let progress = timelast / option.duration;      //진행률
    //console.log(timelast);

    //시작, 끝나는 시점의 진행률 보정
    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    if (progress < 1) {
        requestAnimationFrame(move);
      } else {
        option.callback && option.callback();
      }

    //보정된 진행률로 option으로 전달받은 선택자와 수치값에 적용
    selector.style[option.prop] = `${option.value * progress}px`;
  }
}