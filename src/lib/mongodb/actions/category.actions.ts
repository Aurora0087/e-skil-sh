'use server'

import Category from "@/lib/model/category.model"
import { connectToDatabase } from "../connect"

export async function createCategory({categoryName}:{categoryName:string}) {
    try {
        
        await connectToDatabase()

        const newCategory = await Category.create({ name: categoryName });

        return JSON.parse(JSON.stringify(newCategory))
    } catch (error) {
        console.log(error)
    }
}

export async function getAllCategory() {
    try {
        await connectToDatabase();

        const categories = await Category.find();
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        console.log(error)
    }
}