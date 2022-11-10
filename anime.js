const btn = document.querySelector('button');
const box = document.querySelector('#box');
btn.addEventListener('click', () => {
    new Anime(box, {
        prop: 'margin-left',
        value: 300,
        duration: 500
    })
});

class Anime{
 constructor(selector, option){
    this.selector = selector;
    this.option = option;
    this.startTime = performance.now();
    this.currentValue = null;
  
  //만약 옵션의 속성명이 scroll이면 scrollY값 구하고
  //그렇지 않으면 getComputedStyle 반환값 저장
    this.option.prop === 'scroll' 
    ? this.currentValue = this.selector.scrollY 
    : this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]);
 

//옵션으로 전달받은 속성값이 문자열이면 %처리를 위해 option.value값을 실수로 보정
 this.isString = typeof this.option.value;
if (this.isString === 'string'){
    const parenW = parseInt(getComputedStyle(this.selector.parentElement).width);
    const parenH = parseInt(getComputedStyle(this.selector.parentElement).height);
    const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
    const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];


    //퍼센트로 동작할지도 모를 가로폭에 관련된 속성명을 반복을 돌며 조건문
    //해당 조건일때 해당 요소의 직계부모 넓이값을 기준으로 변환한 퍼센트 값을 currnetValue에 담음
    for(let cond of x) (this.option.prop === cond) && (this.currentValue = (this.currentValue / parenW) * 100); 
    for(let cond of y) (this.option.prop === cond) && (this.currentValue = (this.currentValue / parenH) * 100); 
     
    this.option.value = parseFloat(this.option.value);
}
(this.option.value !== this.currentValue) && requestAnimationFrame(this.run);


    }
    run(time) {
        let timelast = time - this.startTime;
        let progress = timelast / this.option.duration;
    
        (progress < 0) && (progress = 0);
        (progress > 1) && (progress = 1);
        (progress < 1) 
        ? requestAnimationFrame(this.run)
        : this.option.callback && setTimeout(()=> this.option.callback(), 0)
        
        
       let result = this.currentValue + ((this.option.value - this.currentValue) * progress);
       //만약 isString값이 문자열 뒤에 퍼센트 적용, 그렇지 않으면 px적용
       if (this.isString === 'string') this.selector.style[this.option.prop] = `${result}%`;
       //만약 속성명이 opacity이면 실수값을 바로 적용
       else if (this.option.prop === 'opacity') this.selector.style[this.option.prop] = result;
       else if (this.option.prop === 'scroll') window.scroll(0, result)
       else this.selector.style[this.option.prop] = `${result}px`;
      }
}

