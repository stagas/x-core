var crypto = require('x-core')('crypto')
  , util = require('x-core')('util')
  , http = require('x-core')('http')
  
console.log('crypto.hash(string, [algo], [encoding])', ':' , crypto.hash('hello'))
console.log('util.sprintf()', ':', util.sprintf("[%10s]", 'monkey'))
util.printf("util.printf() : [%10s]\n", 'monkey')

http.createServer(function(req, res) {
  req.on('body', function(body) {
    console.log('BODY:', body)
  })
  res.end('<html><body><form action="/" method="post"><textarea name="text"></textarea><input type="submit"></form></body></html>')
}).listen(80)

var req = http.request({ 
  host: 'search.twitter.com'
, port: 80
, path: '/search.atom?q=node.js'
, method: 'GET'
}, function(res) {
  res.on('line', function(line) {
    if (~line.indexOf('<title>')) console.log('LINE:', line)
  })
})

req.end()
