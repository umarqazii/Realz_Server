import { Router } from 'express';
import { addUser, getAllUsers, getUserFromId, deleteUser } from '../Controllers/userController.js';

const router = Router();

// Route to add a user
router.post('/adduser', addUser);

// Route to get all users
router.get('/allusers', getAllUsers);

// Route to get a user by ID
router.get('/get-user/:id', getUserFromId);

// Route to delete a user by ID
router.delete('/delete-user/:id', deleteUser);

export default router;
