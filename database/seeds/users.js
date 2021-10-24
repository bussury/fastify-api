import fs from 'fs'
const readFile = path => fs.readFileSync(path, 'utf8');
const userfile = readFile('./seeds/users.json');

/**
 * users
 */
const users = JSON.parse(userfile);


export function seed(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
    });
}

