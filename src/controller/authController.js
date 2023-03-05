import Models from "../database/models";
const {users}=Models;
import bcrypt from "bcrypt";
import {v4 as uuidv4 } from 'uuid';
import {encode, decode} from "../helper/jwtTokenize"
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

    
    static async Login(req, res){
        try {
            const {email,password}=req.body
            const findUser = await users.findOne({
                where: {email:email}
            })
            if(!req.user){
                res.status(404).json({
                    status: 404,
                    message:"Account don't exit"
                })
            }
            else{
                const dbEmail = req.user.email
                const dbPassword = req.user.password
                const dbRole= req.user.role
                const decreptedPassword = await bcrypt.compare(password, dbPassword)
                if(dbEmail == email){
                    if(decreptedPassword){
                        const token=await encode({
                            email,
                            dbRole
                        });

                        const decodeToken = await decode(token);
                        const role = decodeToken.dbRole
                        const emailfromtoken =decodeToken.email
                        return res.status(200).json({
                            stastus: 200,
                            message: "Login succefull", 
                            data:{
                                role,
                                emailfromtoken,
                                token
                            }
                        })
                    }else{
                        res.status(400).json({
                            stastus: 400,
                            message:"Wrong Password"
                        })
                    }
                }else{
                    res.status(400).json({
                        stastus: 400,
                        message:"Wrong Email"
                    })
                }
            }
            
        } catch (error) {
            res.status(500).json({
                stastus: 500,
                message:"server problem" +error.message
            })
        }
    }
}

export default authController