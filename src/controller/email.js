const Pool = require('pg').Pool
const sgMail = require('@sendgrid/mail');
import {v4 as uuidv4 } from 'uuid';
const { body, validationResult } = require('express-validator');


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

     async function sendEmail(req, res){
        try {
            const pool = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: process.env.POSTGRES_PORT
              });
              const msgId =uuidv4();
              const msg = {
                ID : msgId,
<<<<<<< Updated upstream
                to: 'ishteachy@gmail.com', // Change to your recipient
=======
                to: ['ishteachy@gmail.com','mirindisaidi19@gmail.com','gemini.pacella@gmail.com'], // Change to your recipient
>>>>>>> Stashed changes
                from: 'ishimwe96@gmail.com', // Change to your verified sender
                subject: 'test sendgrid',
                text: 'email test',
                //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
              }
              await sgMail
                .send(msg)
                .then(() => {
                    const query = {
                    text: 'INSERT INTO emails(ID, sender, receiver, subject, text) VALUES($1, $2, $3, $4, $5)',
<<<<<<< Updated upstream
                    values: [msg.ID, msg.from, msg.to, msg.subject, msg.text],
=======
                    values: [msg.ID, msg.from, msg.to.join(''), msg.subject, msg.text],
>>>>>>> Stashed changes
                    };

                pool.query(query);
                res.status(201).json({
                    status: 201,
                    message: "Email sent successfully",
                    data:msg
                })
                console.log('Email sent and saved', msg.ID)
            })
            .catch((error) => {
            console.error(error)
            })
            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
            
        }
    }


export default sendEmail