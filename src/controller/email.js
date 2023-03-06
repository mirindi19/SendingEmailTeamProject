const Pool = require('pg').Pool
const sgMail = require('@sendgrid/mail');
import {v4 as uuidv4 } from 'uuid';
const { body, validationResult } = require('express-validator');


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

     async function sendEmail(req, res){
         const msgId =uuidv4();
         const msg = {
           ID : msgId,
          // to : 'ishteachy@gmail.com',
           to: ['ishteachy@gmail.com','mirindisaidi19@gmail.com','ishimwe96@gmail.com'], // Change to your recipient
           from: 'gemini.pacella@gmail.com', // Change to your verified sender
           subject: 'test sendgrid',
           text:'req.body.subject',
           //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
         }
        try {
            const pool = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: process.env.POSTGRES_PORT
              });
              await sgMail
                .send(msg)
                .then(() => {
                    const query = {
                    text: 'INSERT INTO emails(ID, sender, receiver, subject, text) VALUES($1, $2, $3, $4, $5)',
                    values: [msg.ID, msg.from, msg.to.join(''), msg.subject, msg.text],
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