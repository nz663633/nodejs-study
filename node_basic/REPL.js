// REPL이라는 콘솔에서 즉석으로 자바스크립트 실행 가능
// R(Read), E(Evaluate), P(Print), L(Loop)
// 명령 프롬프트에서도 사용 가능 (node REPL.js)

function helloWorld() {
    console.log('Hello World');
    helloNode();
}

function helloNode() {
    console.log('Hello node');
}

helloWorld();