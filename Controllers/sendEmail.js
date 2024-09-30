import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Ensure you load environment variables from .env

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'umarqazii983@gmail.com',
        pass: process.env.gmail_pass, // Use the environment variable for the password
      },
    });

    const mailOptions = {
      from: 'umarqazii983@gmail.com',
      to: email,
      subject: 'Realz Server',
      text: `Hello from Realz Server Created by Umar Qazi`,
    };

    // Send email and await the result
    const info = await transporter.sendMail(mailOptions);

    // If the email is sent successfully, return a success response
    res.status(200).json({
      message: 'Email sent successfully!',
      info: info.response,
    });
  } catch (err) {
    console.error('Error sending email:', err);

    // Return error response if email sending fails
    res.status(500).json({
      message: 'Failed to send email',
      error: err.message,
    });
  }
};

export const sendWeatherData = async (req, res) => {
    try {
      const { email, city } = req.body;
      console.log(email, city);
  
      // Fetch weather data from the external API
      const weatherResponse = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);
      const { temperature, description, forecast } = weatherResponse.data;
  
      // Format the forecast data
      let forecastText = forecast.map(day => `Day ${day.day}: Temp - ${day.temperature}, Wind - ${day.wind}`).join('\n');
  
      const weatherMessage = `Weather in ${city}:
      Temperature: ${temperature}
      Description: ${description}
      
      Forecast:
      ${forecastText}`;
  
      // Create transporter object using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'umarqazii983@gmail.com',
          pass: process.env.gmail_pass, // Use the environment variable for the password
        },
      });
  
      const mailOptions = {
        from: 'umarqazii983@gmail.com',
        to: email,
        subject: `Weather Data for ${city}`,
        text: weatherMessage,
      };
  
      // Send email and await the result
      const info = await transporter.sendMail(mailOptions);
  
      // If the email is sent successfully, return a success response
      res.status(200).json({
        message: 'Weather data sent successfully!',
        info: info.response,
      });
    } catch (err) {
      console.error('Error sending weather data email:', err);
  
      // Return error response if email sending fails
      res.status(500).json({
        message: 'Failed to send weather data',
        error: err.message,
      });
    }
  };