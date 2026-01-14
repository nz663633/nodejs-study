const fs = require('fs').promises;

async function main() { // 비동기이지만 코드의 흐름은 동기처럼 순서보장
    let data = await fs.readFile('./readme.txt');
    console.log('1번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('2번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('3번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('4번', data.toString());
}
main();


// 해당 함수들은 비동기이며 기다리지 않고 동시에 실행되므로
// 순서대로 실행되지 않는다. (순서보장 X)
// fs.readFile('./readme.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log('1번', data.toString());
// });
// fs.readFile('./readme.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log('2번', data.toString());
// });
// fs.readFile('./readme.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log('3번', data.toString());
// });
// fs.readFile('./readme.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log('4번', data.toString());
// });

