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


import { ICategory } from "@/lib/database/models/category-model";
import { startTransition, useState } from "react";
import { Input } from "@/components/ui/input";

type DropdownTypeProps ={
    value?:string,
    onChangeHandler?:()=>void;
}
const Dropdown = ({onChangeHandler,value}:DropdownTypeProps) => {
    const[newCategory,setNewCategory] = useState('')
    const[categories,setCategories] = useState<ICategory[]>([
        
    ])

const handleAddCategory =()=>{
    console.log(newCategory)
}

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
  <SelectTrigger className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 placeholder:text-grey-500 px-4 border-none focus-visible:ring-transparent ">
    <SelectValue placeholder="Category"/>
  </SelectTrigger>
  <SelectContent>
    {
        categories.length > 0 && categories.map((category)=>(
            <SelectItem key={category._id} value={category._id}>
                {category.name}
            </SelectItem>
        ))}
    <AlertDialog >
  <AlertDialogTrigger className="flex w-full h-10 items-center justify-center bg-blue-600 focus-visible:ring-offset-0 placeholder:text-grey-500 px-4 border-none focus-visible:ring-transparent hover:bg-blue-500 rounded-sm">Add a new Category</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Add a Category</AlertDialogTitle>
      <AlertDialogDescription>
        <Input type="text" placeholder="Category Name" onChange={(e)=>setNewCategory(e.target.value)}/>
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

export default Dropdown
