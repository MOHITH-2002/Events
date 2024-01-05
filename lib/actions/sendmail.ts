// "use server"
// import { Resend } from "resend";
// import { handleError } from "../utils";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendMail() {


//     try {
//       await resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: '',
//     subject: 'Hello World',
//     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
//         });
//       return ;
//     } catch (error) {
//       handleError(error)
//     }
// }
