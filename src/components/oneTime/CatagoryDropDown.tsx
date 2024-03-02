'use client'
import React, { startTransition, useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { ICategory } from '@/lib/model/category.model'
import { createCategory, getAllCategory } from '@/lib/mongodb/actions/category.actions'



type DropdownProps = {
    value: string,
    onChangeHandeler: () => void
}

function CatagoryDropDown({ onChangeHandeler, value }: DropdownProps) {

    const [catagorys, setCatagorys] = useState<ICategory[]>([])

    const [newCategory, setNewCategory] = useState('')

    function handleAddCategory() {
        createCategory({
            categoryName:newCategory.trim()
        }).then((category) => {
            setCatagorys((preCategory)=>[...preCategory,category])
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategory()
            categoryList && setCatagorys(categoryList as ICategory[])
        }

        getCategories()
    }, [])
    
    return (
        <Select onValueChange={onChangeHandeler} defaultValue={value}>
            <SelectTrigger className="w-full text-slate-800">
                <SelectValue placeholder="Select Category" className='' />
            </SelectTrigger>
            <SelectContent className=''>
                {
                    catagorys.length > 0 && catagorys.map((catagory) => (
                        <SelectItem
                            className=' text-black font-semibold border-b'
                            key={catagory.id} value={catagory._id}>{catagory.name}</SelectItem>
                    ))
                }
                <AlertDialog>
                    <AlertDialogTrigger className=' w-full rounded-sm text-blue-500 hover:text-blue-700 py-2'>+ add catagory</AlertDialogTrigger>
                    <AlertDialogContent className=' bg-slate-50'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type='text' placeholder='Category name' className='text-black' onChange={(e)=>setNewCategory(e.target.value)}/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
        </Select>

    )
}

export default CatagoryDropDown