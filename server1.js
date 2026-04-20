// // var http = require('http'); // 1 - Import Node.js core module
// // var server = http.createServer(function (req, res) { // 2 - creating server
// //  //handle incomming requests here..
// // });
// // server.listen(5000); //3 - listen for any incoming requests
// // console.log('Node.js web server at port 5000 is running..')

// let http = require("http")
// let server = http.createServer(function(req, res){
//     if (req, url=="/students"){
//         res.end("Welcome to our application")
//     }else if(req.url=="/students"){
//    let students = [
//     {id:1, names:"Alline"},
//     {id:1, names:"Bruce"}
//    ]

//    res.end(JSON.stringify(students))
//     }else{
//         res.end("not found")
//     }
// })

// server.listen(5000)
// console.log("Application is running on port 5000")
// let http = require("http");

// let server = http.createServer(function(req, res) {
//     if (req.url == "/") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("Welcome to our application");
//     } else if (req.url == "/students") {
//         let students = [
//             { id: 1, names: "Alline" },
//             { id: 2, names: "Bruce" }
//         ];
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(students));
//     } else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("Not found");
//     }
// });

// server.listen(5000);
// console.log("Application is running on port 5000");

let http = require("http");
let server = http.createServer(function(req, res) {
    if(req.url === '/' ){
        res.end("Welcome to our application home")
    }else if (req.url ==='/students') {
        let students = [
            {id:1,names:"Aline IKIREZI"},
            {id:2,names:"Bruce MUGISHA"}
        ]
        res.end(JSON.stringify(students))
    }else{
        res.end("api not found")
    }
})
server.listen(3000)
console.log("Applicaton running on port 3000")