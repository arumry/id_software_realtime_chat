/* eslint-disable */
const bluebird = require('bluebird');
const bcrypt = require('bcrypt-promise');
const uuidv4 = require('uuid/v4');
const dotenv = require('dotenv');

dotenv.config();

const {
  endConnection,
  startConnection,
  schemas,
} = require('../src/server/db/mongodb');

const { SALT_WORK_FACTOR } = process.env;

console.log('Running user seed');

const users = [
  { username: 'idSoftware1' },
  { username: 'idSoftware2' },
  { username: 'idSoftware3' },
].map(u => {
  u.id = uuidv4();
  u.password = 'idSoftware2018';
  return u;
});

async function init() {
  try {
    await startConnection();
    const usersWithHash = await bluebird.map(users, async user => {
      const salt = await bcrypt.genSalt(Number(SALT_WORK_FACTOR));
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      return user;
    });
    await schemas.Author.insertMany(usersWithHash);
    console.info('The seed ran successfully', JSON.stringify(users, null, 4));
  } catch (e) {
    console.error('Error running seed', e);
  }

  await endConnection();
}

init();
