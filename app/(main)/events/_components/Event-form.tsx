"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/types/validator"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { Fileuploader } from "./Fileuploader"
import { useState } from "react"
import Image from "next/image"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/spinner/Spinner"


  const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}


type EventFormTypeProps = {
    userId:string,
    type:"Create" | "Update"
}

const Eventform = ({userId,type}:EventFormTypeProps) => {
      const [files, setFiles] = useState<File[]>([])

    const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues
  })

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">

        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Event Title" {...field} className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 placeholder:text-grey-500  px-4 border-none focus-visible:ring-transparent "/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value={field.value} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              
              <FormControl className="">
                <Textarea placeholder="Description" {...field} className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 placeholder:text-grey-500  px-4 border-none focus-visible:ring-transparent "/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
              <Fileuploader onChangeHandler={field.onChange} imageUrl={field.value} setFiles={setFiles}  />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

          {/* location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              
              <FormControl className="bg-[#F5F5F5] dark:bg-accent rounded-sm">
                <div className="flex items-center px-1 ">
                <Image src="/location.svg" className="" width={20} height={20} alt="location"/>
                <Input placeholder="Event Location " {...field} className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 placeholder:text-grey-500  px-4 border-none focus-visible:ring-transparent "/>
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Start date picker */}
        <div className="flex flex-col gap-5 md:flex-row md:justify-center">
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem>
              
              <FormControl className="bg-[#F5F5F5] dark:bg-accent rounded-sm">
                <div className="flex items-center px-1 pt-2 pb-2">
                <Image src="/calender.svg" className="" width={20} height={20} alt="calender"/>
                <span className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 text-gray-400 px-4 border-none focus-visible:ring-transparent ">StartDateTime:</span>
                <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        className="cursor-pointer bg-transparent text-blue-600 border-none focus-visible:ring-offset-0 outline-none"
                      />
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {/* end time */}
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem>
              
              <FormControl className="bg-[#F5F5F5] dark:bg-accent rounded-sm">
                <div className="flex items-center px-1 pt-2 pb-2">
                <Image src="/calender.svg" className="" width={20} height={20} alt="calender"/>
                <span className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 text-gray-400 px-4 border-none focus-visible:ring-transparent ">EndDateTime:</span>
                <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        className="cursor-pointer bg-transparent text-blue-600 border-none focus-visible:ring-offset-0 outline-none"
                      />
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        {/* price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              
              <FormControl className="bg-[#F5F5F5] dark:bg-accent rounded-sm">
                <div className="flex items-center px-1 ">
                <Image src="/rupee.svg" className="" width={20} height={20} alt="location"/>
                <Input type="number" placeholder="Price" {...field} className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 placeholder:text-grey-500  px-4 border-none focus-visible:ring-transparent "/>
                <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-600">Free Ticket</label>
                                <Checkbox
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                id="isFree" className="mr-2 h-5 w-5 border-2 border-blue-600" />
                              </div>
          
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />   
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {/* link */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              
              <FormControl className="bg-[#F5F5F5] dark:bg-accent rounded-sm">
                <div className="flex items-center px-1 ">
                <Image src="/url.svg" className="" width={20} height={20} alt="location"/>
                <Input placeholder="url" {...field} className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 placeholder:text-grey-500  px-4 border-none focus-visible:ring-transparent "/>
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit"
        disabled={form.formState.isSubmitting}
        >
          {
            form.formState.isSubmitting ? (<Spinner/>) :`${type} Event`
          }
        </Button>
      </form>
    </Form>
  )

}

export default Eventform
