import dns from 'dns/promises';

const ip = await dns.lookup('gilbut.co.kr');
console.log('IP', ip);

const a = await dns.resolve('gilbut.co.kr', 'A'); // A는 IPv4 주소
console.log('A', a);

const mx = await dns.resolve('gilbut.co.kr', 'MX'); // MX는 메일서버
console.log('MX', mx);

const cname = await dns.resolve('www.gilbut.co.kr', 'CNAME'); // CNAME은 주소에 대한 별명
console.log('CNAME', cname);

const any = await dns.resolve('gilbut.co.kr', 'ANY'); // ANY는 그 외 DNS서버가 허용하는 나머지 레코드
console.log('ANY', any);

// dns.resolve()는 DNS서버에서 특정 레코드 타입(A, MX, CNAME 등)을 직접 조회함
// AAAA는 IPv6 주소