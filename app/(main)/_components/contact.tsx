"use client"
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';



import React, { useRef, FormEvent } from 'react';

import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
// import { sendMail } from '@/lib/actions/sendmail';

interface ContactProps {}

const ShadowForm: React.FC<ContactProps> = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm('service_7ntusl9', 'template_zofxpnl', form.current, 'm1uUIph7eXSi1Jmj9')
        .then(() => {
          toast.success("Thanks! I'll get back to you asap :)")
          if (form.current) {
            form.current.reset();
          }
        })
        .catch((error) => {
          console.log(error.text);
        });
    }
  };





// // handle submit
//   const handlesubmit = async ()=>{
//     console.log("sent");
    
//     await sendMail()
    
//   }

  return (

      <>
        <div className="wrapper ">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-10 wrapper items-center">
       <div className="grid w-full max-w-sm items-center gap-1.5">
       <Label htmlFor="user">User name</Label>
       <Input type="text" id="user" placeholder="username" name="user_name" required/>
     </div>

       <div className="grid w-full max-w-sm items-center gap-1.5">
       <Label htmlFor="email">Email</Label>
       <Input type="email" name="user_email" id="email" placeholder="Email" required/>
     </div>

       <div className="grid w-full max-w-sm gap-1.5">
       <Label htmlFor="message">Your message</Label>
       <Textarea placeholder="Type your message here." name="message" id="message" required/>
     </div>

       <div className="grid w-full max-w-sm gap-1.5">
         <Button type="submit" value="Submit">Send a message</Button>
       </div>
     </form>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />


        {/* <Button onClick={handlesubmit}>resend</Button> */}
      
      </>

  );
};

export default ShadowForm;
