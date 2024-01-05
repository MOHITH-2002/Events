// components/ShadowForm.tsx
import React, { useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ShadowFormProps {}

const ShadowForm: React.FC<ShadowFormProps> = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (event: FormEvent) => {
    event.preventDefault();

    if (form.current) {
      emailjs.sendForm('service_c0imuig', 'template_p48nfht', form.current, 'm1uUIph7eXSi1Jmj9')
        .then(() => {
          toast.success("Thanks! I'll get back to you asap :)")
            if (form.current) {
            form.current.reset();
          }        })
        .catch((error: { text: any; }) => {
          console.error(error.text);
        });
    }
  };

  return (
    
    <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-10 wrapper items-center">
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="user">User name</Label>
      <Input type="text" id="user" placeholder="username" required/>
    </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" required/>
    </div>

      <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" required/>
    </div>

      <div className="">
        <Button type="submit">Send a message</Button>
      </div>
    </form>
    
  );
};

export default ShadowForm;
