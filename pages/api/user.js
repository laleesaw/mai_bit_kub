import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function handler(req,res){
    try{
        switch (req.method){
            case "GET":{
                const users = await prisma.user.findMany({
                    include:{ budgets: true, group_members: true, user_activities: true, availabilities: true, groups_created: true }
                });
                return res.status(200).json(users)
            }
            
            case "POST":{
                const {email,password,name} = req.body;
                const newUser = await prisma.user.create({
                    data:{email,password,name},
                });
                return res.status(200).json(newUser)
            }

            case "PUT":{
                const {user_id,name: newName} = res.body;
                const  updateuser = await prisma.user.update({
                    where:{user_id},
                    data:{name: newName },
                });
                return res.status(200).json(updateuser);
            }

            case "DELETE":{
                const { user_id: deleteId } = req.body;
                await prisma.user.delete({ where: { user_id: deleteId } });
                return res.status(200).json({ message: "User deleted" });
            }

            default:
                return res.status(405).json({message:"Method Not Allowed"})
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal Server Error"})
    }
}