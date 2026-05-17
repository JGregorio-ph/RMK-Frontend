import Link from "next/link";
import Header from "@/app/actions/header.tsx";
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div
      className="min-h-screen pt-24 px-6"
      style={{
        backgroundColor: "#F5F1E8",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
            {/* Navbar */}
            <Header/>
            {/* End of Navbar */}
      
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h3
          className="text-6xl mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#B8860B",
          }}
        >
          Visit Us
        </h3>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          <div>
            <MapPin
              className="w-8 h-8 mx-auto mb-4"
              style={{ color: "#B8860B" }}
            />

            <p style={{ color: "#6B5A47" }}>
              Brgy. 6-A Morong, Badoc, Philippines, 2904
            </p>
          </div>

          <div>
            <Phone
              className="w-8 h-8 mx-auto mb-4"
              style={{ color: "#B8860B" }}
            />

            <p style={{ color: "#6B5A47" }}>
              (+63) 995 067 8191
            </p>
          </div>

          <div>
            <Mail
              className="w-8 h-8 mx-auto mb-4"
              style={{ color: "#B8860B" }}
            />

            <p style={{ color: "#6B5A47" }}>
              rmkhotelandevents@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}