// testDatabase.ts

import connectDB from './database';
import User from './src/models/User';

// Testing database operations with a function
const testDatabase = async () => {
    await connectDB();

    // Creating a new user
    const newUser = new User({
        username: 'testuser',
        password: 'password', // We gotta hash these passwords later. Just testing now tho
        email: 'test@example.com',

    });

    try {
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
    } catch (err) {
        console.error('Error saving user:', err.message)
    }
}

testDatabase();