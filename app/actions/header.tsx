import Link from 'next/link';

export default function Header() {
    return(
    <div>
    {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: "rgba(245, 241, 232, 0.95)",
          borderColor: "#B8860B",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1
            className="text-2xl tracking-wide"
            style={{
              color: "#B8860B",
              fontFamily: "'Playfair Display', serif",
            }}
          >
          <Link href="/">
            RMK Hotel & Resort
          </Link>
          </h1>

          <div className="flex gap-8">

            <Link href="/" style={{ color: "#8B7355" }}>
              Home
            </Link>

            <Link href="/rooms" style={{ color: "#8B7355" }}>
              Rooms
            </Link>

            <Link href="/dining" style={{ color: "#8B7355" }}>
              Dining
            </Link>

            <Link href="/bookings" style={{ color: "#8B7355" }}>
              Bookings
            </Link>

            <Link href="/contact" style={{ color: "#8B7355" }}>
              Contact
            </Link>
            
            <Link href="/portal" style={{ color: "#8B7355" }}>
              Login
            </Link>

          </div>
        </div>
      </nav>
      {/* End of Navbar */}
    </div>
    );
}