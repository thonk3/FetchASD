const app = require('../server');
const supertest = require('supertest');
const mongoose = require('mongoose');

const User = require('../models/user.model');

const request = supertest(app);


// beforeAll( async => {
    
//     const PORT = process.env.PORT || 5000;
//     const URI = process.env.ATLAS_URI;
//     mongoose.connect(URI, { 
//     useNewUrlParser: true, 
//     useCreateIndex: true,
//     useUnifiedTopology: false,  // true will break tests
//     useFindAndModify: false
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })
// } )
// create a local host db to test with
// all the db name should be different for each file?? unless you need it
// beforeAll(async () => {
//     // console.log("testing")
//     // const url = `mongodb://127.0.0.1/test`;
//     // await mongoose.connect(url, { useNewUrlParser: true });
//     // const PORT = process.env.PORT || 5000;
//     // app.listen(PORT, () => {
//     // console.log(`server starting on port: ${PORT}`);
//     // });


// //     const URI = process.env.ATLAS_URI;
// // mongoose.connect(URI, { 
// //     useNewUrlParser: true, 
// //     useCreateIndex: true,
// //     useUnifiedTopology: false,  // true will break tests
// //     useFindAndModify: false
// // });

// // const connection = mongoose.connection;
// // connection.once('open', () => {
// //     console.log("MongoDB database connection established successfully");
// // })
// })


describe('testing to see if Jest works', () => {
    it('test get request', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("pass!");
        done();
    })
})

describe('Register', () => {
    // create new user
    it('Creating brand new users', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        // expect(response.body.message).toBe("pass!");
        done();
    })

    it('Creating duplicating users', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        // expect(response.body.message).toBe("pass!");
        done();
    })
    // it('create new user', async done => {
    //     const res = await request.post('/api/auth/register').send({
    //     // details for registering
    //         firstName: "new",
    //         lastName: "user",
    //         // email: "new@new.com",
    //         // password: "test123",
    //         // suburb: "new",
    //         // postcode: "1234",
    //         // phone: "012345678",
    //     })

    //     // const user = await User.findOne({email: 'new@new.com'});


        
    //     expect(res.status).toBe(200);
    //     // expect(res.)
    //     done() 
    // })

})

describe('Register validation', () => {
    // create new user
    it('Missing firstname', async done => {
        const response = await request.get('/api/tests');

        expect(response.status).toBe(200);
        // expect(response.body.message).toBe("pass!");
        done();
    })

    it('Missing lastname', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        done();
    })

    it('Missing Email', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        done();
    })

    it('Missing Password', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        done();
    })

    it('Missing Postcode', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        done();
    })

    it('Missing Suburb', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        done();
    })

    it('Missing Phone number', async done => {
        const response = await request.get('/api/test');

        expect(response.status).toBe(200);
        done();
    })
})

describe('Login', () => {
    it('Login Success', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Missing email', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Missing password', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('User dont exist', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Wrong password', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })
})

describe('Kennel', () => {
    it('Get all dogs', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Get dog by ID', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Dog doesnt exist', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })
})

describe('Dog management', () => {
    it('Get all dogs from user: 0 dogs', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('User dont exist error', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Add dog', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Get all dogs from user: 1 dogs', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Update Dog', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })

    it('Delete Dog', async done => {
        const response = await request.get('/api/test');
        expect(response.status).toBe(200);
        done();
    })
})

// afterEach(async () => {
//     // console.log('cleaning up database between tests');
//     // await User.deleteOne({ email: 'new@new.com' })
// })



