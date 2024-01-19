import jwt from 'jsonwebtoken'
import UserModel from "../models/UserModel.js"
class UserHandler {
    static default_Get = (req, res)=>{
        res.json({"message" : "app is running"})
    }

    static signUp = async (req, res)=>{
        const {email, password} = req.body;
        const validate = await UserModel.findOne({email});
        let success = true;
        if(validate)
        {
            success = false
            return res.json({"message" : "Please use different email id", success})
        }
        const user = new UserModel(req.body)
        const data = await user.save()
        res.json({message : "User Created ", success})
    }

    static logIn = async (req, res)=>{
        try {
            const {email, password} = req.body;
            const obj = await UserModel.findOne({email, password})
            if(!obj)
            {
                res.json({login : false,message : "Please try again "})
                
            }

            if(obj.token == null)
            {
                const token = jwt.sign(obj._id.toString(), "secretkey");
                await UserModel.findByIdAndUpdate(obj._id, {$set : {token}}, {returnOriginal : false});
                
            }
            res.json({login : true, message : "login successfull", id : obj.id})
        }
        catch (error)
        {
            
        }
    }


}

export default UserHandler;