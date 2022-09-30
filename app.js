const http = require('http');
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
]

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    description: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    description: "Request/Response와 Stateless!!",
    userId: 1,
  },
];
const data = [
  {
    userId: 1,
    userName: "Rebekah Johnson",
    postingId: 1,
    postingTitle: "간단한 HTTP API 개발 시작!",
    postingContent: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현."
  },
  {  
    userId: 2,
    userName: "Fabian Predovic",
    postingId: 2,
    postingTitle: "HTTP의 특성",
    postingContent : "Request/Response와 Stateless!!"
  },
  {  
    userId: 3,
    userName: "new user 1",
    postingId: 3,
    postingImageUrl: "내용 1",
    postingContent: "sampleContent3"
  },
  {  
    userId: 4,
    userName: "new user 2",
    postingId: 4,
    postingImageUrl: "내용 2",
    postingContent: "sampleContent4"
  }
];

const httpRequestListener = function (request, response) {
  const { url, method } = request

    if(method === "GET"){
	    if(url === "/posts/inquire"){
    	    response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify({"data" :data}))
        }
	  }

    if(method === "POST"){
	    if(url === "/users"){
        let body = "";
            request.on("data",(data)=>{body += data;})
            request.on("end",()=> {
        
            const user = JSON.parse(body);

            users.push({
            id : user.id,
            name : user.name,
            email : user.email,
            password : user.password
            })

            data.push({
            userID: user.userID,
            userName: user.userName,
            })

            response.writeHead(201, {"Content-Type" : "application/json"});
            response.end(JSON.stringify({ message : "userCreated" }))
        })
      } 
      }

    if(method === "POST"){
	    if(url === "/posts"){
        let body = "";
            request.on("data",(data)=>{body += data;})
            request.on("end",()=> {
        
            const post = JSON.parse(body);
            const user = JSON.parse(body);

            posts.push({
            id : post.id,
            title : post.title,
            description : post.description,
            userId : post.userId
            })

            data.push({
            postingId: post.id,
            postingImageUrl: post.postingImageUrl,
            postingTitle: post.title,
            postingContent: post.description
            })
            
            response.writeHead(201, {"Content-Type" : "application/json"});
            response.end(JSON.stringify({ message : "postCreated" }))
        })
      } 
      }
      
}

server.on("request", httpRequestListener);

server.listen(8000, '127.0.0.1', function() { 
    console.log('Listening to requests on port 8000');
});