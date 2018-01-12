const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let p = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(p, salt, (err, hash) => {
    console.log(hash);
  });
});

let hashedP = '$2a$10$AhRE5b0JjuazWSPRKv4m8eHsf2dvMMXcjOaL9HwLYFgN8w3pQYncC';

bcrypt.compare(p, hashedP, (err, res) => {
  console.log(res);
});
