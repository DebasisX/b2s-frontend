"use client";
export function Hero() {
  return (
    <section className="bg-blue-700 text-white px-6 py-20 text-center relative">
      <br />
      <br />
      <h1 className="text-4xl font-bold mb-4">B2S: Bridging Brands to Retailers</h1>

      <p className="mb-6 text-lg max-w-5xl mx-auto">
        A smart platform that connects brands directly with retailers and local dealers, removing middlemen and simplifying operations.
        Powered by AI, it offers GST billing, real-time delivery tracking, and secure, seamless transactions.
      </p>

      <br />
      <div className="flex justify-center space-x-4">
        {/* Contact Us button opens email client */}
        <a
          className="bg-white text-blue-700 font-bold px-6 py-3 rounded hover:bg-gray-100 transition"
          href="mailto:b2s.co.in@gmail.com"
        >
          Contact Us!
        </a>

        
      </div>
    </section>
  );
}
