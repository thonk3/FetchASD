const Friend = require('../models/friend.model');

module.exports.getFriends = async(req, res) => {
	await Friend.find({ userID: req.params.id })
		.then(friends => {
			return res.status(200).json({
				friends: friends
			})
		})
		.catch(err => {
			return res.status(400).json({
				error: 'Could not find friends'
			})
		})
}

module.exports.createFriend = async(req, res) => {
	let newFriend = new Friend(req.body);
	console.log(req.body);
	newFriend.status = "Requested";
	newFriend.save()
		.then(newFriend => {
			return res.status(200).json({
				message: 'New friend successfully created',
				friend: newFriend
			})
		})
		.catch(error => {
			return res.status(400).json({
				error: 'Could not save to the database, please try again'
			})
		})
}

module.exports.acceptFriendRequest = async(req, res) => {
	let friendRequest = Friend.findById(req.params.id);
	if (!friendRequest)
		return res.status(400).json({
			error: 'Could not find friend with that ID'
		})
	friendRequest.status = "Accepted";
	(await friendRequest).save()
		.then(friend => {
			return res.status(200).json({
				message: 'Friend request has been accepted'
			})
		})
		.catch(error => {
			return res.status(400).json({
				error: 'Could not save to the database, please try again'
			})
		})
}

module.exports.declineFriendRequest = async(req, res) => {
	let friendRequest = Friend.findById(req.params.id);
	if (!friendRequest)
		return res.status(400).json({
			error: 'Could not find friend with that ID'
		})
	(await friendRequest).deleteOne()
		.then(friend => {
			return res.status(200).json({
				message: 'Friend request has been declined'
			})
		})
		.catch(error => {
			return res.status(400).json({
				error: 'Could not save to the database, please try again'
			})
		})
}