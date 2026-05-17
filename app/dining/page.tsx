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
          <br>
          </br>
          <hr>
          </hr>
        </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            APPETIZERS:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Fresh Potato Fries (PHP 120)</li>
            <li>Chicken Popcorn (PHP 150)</li>
            <li>Talon Nachos (PHP 230)</li>
            <li>Kani Nachos (PHP 280)</li>
            <li>Calamares (PHP 250)</li>
            <li>Onion Rings (PHP 120)</li>
            <li>Talon Shanghai (PHP 80)</li>
            <li>Vegetable Roll (PHP 50)</li>
            <li>Siomai (PHP 80)</li>
            <li>Cheezy Fries (PHP 180)</li>
            <li>Meaty Fries (PHP 180)</li>
          </ul>
        </div>
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            SANDWICH:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Bacon & Egg Sandwich (PHP 220)</li>
            <li>Overload Sandwich (PHP 280)</li>
            <li>Talon Clubhouse (PHP 280)</li>
            <li>Ham & Cheese Sandwich (PHP 220)</li>
            <li>Longganisa Sandwich (PHP 250)</li>
            <li>Hotdog Sandwich Overload (PHP 80)</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            PASTA:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Aglio Olio (PHP 250)</li>
            <li>Creamy Carbonara (PHP 220)</li>
            <li>Chicken Alfredo (PHP 220)</li>
            <li>Spaghetti (PHP 180)</li>
            <li>Bolognese (PHP 180)</li>
          </ul>
        </div>
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            NOODLES:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Pancit Sotanghon Solo (PHP 80)</li>
            <li>Pancit Canton Solo (PHP 80)</li>
            <li>Pancit Sotanghon Canton Solo (PHP 80)</li>
            <li>Pancit Sotanghon Platter (PHP 250)</li>
            <li>Pancit Canton Platter (PHP 220)</li>
            <li>Pancit Sotanghon Canton Platter (PHP 280)</li>
          </ul>
        </div>
      </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            SALADS:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Kani Salad (PHP 250)</li>
            <li>Garden Salad (PHP 220)</li>
            <li>Caesar Salad (PHP 250)</li>
            <li>Talon Salad (PHP 280)</li>
          </ul>
        </div>
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            PORK:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Pork Sisig (PHP 280)</li>
            <li>Bagnet Kare-Kare (PHP 330)</li>
            <li>Bagnet Binagoongan (PHP 300)</li>
            <li>Pork Sinigang (PHP 330)</li>
            <li>Sweet & Sour Pork (PHP 300)</li>
            <li>Bagnet w/ KBL (PHP 330)</li>
          </ul>
        </div>
      </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            CHICKEN:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Pininyahang Manok (PHP 315)</li>
            <li>Chicken Curry (PHP 315)</li>
            <li>Tinola (PHP 315)</li>
            <li>Fried Chicken - 4pcs (PHP 250)</li>
            <li>Fried Chicken - 6pcs (PHP 310)</li>
          </ul>
        </div>
        <div>
          <b
            className="text-4xl leading-relaxed m-2"
          >
            BEEF:
          </b>
          <ul className="text-xl leading-relaxed m-2 p-7 rounded-lg"
            style={{ color: "#F5F1E8", backgroundColor: "#6B5A47"}}>
            <li>Beef Broccoli (PHP 335)</li>
            <li>Beef Steak (PHP 350)</li>
            <li>Beef Caldereta (PHP 350)</li>
            <li>Beef Ampalaya (PHP 330)</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
  );
}