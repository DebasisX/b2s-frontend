"use client";
import { useEffect, useState } from "react";
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
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("ui57YC-hry6CSdC0a"); // Public Key
  }, []);

  const handleClick = () => {
    setShowForm(true);
    setSubmitted(false);
    setAlreadySubmitted(false);
    setError("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: ""
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Check for duplicate submissions
    const submittedEmails = JSON.parse(localStorage.getItem("submittedEmails") || "{}");
    if (submittedEmails[formData.email]) {
      setAlreadySubmitted(true);
      setIsLoading(false);
      return;
    }

    try {
      await emailjs.send(
        "service_ntvp4mj", // Service ID
        "template_jvl0c9s", // Template ID
        formData
      );

      // Save submission to localStorage
      submittedEmails[formData.email] = true;
      localStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));

      setSubmitted(true);
    } catch (err) {
      console.error("Email send error:", err);
      setError(err.text || "Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-blue-700 text-white px-6 py-20 text-center relative">
      <h1 className="text-4xl font-bold mb-4">B2S: Bridging Brands to Retailers</h1>
      <p className="mb-6 text-lg max-w-5xl mx-auto">
        A smart platform that connects brands directly with retailers and local dealers, 
        removing middlemen and simplifying operations. Powered by AI, it offers GST billing, 
        real-time delivery tracking, and secure, seamless transactions.
      </p>

      {!showForm && (
        <button
          onClick={handleClick}
          className="bg-white text-blue-700 font-bold px-6 py-3 rounded hover:bg-gray-100 transition"
          aria-label="Contact us"
        >
          Contact Us!
        </button>
      )}

      {showForm && !submitted && !alreadySubmitted && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
            aria-label="Your name"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
            aria-label="Your email"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone No."
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
            aria-label="Your phone number"
          />
          <input
            type="text"
            name="company"
            placeholder="Your Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
            aria-label="Your company name"
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-blue-900"
            aria-label="Your address"
          />

          <button
            type="submit"
            className="bg-white text-blue-900 font-bold px-6 py-3 rounded hover:bg-gray-100 transition disabled:opacity-50"
            disabled={isLoading}
            aria-label="Submit form"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>

          {error && (
            <p className="text-red-300 font-semibold">
              {error}
            </p>
          )}
        </form>
      )}

      {submitted && (
        <div className="mt-6">
          <p className="text-green-300 font-semibold">
            ✅ Thank you! We've received your info.
          </p>
          <p className="text-sm mt-2">
            We'll contact you within 3 business days.
          </p>
        </div>
      )}

      {alreadySubmitted && !submitted && (
        <div className="mt-6">
          <p className="text-yellow-200 font-semibold">
            ⚠️ This email has already been used to submit a request.
          </p>
          <button
            onClick={handleClick}
            className="mt-2 text-sm underline hover:text-blue-200"
            aria-label="Try different email"
          >
            Want to try with a different email?
          </button>
        </div>
      )}
    </section>
  );
}
