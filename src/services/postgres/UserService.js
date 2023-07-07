const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifiyUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'insert into users values($1,$2,$3,$4) RETURNING id',
      values: [id, username, hashPassword, fullname],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('failed save user');
    }

    return result.rows[0].id;
  }

  async getUser(id) {
    const query = {
      text: 'select * from users where id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('user not found');
    }

    return result.rows[0];
  }

  async verifiyUsername(username) {
    const query = {
      text: 'select * from users where username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('user exist');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'select id, password from users where username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('wrong credential');
    }

    const { id, password: hashPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashPassword);

    if (!match) {
      throw new AuthenticationError('wrong credential');
    }

    return id;
  }
}

module.exports = UserService;
