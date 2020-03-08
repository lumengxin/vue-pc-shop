let http = require('http');
let util = require('util');

http.get('http://jsonplaceholder.typicode.com/users', function(res) {
  let data = ''

  res.on("data", function(chunk) {
    data += chunk
  });

  res.on("end", function() {
    let result = JSON.parse(data)
    console.log("result: " + util.inspect(result))
  })
});
