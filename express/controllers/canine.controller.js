import mongoose from 'mongoose';
import {canineSchema} from '../models/canine.model';

const Dog = mongoose.model('Dog', canineSchema);


export const getDog = (req, res) => {
    //find all the dogs we have
        Dog.find({}, (err, Dog) => {
            if (err) {
                res.send(err);
            }
            res.json(Dog)
        });
    };