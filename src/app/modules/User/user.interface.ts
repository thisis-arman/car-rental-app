import { Model } from "mongoose"


export type TUser = {

    name: string,
    email: string,
    role: "admin" | "user",
    password: string,
    phone: string,
    address: string
    
}

export interface UserModel extends Model<TUser>{
    isUserExists(id:string):Promise<TUser|null>
}