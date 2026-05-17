import Link from "next/link";
import Image from "next/image";
import Header from "@/app/actions/header";

export default async function RoomsPage() {
  return (
    <div
      className="min-h-screen pt-24 px-6"
      style={{
        backgroundColor: "#F5F1E8",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* Navbar */}
      <Header />
      {/* End of Navbar */}

      <div className="max-w-6xl mx-auto py-20">
        <div className="text-center mb-20">
          <p
            className="text-sm tracking-widest uppercase mb-3"
            style={{ color: "#8B7355" }}
          >
            Accommodations
          </p>

          <h3
            className="text-6xl mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#B8860B",
            }}
          >
            Refined Comfort
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Deluxe Room */}
          <Link href="/rooms/deluxe_room">
            <div className="text-center cursor-pointer group">
              <div className="w-full aspect-[7/6] relative border-4 mb-6 overflow-hidden">
                <Image
                  src="/droom.png"
                  alt="Deluxe Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h4
                className="text-3xl mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#B8860B",
                }}
              >
                Deluxe Room
              </h4>
            </div>
          </Link>

          {/* Family Room */}
          <Link href="/rooms/family_room">
            <div className="text-center cursor-pointer group">
              <div className="w-full aspect-[7/6] relative border-4 mb-6 overflow-hidden">
                <Image
                  src="/froom.png"
                  alt="Family Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h4
                className="text-3xl mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#B8860B",
                }}
              >
                Family Room
              </h4>
            </div>
          </Link>

          {/* Junior Suite */}
          <Link href="/rooms/junior_suite">
            <div className="text-center cursor-pointer group">
              <div className="w-full aspect-[7/6] relative border-4 mb-6 overflow-hidden">
                <Image
                  src="/jsuite.png"
                  alt="Junior Suite Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h4
                className="text-3xl mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#B8860B",
                }}
              >
                Junior Suite Room
              </h4>
            </div>
          </Link>

          {/* Senior Suite */}
          <Link href="/rooms/senior_suite">
            <div className="text-center cursor-pointer group">
              <div className="w-full aspect-[7/6] relative border-4 mb-6 overflow-hidden">
                <Image
                  src="/ssuite.png"
                  alt="Senior Suite Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h4
                className="text-3xl mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#B8860B",
                }}
              >
                Senior Suite Room
              </h4>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}