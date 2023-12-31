const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
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
const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const overviewPage = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const productCardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { pathname: pathName, query } = url.parse(req.url, true);

  // <-- HELLO PAGE -->
  if (pathName === "/hello") {
    res.end("Halo FSW 2");
    // <-- PRODUCT PAGE -->
  } else if (pathName === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(productTemplate, product);
    res.end(output);
    // <-- API PAGE -->
  } else if (pathName == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    // <-- OVERVIEW PAGE -->
  } else if (pathName == "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const productCardHTML = dataObj.map((el) =>
      replaceTemplate(productCardTemplate, el)
    );
    const output = overviewPage.replace("{%PRODUCT_CARDS%}", productCardHTML);
    res.end(output);
    // NOT FOUND PAGE
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
