"use client";
import { useState } from "react";
import emailjs from 'emailjs-com';

export function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if this email has already submitted
    const submittedEmails = JSON.parse(localStorage.getItem("submittedEmails") || "[]");

    if (submittedEmails.includes(formData.email)) {
      alert("This email has already been used to submit the form.");
      return;
    }

    try {
      const emailResponse = await emailjs.send(
        'service_1o2gqon',
        'template_jvl0c9s',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          address: formData.address,
        },
        'chlo41eWOmEz5Xmob'
      );

      console.log('Email sent successfully:', emailResponse);

      // Store submitted email to localStorage
      submittedEmails.push(formData.email);
      localStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));

      setSubmitted(true);
    } catch (error) {
      console.error("Error during submission or email:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <section className="bg-blue-700 text-white px-6 py-20 text-center relative">
      <br /><br />
      <h1 className="text-4xl font-bold mb-4">B2S: Bridging Brands to Retailers</h1>
      <p className="mb-6 text-lg max-w-5xl mx-auto">
        A smart platform that connects brands directly with retailers and local dealers, removing middlemen and simplifying operations.
        Powered by AI, it offers GST billing, real-time delivery tracking, and secure, seamless transactions.
      </p>
      <br />

      {!showForm && !submitted && (
        <button
          onClick={handleClick}
          className="bg-white text-blue-700 font-bold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Contact Us!
        </button>
      )}

      {showForm && !submitted && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone No."
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
          />
          <input
            type="text"
            name="company"
            placeholder="Your Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
          />

          <button
            type="submit"
            className="bg-white text-blue-900 font-bold px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            Send
          </button>
        </form>
      )}

      {submitted && (
        <p className="mt-6 text-green-300 font-semibold">
          Thank you! We've received your info.
        </p>
      )}
    </section>
  );
}
