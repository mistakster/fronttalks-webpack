var partial = require('jade!./partial.jade');

var html = partial({
  title: 'Greetings',
  image: 'greetings.jpg',
  content: 'Hello, world!'
});

console.log(html);
