"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useUploadThing } from '@/lib/uploadthing'
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
import {useRouter}  from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event-actions"
import { IEvent } from "@/lib/database/models/event-model"


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
  url:''
}


type EventFormTypeProps = {
    userId:string,
    type:"Create" | "Update"
    event?:IEvent,
    eventId?:string | undefined
}

const Eventform = ({userId,type,event,eventId}:EventFormTypeProps) => {
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader')


  const startingvalues = event && type ==="Update" ? {

    ...event,
    startDateTime:new Date(event.startDateTime),
    endDateTime:new Date(event.endDateTime)
  }
   :eventDefaultValues

      const [files, setFiles] = useState<File[]>([])

    const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: startingvalues
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values
    let uploadedimgUrl = values.imageUrl
    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedimgUrl = uploadedImages[0].url
    }
    
    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedimgUrl },
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!eventId) {
      router.back()
      return;
    }
      try {

        const updateEvents = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedimgUrl, _id:eventId},
          path: `/events/${eventId}`
        })

        if(updateEvents) {
          form.reset();
          router.push(`/events/${updateEvents._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
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
                <Input placeholder="Event Location or online" {...field} className="bg-[#F5F5F5] dark:bg-accent focus-visible:ring-offset-0 placeholder:text-grey-500  px-4 border-none focus-visible:ring-transparent "/>
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
