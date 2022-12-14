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
    postingTitle: "내용 1",
    postingContent: "sampleContent3"
  },
  {  
    userId: 4,
    userName: "new user 2",
    postingId: 4,
    postingTitle: "내용 2",
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
        if(url === "/user/post/inquire"){
          let body = "";
            const userLog = [];
            request.on("data",(data)=>{body += data;})
            request.on("end",()=>{
              const user = JSON.parse(body);
                const postLog = [];
                data.map((inquire)=> {
                  if(inquire.userId == user.userId){
                    postLog.push(inquire)
                    }
            })
                users.map((inquire)=> {
                  if(user.userId == inquire.id){
                      userLog.push({
                          userID : inquire.id,
                          userName : inquire.name,
                            postings : postLog
                })
              }
            })
                result = {data : userBox[0]}
                response.writeHead(200, { "Content-Type": "application/json"});
                response.end(JSON.stringify(result));
          })
                        
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

            if(data.userId !== post.userId){
              posts.push({
                id : post.id,
                title : post.title,
                description : post.description,
                userId : post.userId
                })

              data.push({
                userId: post.userId,
                userName: users[users.indexOf(post.userId, 0)],
                postingId: post.id,
                postingTitle: post.title,
                postingContent: post.description
            })}

            if(data.userId == post.userId){
              data.map(wordData => {
                if(wordData.postingId == user.postingId){
                  wordData.userId = (user.userId || wordData.userId);
                  wordData.userName = (user.userName || wordData.userName);
                  wordData.postingTitle = (user.postingTitle || wordData.postingTitle);
                  wordData.postingContent = (user.postingContent || wordData.postingContent);
                  }})}
            
            response.writeHead(201, {"Content-Type" : "application/json"});
            response.end(JSON.stringify({ message : "postCreated" }))
        })
      } 
      }

      if(method ==="PATCH"){
        if(url === "/posts/edit"){
          let body = "";
          request.on("data",(data)=>{body += data;})
          request.on("end",()=> {
          const user = JSON.parse(body);
                    
          data.map(wordData => {
              if(wordData.postingId == user.postingId){
                  wordData.userId = (user.userId || wordData.userId);
                  wordData.userName = (user.userName || wordData.userName);
                  wordData.postingTitle = (user.postingTitle || wordData.postingTitle);
                  wordData.postingContent = (user.postingContent || wordData.postingContent);
                  }})
            })
            response.writeHead(201, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message : "Edit posting"}))
        }
      }

      if(method ==="DELETE"){
        if(url === "/post/delete"){
          let body = "";
          request.on("data",(data)=>{body += data;})
          request.on("end",()=> {
            const user = JSON.parse(body);
              data.map((deleted,index) => {
                if(deleted.postingId == user.postingId){
                  data.splice(index,1);
                  }
          })
        })
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify({message : "postingDeleted"}))
        }
      }
}

server.on("request", httpRequestListener);

server.listen(8000, '127.0.0.1', function() { 
    console.log('Listening to requests on port 8000');
});