const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    staff: {
        type: Boolean,
        require: true,        
        default: false
    },
    access: {
        when: {
            type: Date,
            require: true,
            default: Date.now
        },
        success: {
            type: Boolean,
            require: true,            
        }
    },
    dog: {
        name: {
            type: String,
            require: true,
        },
        tag: {
            type: Array,
            require: false,            
        },
        interaction: [{
            with: {
                type: Schema.Types.ObjectId,
                require: true
            },
            message: {
                type: String,                
            },
            relation: {
                type: String,                
            },
            gift: {
                type: Schema.Types.ObjectId,
            }
        }]        
    },
    card: {
        number: {
            type: String,
            require: true,
            trim: true
        },
        type: {
            type: String,
            require: true,
            trim: true
        },
        holder: {
            type: String,
            require: true,
            trim: true
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;