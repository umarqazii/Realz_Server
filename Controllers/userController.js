import Users from '../Models/Users.js';

// Controller function to add a user
export const addUser = async (req, res) => {
  try {
    const { userid, name, email, phone, address } = req.body;

    // Create a new user instance
    const newUser = new Users({
      userid,
      name,
      email,
      phone,
      address,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({
      message: 'User added successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({
      message: 'Failed to add user',
      error: error.message,
    });
  }
};

// Controller function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find(); // Retrieve all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};

// Controller function to get a user by ID
export const getUserFromId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findOne({userid:userId}); // Find user by ID

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res.status(500).json({
      message: 'Failed to retrieve user',
      error: error.message,
    });
  }
};

// Controller function to delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Users.findOneAndDelete({userid:userId}); // Delete user by ID

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Failed to delete user',
      error: error.message,
    });
  }
};
