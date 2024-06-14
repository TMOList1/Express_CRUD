import Service from "./Service.js";

class Controller {
	async getAll(req, res) {
		try {
			const users = await Service.getUsers();
			res.json(users);
		} catch(error) {
			res.status(500).json(error)
		}
	}
	async create(req, res) {
		try {
			//console.log(`request is here ${req.body.age}`);
			const user = await Service.createUser(req.body);
			res.json(user);
		} catch(error) {
			res.status(500).json(error)
		}
	}
	async read(req, res) {
		try {
			const user = await Service.getUserById(req.params.id);
			return res.json(user);
		} catch(error) {
			res.status(500).json(error)
		}
	}
	async update(req, res) {
		try {
			const updatedData = await Service.updateUser(req.body);
			return res.json(updatedData);
		} catch(error) {
			res.status(500).json(error)
		}
	}
	async delete(req, res) {
		try {
			const deleted = await Service.deleteUser(req.params.id);
			deleted 
				? res.json(`User ${req.params.id} succesfully deleted`)
				: res.json("User not found")
		} catch(error) {
			res.status(500).json(error)
		}
	}

}

export default new Controller();