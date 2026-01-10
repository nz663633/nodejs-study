// 최상위 스코프의 this는 module.exports를 가리킴
console.log(this); // global 아님
console.log(this === module.exports)

// 함수 선언문 내부의 this는 global(전역) 객체를 가리킴
function a() {
    console.log(this === global);
};

a();