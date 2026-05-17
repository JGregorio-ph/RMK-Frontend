import Image from "next/image";
import '@/app/globals.css';
import Link from 'next/link';
import Header from '@/app/actions/header.tsx';

export default function Home() {
  return (
  //OLD VERSION
   /*<main>
    <div className="flex items-center justify-center m-5">
      <button className="bg-yellow-700 hover:bg-yellow-900 p-2">
        <Link href="/admin" className="color-amber-50">Click Me. I'll take you to the admin page.</Link> 
      </button>
    </div>
        <hr/>
        <div className = "flex items-center justify-center m-20">
        
        </div>
   </main>
   */

   //NEW VERSION
   //Navigation Bar
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F5F1E8",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* Navbar */}
      <Header/>
      {/* End of Navbar */}

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl text-center">
          <p
            className="text-sm tracking-widest uppercase mb-6"
            style={{ color: "#8B7355" }}
          >
            RMK Hotel & Resort and Event Center
          </p>

          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "6rem",
              color: "#B8860B",
            }}
          >
            RMK
          </h2>

          <p
            className="text-2xl mb-8 tracking-widest"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#8B7355",
            }}
          >
            HOTEL & RESORT
          </p>

          <div
            className="w-48 h-px mx-auto mb-8"
            style={{ backgroundColor: "#B8860B" }}
          />

          <p
            className="text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "#6B5A47" }}
          >
            Experience timeless elegance and exquisite hospitality in a
            setting where tradition meets refined luxury.
          </p>

          <button
            className="px-10 py-4 text-sm tracking-widest uppercase border-2"
            style={{
              backgroundColor: "#B8860B",
              color: "#F5F1E8",
              borderColor: "#B8860B",
            }}
          >
          <Link href="/rooms">
            Reserve Your Stay
          </Link>
          </button>
        </div>
      </section>

    </div>
  );
}
