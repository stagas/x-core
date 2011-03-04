module.exports = function(http) {

  var createServer = http.createServer
  http.createServer = function(f) {
    var self = this

    return createServer(function(req, res) {
      var body = []
      
      req.setEncoding('utf8')

      req.on('data', function(chunk) {
        body.push(chunk)
      })
      
      req.on('end', function() {
        req.emit('body', body.join(''))
      })

      f.call(self, req, res)
    })
  }

  var request = http.request
  http.request = function(options, f) {
    var self = this

    return request(options, function(res) {
      var body = []
        , buffer = ''
      
      res.on('data', function(chunk) {
        body.push(chunk)
        buffer += chunk
        buffer = buffer.replace(/([^\n]+)\n/g, function(m, line) {
          res.emit('line', line)
          return ''
        })        
      })
      
      res.on('end', function() {
        res.emit('body', body.join(''))
        if (buffer.length) res.emit('line', buffer)        
      })
      
      f.call(self, res)
    })
  }

  return http
}