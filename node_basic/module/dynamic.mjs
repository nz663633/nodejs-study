const a = true;
if (a) { // import는 프로미스 객체이기 때문에 await 사용
    const m1 = await import('./func.mjs');
    console.log(m1);
    const m2 = await import('./var.mjs');
    console.log(m2);
}