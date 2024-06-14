import sqlite3 from "sqlite3"
const db = new sqlite3.Database('mydatabase.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		age INTEGER NOT NULL
	)`);

// module.exports = {
class Service {
	async getUsers() {
		try {
			const users = await new Promise((resolve, reject) => {
				db.all('SELECT * FROM users', [], (err, rows) => {
					err ? reject(err) : resolve(rows);
				});
			});
			return users;
		}
		catch (err){
			return null;
		}		
	}
	async createUser(user) {
		const lastID = await new Promise((resolve, reject) => {
			db.run('INSERT INTO users (name, age) VALUES (?, ?)', [user.name, user.age], function(err){
				err ? reject(err) : resolve(this.lastID);
			});
		});
		return { id: lastID, ...user};
	}
	async updateUser(id, updatedData) {
		const changes = await new Promise((resolve, reject) => {
			db.run(`UPDATE users 
				SET name = ?, age = ? 
				WHERE id = ?`, 
				[updatedData.name, updatedData.age, id],
				function(err) {
					err ? reject(err) : resolve(this.changes);
				});
		});
		if (changes === 0)
			return null;
		
		return this.getUserById(id);
	}
	async deleteUser(id) {
		const changes = await new Promise((resolve, reject) => {
			db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
				err ? reject(err) : resolve(this.changes);
			});
		});
		return changes > 0;
	}
	async getUserById(id) {
		const user = await new Promise((resolve, reject) => {
			db.get(
				'SELECT * FROM users WHERE id = ?',
				[id],
				(err, row) => 
					err ? reject(err) : resolve(row) 
				
			);
		});
		return user;
	}
}

export default new Service();