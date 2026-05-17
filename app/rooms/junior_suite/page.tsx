import Link from "next/link";
import Header from "@/app/actions/header.tsx";

export default function JuniorSuite() {
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
              Accomodations
            </p>
  
            <h3
              className="text-6xl mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#B8860B",
              }}
            >
              JUNIOR SUITE ROOM
            </h3>
          </div>
  
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <b
                className="text-2xl mb-5 leading-relaxed m-2"
              >
                This room provides:
              </b>
              <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
                style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
                <li>A Comfortable Room</li>
                <li>A Strategic Location</li>
                <li>24 Hours Wifi</li>
                <li>A Swimming Pool</li>
                <li>Free Breakfasts</li>
              </ul>
  
              <Link 
                href={{
                  pathname: '/bookings',
                  query: {
                    room: '3'
                  }
                }}
              >
              <button
                className="px-10 py-4 text-sm tracking-widest uppercase border-2 ml-2"
                style={{
                  backgroundColor: "#B8860B",
                  color: "#F5F1E8",
                  borderColor: "#B8860B",
                }}
              >
                Book a Reservation
              </button>
              </Link>

              <Link href="/rooms">
              <button
                className="px-10 py-4 text-sm tracking-widest uppercase border-2 m-2"
                style={{
                  backgroundColor: "#B8860B",
                  color: "#F5F1E8",
                  borderColor: "#B8860B",
                }}
              >
                Go Back
              </button>
              </Link>
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