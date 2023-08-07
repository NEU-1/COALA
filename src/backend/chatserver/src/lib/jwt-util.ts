// import jwt, { JwtPayload } from 'jsonwebtoken';

// let secret: string = '7J2064W467Kg7J207IWY7Lqg7ZSE7IiY6rCV7IOd67aE65Ok7ZmU7J207YyF7ZWY7IS47JqU7KKL7J2A7ZqM7IKs7JeQ66qo65GQ7Leo7JeF7ISx6rO17ZWY7Iuk6rGw652866+/7Iq164uI64uk65287J2067iM7IS47IWY65Ok7Ja07KO87IWU7ISc6rCQ7IKs7ZWp64uI64uk64+E7JuA7J2065CY7JeI7Jy866m07KKL6rKg7Iq164uI64uk';

// module.exports = {
//     sign: (user) => { // access token 발급
//       const payload = { // access token에 들어갈 payload
//         id: user.id,
//         role: user.role,
//       };
  
//       return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
//         algorithm: 'HS256', // 암호화 알고리즘
//         expiresIn: '1h', 	  // 유효기간
//       });
//     },
//     verify: (token) => { // access token 검증
//       let decoded = null;
//       try {
//         decoded = jwt.verify(token, secret);
//         return {
//           ok: true,
//           id: decoded.id,
//           role: decoded.role,
//         };
//       } catch (err) {
//         return {
//           ok: false,
//           message: err.message,
//         };
//       }
//     },
//     refresh: () => { // refresh token 발급
//       return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
//         algorithm: 'HS256',
//         expiresIn: '14d',
//       });
//     },
//     refreshVerify: async (token, userId) => { // refresh token 검증
//       /* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
//          promisify를 이용하여 promise를 반환하게 해줍니다.*/
//       const getAsync = promisify(redisClient.get).bind(redisClient);
      
//       try {
//         const data = await getAsync(userId); // refresh token 가져오기
//         if (token === data) {
//           try {
//             jwt.verify(token, secret);
//             return true;
//           } catch (err) {
//             return false;
//           }
//         } else {
//           return false;
//         }
//       } catch (err) {
//         return false;
//       }
//     },
//   };