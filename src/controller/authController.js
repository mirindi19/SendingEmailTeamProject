import Models from "../database/models";
const {users}=Models;
import bcrypt from "bcrypt";
import {v4 as uuidv4 } from 'uuid';

class authController{
    static async creatAccount(req, res){
        try {
            const {Fullname, email,password}=req.body;
            const Myuuid =uuidv4();
            const hash = await bcrypt.hashSync(password, 10);
            const checkUser = await users.findOne({
                where:{email:email}
            });
            if(checkUser){
                return res.status(400).json({
                    status:400,
                    message:"Email already exist"
                    
                })
            }
            else{
                const createDate = await users.create({
                    id:  Myuuid,
                    Fullname,
                    email,
                    role:"user",
                    password: hash,
                    status:false,
                    
                });
                res.status(200).json({
                    status: 200,
                    message: "Account created",
                    data:createDate
                })

            }
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
            
        }
    }
}

export default authController