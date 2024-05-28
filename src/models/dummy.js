const mongoose = require('mongoose');
const User = require('./user-model');

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://vinitJain:t6zaKvYJh!t4263@cluster0.8bi136y.mongodb.net/brogrammers2?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      // Create two user documents with the role 'admin'
      const users = await User.create([
        {
          _id: '6150e7838cfc13c43e0f4be3',
          name: 'Admin 1',
          email: 'admin1@example.com',
          password: 'password1',
          role: 'admin',
        },
        {
          _id: '6150e7838cfc13c43e0f4be4',
          name: 'Admin 2',
          email: 'admin2@example.com',
          password: 'password2',
          role: 'admin',
        },
      ]);

      console.log('Admin users created:', users);
    } catch (error) {
      console.error('Error creating admin users:', error);
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
