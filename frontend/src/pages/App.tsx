import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "components/ImageUpload"; // <-- Import ImageUpload

// SVG Icon Components (Heroicons style)
const ArrowUpTrayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-emerald-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-emerald-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-emerald-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 9l2.846-.813a4.5 4.5 0 003.09-3.09L21 1.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09L15 9l2.25-2.25L18.25 9zM18.25 9l2.846.813a4.5 4.5 0 003.09 3.09L21 15.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L15 9l2.25 2.25L18.25 9z" />
  </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 text-emerald-500 mr-3">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);


export default function App() {
  return (
    <div className="min-h-screen bg-lime-50 text-gray-800 font-sans">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-700 tracking-tight">Prakriti</h1>
          <nav>
            {/* Future: <Button variant="ghost">Login</Button> */}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-12 pb-24">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 mb-20 shadow-lg">
           <div 
            className="absolute inset-0 -z-10 opacity-50"
            style={{
              backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(110, 231, 183, 0.2) 0%, transparent 30%),
                radial-gradient(circle at 80% 70%, rgba(167, 243, 208, 0.3) 0%, transparent 40%)
              `,
            }}
          ></div>
          <h2 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
            Turn Your <span className="text-emerald-600">Waste</span> into <span className="text-emerald-600">Wonder</span>
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Prakriti helps you identify waste with a simple snap and discover creative, eco-friendly ways to recycle and reuse.
          </p>
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-10 py-3.5 text-lg font-semibold transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg">
            Start Your Green Journey
          </Button>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 bg-white rounded-3xl shadow-xl my-12 p-8 md:p-12 relative">
           <div 
                className="absolute top-0 left-0 w-full h-full opacity-20 -z-10 rounded-3xl"
                style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%2395d5b2\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zm26 26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zm0-26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM36 0c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }}
            ></div>
          <h3 className="text-4xl font-bold text-center text-green-700 mb-16">Simple Steps to Sustainability</h3>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-lime-100/60 border border-green-200">
              <div className="flex justify-center mb-4"><ArrowUpTrayIcon /></div>
              <h4 className="text-2xl font-semibold text-emerald-700 mb-2">1. Snap & Upload</h4>
              <p className="text-gray-600">Take or upload a photo of your waste item. It's quick and easy!</p>
            </div>
            <div className="p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-lime-100/60 border border-green-200">
              <div className="flex justify-center mb-4"><EyeIcon /></div>
              <h4 className="text-2xl font-semibold text-emerald-700 mb-2">2. AI Classifies</h4>
              <p className="text-gray-600">Our smart AI instantly identifies the material type for you.</p>
            </div>
            <div className="p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-lime-100/60 border border-green-200">
              <div className="flex justify-center mb-4"><SparklesIcon /></div>
              <h4 className="text-2xl font-semibold text-emerald-700 mb-2">3. Discover Ideas</h4>
              <p className="text-gray-600">Get practical tips and creative ideas for recycling or reuse.</p>
            </div>
          </div>
        </section>
        
        {/* Key Benefits Section */}
        <section className="py-16 md:py-20">
          <h3 className="text-4xl font-bold text-center text-green-700 mb-16">Why Prakriti Makes a Difference</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Reduce Your Footprint", description: "Learn how small changes in waste habits can lead to big environmental benefits." },
              { title: "Unlock Creativity", description: "Discover innovative and fun ways to repurpose items you'd normally throw away." },
              { title: "Live Sustainably", description: "Embrace an eco-conscious lifestyle with easy-to-follow guidance and resources." },
              { title: "Educate & Inspire", description: "Perfect for families and schools to learn about recycling together." },
              { title: "Save Resources", description: "By reusing and recycling, you help conserve natural resources and energy." },
              { title: "Join the Movement", description: "Be part of a growing community dedicated to a cleaner, greener planet (feature coming soon!)." },
            ].map((benefit, index) => (
              <Card key={index} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden border border-emerald-100">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 p-1 h-2">
                    {/* Decorative top bar */}
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                        <CheckCircleIcon />
                        <CardTitle className="text-xl font-semibold text-emerald-700">{benefit.title}</CardTitle>
                    </div>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Image Upload Section */}
        <section id="upload-section" className="py-16 md:py-20">
          <h3 className="text-4xl font-bold text-center text-green-700 mb-8">Upload Your Waste Item</h3>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Have an item you're unsure how to recycle or reuse? Upload a photo below and let Prakriti guide you!
          </p>
          <ImageUpload 
            onUpload={(file) => {
              console.log("File to be processed (original prop, can be removed if not needed directly here):", file.name);
            }}
            onClassificationResult={(result) => {
              console.log("Classification Result in App.tsx:", result);
              // Here you could update App.tsx state if needed, or trigger other actions
            }}
            onIdeasFetched={(ideas) => {
              console.log("Recycling Ideas in App.tsx:", ideas);
              // Potentially update App.tsx state with ideas if needed globally
            }}
          />
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-20 text-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl my-12 p-8 md:p-16 shadow-2xl">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Waste?</h3>
          <p className="text-xl text-green-100 mb-10 max-w-xl mx-auto">
            Join Prakriti today and start making a positive impact on the environment, one item at a time.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-emerald-600 hover:bg-lime-50 border-2 border-white hover:border-lime-100 rounded-full px-10 py-3.5 text-lg font-semibold transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg">
            Upload Your First Item & Get Ideas
          </Button>
        </section>
      </main>

      <footer className="py-10 bg-green-800 text-green-200 text-center">
        <div className="container mx-auto px-6">
          <p className="mb-2">&copy; {new Date().getFullYear()} Prakriti. All rights reserved.</p>
          <p className="text-sm">Dedicated to a greener tomorrow. Let's make a difference, together.</p>
        </div>
      </footer>
    </div>
  );
}
