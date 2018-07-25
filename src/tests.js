const test = require('tape');
const handlers = require('./handlers');
const routes = require('./routes')

// test('Testing Tape is working', function(t) {
//   t.equal(1, 1, 'One should equal one');
//   t.end();
// });


test('testing that GET "/" returns statusCode 200', function(t) {
   t.plan(2);
   routes(
    { url: "/" },
    {writeHead: (status, _content) => {
      t.equal(status, 200)
    },
    end: (body) => {
      t.ok("view = 'fac'"? body.includes("view = 'fac'") : body)
    }
    });
});
