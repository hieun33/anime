/*
  performance.now();
  브라우저가 로딩된 순간부터 해당 구문이 호출된 시점까지 시간을 ms단위로 리턴
  정밀한 시간 계싼이 필요할때 활용
*/
const btn = document.querySelector('button');
const box = document.querySelector('#box');
const speed = 1000; //1초
//let num = 0;
let startTime = null;

btn.addEventListener('click',()=>{  //버튼클릭하면 requestAnimationFrame호출
    //startTime : 브라우저가 로딩되고 클릭이벤트가 발생한 시점까지의 밀리세컨드 시간반환
    startTime = performance.now();
    // console.log(startTime);
    requestAnimationFrame(move);
})

function move(time){
    //console.log(time);
    //time - requestAnimationFrame의 콜백함수에 자동 전달되는 인수값
    //move함수가 requestAnimationFrame에 의해서 반복이 될때마다 걸리는 '누적'시간
    
    //timelast = 버튼을 클릭한시점부터의 누적시간
    let timelast = time - startTime;
    
    //진행률 (반복된 누적시간 / 전체시간)
    // 0~1 사이의 실수값을 반환 0:시간 1:종료
    let progress = timelast / speed;

    //시작할때와 끝나는 시점의 진행률을 보정
    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);


    // `반복횟수 : ${num} / 진행률: ${progress} / 진행된시간${timelast}`
    if(progress < 1){
        //num++;
        console.log(`반복시 움직인 누적거리값: ${300* progress} ` )
        requestAnimationFrame(move);
        box.style.marginleft = `${300 * progress}px`
    }
    console.log(progress*300);

    // if(num < 100){     //100보다 작으면
    //     num++; //num1씩중가
    //     requestAnimationFrame(move);  //requestAnimationFrame이 move를 호출,둘이 번갈아가며 계속 호출
    // }
    
    // box.style.marginLeft = `${num}px`;


}