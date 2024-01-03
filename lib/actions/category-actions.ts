"use server"

import { connectToDatabase } from "../database"
import Category from "../database/models/category-model"
import { handleError } from "../utils"
type Categorytype ={
    categoryName:string
}
export const createCategory = async({categoryName}:Categorytype)=>{
    try {
        await connectToDatabase();
        const newCategory = await Category.create({name:categoryName})
        return JSON.parse(JSON.stringify(newCategory))
    } catch (error) {
        handleError(error)
    }

}

export const getAllCategory = async()=>{
    try {
        await connectToDatabase();
        const allCategories = await Category.find();
        return JSON.parse(JSON.stringify(allCategories))
    } catch (error) {
        handleError(error)
    }
}