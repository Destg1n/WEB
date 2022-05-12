var ToDo = require("../models/ToDo.js"),
	mongoose = require("mongoose");
	ToDosController = {};

ToDosController.index = function (req, res) { 
	console.log("Вызван ToDosController.index");
	var username = req.params.username || null,
		respondWithToDos;
	respondWithToDos = function (query) { 
		ToDo.find(query, function (err, toDos) {
			if (err !== null) {
				res.json(500, err);
			} else {
				res.status(200).json(toDos);
			}
		});
	};
	if (username !== null) {
		console.log("Поиск пользователя: "+username);
		User.find({"username": username}, function (err, result) {
			if (err !== null) {
				res.json(500, err);
			} else if (result.length === 0) {
				res.status(404).json({"result_length": 0});
			} else {
				respondWithToDos({"owner": result[0]._id});
			}
		});
	} else {
		respondWithToDos({});
	}
};

ToDosController.create = function (req, res) {
	var username = req.params.username || null;
	var newToDo = new ToDo({
		"description": req.body.description,
		"tags": req.body.tags
	});

	console.log("username: " + username);

	User.find({"username": username}, function (err, result) {
		if (err) {
			res.send(500);
		} else {
			if (result.length === 0) {
				newToDo.owner = null;
			} else {
				newToDo.owner = result[0]._id;
			}
			newToDo.save(function (err, result) {
				console.log(result);
				if (err !== null) {
					// элемент не был сохранен!
					console.log(err);
					res.json(500, err);
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
};

ToDosController.show = function (req, res) {
	console.log("вызвано действие: показать");
	res.send(200);
};

ToDosController.destroy = function (req, res) {
	console.log("destroy action called");
	res.send(200);
}

ToDosController.update = function (req, res) {
	console.log("вызвано действие: обновить");
	res.send(200);
}

module.exports = ToDosController; 