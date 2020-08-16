//ex) '/echo' server
//요청 받은 테이더를 그대로 응답으로 돌려보는 서버
//조건
//1. 요청 메소드가 POST인 경우
//2. URL이 /echo인 경우
//3. 위 조건이 만족 되지 않을 때 404 에러 응답

const http = require('http');

http
  .createServer((request, response) => {
    //요청 스트림에서 오류를 처리하기 하기 위해 400 메세지 응답
    request.on('error', (err) => {
      console.error(err);
      response.statusCode = 400;
      response.end();
    });
    response.on('error', (err) => {
      console.error(err);
    });

    if (request.method === 'POST' && request.url === '/echo') {
      let body = [];
      request
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          response.end(body);
        });
      //let body = [] 부분부터 response.end(body); 부분을 다음과 같이 간략화 가능
      //request.pipe(response) 으로 대체 가능
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
