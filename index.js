const fs = require("fs");
const http = require("http");
const url = require("url");

// <-- FILE DENGAN MODULE FS -->

// Blocking Code Exe --> Synchronous
// const readThis = fs.readFileSync("./txt/read-this.txt", "utf-8");
// const textOut = `Ini penjelasan alpukat dalam bahasa inggris : ${readThis}`;
// fs.writeFileSync("./txt/avocado-explanation.txt", textOut);
// console.log(readThis);

// Non - Blocking Code Exe --> Asynchronous
// const test = fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);

//     fs.readFile("./txt/final.txt", "utf-8", (err, final) => {
//       fs.writeFile("./txt/gabungan2.txt", `${data2}\n${final}`, (err) => {
//         console.log("Berhasil menggabungkan final.txt dan readThis");
//       });
//     });
//   });
// });
// console.log("Halo menunggu file start.txt ya?");

// <-- SERVER DENGAN HTTP -->
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/hello") {
    res.end("Halo FSW 2");
  } else if (pathName === "/product") {
    res.end(
      JSON.stringify({
        data: "Ini product",
      })
    );
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Halaman tidak ditemukan</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server sudah berjalan!");
});
