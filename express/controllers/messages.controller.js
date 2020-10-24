

const Msg = require('../models/msg.model');

/* create */
module.exports.new = async (req, res) => {
    // new enquiry
    const newMsg = new Msg(req.body);

    try {
        // save complete
        const saved = await newMsg.save();
        return res.status(200).json({
            msg: "new msg created",
            msg_id: saved._id
        })
    } catch (error) {
        return res.status(400).json({ msg: "new msg error", err: error });
    }
}

/* read */
/* read all */
module.exports.read = async (req, res) => {
    const msg = await Msg.find();

    try {
        return res.status(200).json({ list: msg });
    } catch (error) {
        return res.status(400).json({ msg: "read all msg error", err: error });
    }
}

/* read by id */
module.exports.readOne = async (req, res) => {
    const msg = await Msg.find({ _id: req.body.id });

    try {
        return res.status(200).json(msg);
    } catch (error) {
        return res.status(400).json({ msg: "read one msg error", err: error });
    }
}


/* read from user */
module.exports.readUser = async (req, res) => {
    const msg = await Msg.find(req.body);

    try {
        if(msg.length === 0)
            return res.status(200).json({ list: [] });
        else
            return res.status(200).json({ list: msg });
    } catch (error) {
        return res.status(400).json({ msg: "read user msg error", err: error });
    }
}

/* update */
// new, read, resolved
module.exports.updateStatus = async (req, res) => {
    const msg = await Msg.findOne({ _id: req.body.id });
    if(!msg) return res.status(400).json({ msg: "no msg found for update" });

    console.log("hey");
    msg.status = req.body.status;

    try {
        await msg.save();
        return res.status(200).json({ msg: "msg status updated", newStatus: msg.status });
    } catch (error) {
        return res.status(400).json({ msg: "update msg error", err: error });
    }
}

/* delete */
module.exports.delete = async (req, res) => {
    const msg = Msg.find({ _id: req.body.id });
    if(!msg)
        return res.status(400).json({ msg: "delete msg error", err: error });

    try {
        await msg.remove();
        return res.status(200).json({ msg: 'succesfully deleted a message' });
    } catch (error) {
        return res.status(400).json({ msg: "delete msg error", err: error });
    }
}