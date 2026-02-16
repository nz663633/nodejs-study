// localhost4000에서 localhost8002 API 서버로 요청보내기

const axios = require('axios'); // HTTP 요청 보내는 라우터

exports.test = async (req, res, next) => {
    try {
        if (!req.session.jwt) { // session에 토큰이 없는 경우에 토큰 발급받기
            const tokenResult = await axios.post('http://localhost:8002/v1/token', {
                clientSecret: process.env.CLIENT_SECRET,
            })
            if (tokenResult.status === 200) { // 토큰 발급 성공시
                req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
            } else { // 토큰 발급 실패시
                return res.json(tokenResult.data); // 발급 실패 사유 응답
            }
        }
        // 토큰 발급 받은 후 토큰 테스트
        const result = await axios.get('http://localhost:8002/v1/test', {
            headers: { authorization: req.session.jwt }
        });
        return res.json(result.data);
    } catch (error) {
        console.error(error);
        if (error.response?.status === 419) { // 토큰이 만료되었을 때
            return res.json(error.response.data);
        } return next(error); // 토큰이 위조되었을 때
    }
}