import React, { useRef } from "react";
import emailjs from "@emailjs/browser";


// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_v6wdrhl",
        "template_ug9yumg",
        form.current,
        "3fvOAug7tSrUli1hY"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (

 
    <div className="container contact-form-container">
    <div>
        <h1 className="primary-heading">Have Questions In Mind?</h1>
        <h1 className="primary-heading">Let Us Help You</h1>
    </div>
    <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input className="contact-form-input" type="text" name="user_name" />
        <label>Email</label>
        <input className="contact-form-input" type="email" name="user_email" />
        <label>Message</label>
        <textarea className="contact-form-textarea" name="message" />
        <input className="contact-form-button mt-5" type="submit" value="Send" />
    </form>
</div>


   
  );
};

export default Contact;
