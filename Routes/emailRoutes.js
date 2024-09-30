import { Router } from 'express';
import { sendEmail, sendWeatherData } from '../Controllers/sendEmail.js';

const router = Router();

// Send email
router.post('/sendemail', sendEmail);
router.post('/sendweatherdata', sendWeatherData);



export default router;
