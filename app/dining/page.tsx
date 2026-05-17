import Link from "next/link";
import Header from "@/app/actions/header.tsx";

export default function DiningPage() {
  return (
    <div
      className="min-h-screen pt-24 px-6"
      style={{
        backgroundColor: "#EDE6D6",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
            {/* Navbar */}
            <Header/>
            {/* End of Navbar */}
      
      <div className="max-w-6xl mx-auto py-20">
        <div className="text-center mb-20">
          <p
            className="text-sm tracking-widest uppercase mb-3"
            style={{ color: "#8B7355" }}
          >
            Restaurant & Bar
          </p>

          <h3
            className="text-6xl mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#B8860B",
            }}
          >
            TALON
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xl mb-10 leading-relaxed"
              style={{ color: "#6B5A47" }}
            >
              Our restaurant offers exquisite cuisine crafted from the
              finest seasonal ingredients.
            </p>

            <button
              className="px-10 py-4 text-sm tracking-widest uppercase border-2"
              style={{
                backgroundColor: "#B8860B",
                color: "#F5F1E8",
                borderColor: "#B8860B",
              }}
            >
              Make a Reservation
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1758537697448-dbfc1cb83e49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Restaurant"
              className="aspect-square object-cover border-4"
            />

            <img
              src="https://images.unsplash.com/photo-1755811248279-1ab13b7d4384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Food"
              className="aspect-square object-cover border-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}