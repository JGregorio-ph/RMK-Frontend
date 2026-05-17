'use client'

import { useState } from 'react';
import Header from "@/app/actions/header";
import GcashUpload from "@/app/components/GcashUpload";
import { useSearchParams } from 'next/navigation';

export default function Bookings() {
  const searchParams = useSearchParams();
  const paramRoom = searchParams?.get('room');
// If the room parameter is missing, empty, or contains dashes, default to '1'
  const [roomId, setRoomId] = useState(
  !paramRoom || paramRoom === '--' ? '1' : paramRoom
  );

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [step, setStep] = useState(1);
  const [gcashFile, setGcashFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(''); 
  const [loading, setLoading] = useState(false);

  function goToPayment(e: React.FormEvent) {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please fill in check-in and check-out dates.");
      return;
    }

    setStep(2);
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("room_type", roomId);
    formData.append("check_in", checkIn);
    formData.append("check_out", checkOut);
    
    // Infer payment method based on file presence
    const actualPaymentMethod = gcashFile ? 'GCash' : 'Cash';
    formData.append("payment_method", actualPaymentMethod);

    if (gcashFile) {
      formData.append("gcash_proof", gcashFile);
    }

    const res = await fetch("http://localhost:8000/api/bookings", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Laravel ERROR RESPONSE:", errorText);
      throw new Error("Backend failed");
    }

    const text = await res.text();
    console.log("RAW RESPONSE:", text);
    
    alert("Booking successful!");

  } catch (error) {
    console.error("Submission error:", error);
    alert("There was an issue processing your booking. Please try again.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div>
      {/* HEADER BACK */}
      <Header />

      <div
        className="flex min-h-screen items-center justify-center px-6 pt-24"
        style={{
          backgroundColor: "#F5F1E8",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >

        {/* STEP 1 */}
        {step === 1 && (
          <form
            onSubmit={goToPayment}
            className="w-full max-w-md p-10 rounded-2xl shadow-lg border"
            style={{
              backgroundColor: "#FFFDF8",
              borderColor: "#B8860B",
            }}
          >
            <h2 className="text-xl mb-6">Booking Details</h2>

            <label>Room Type</label>
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)} className="w-full p-2 border mb-4 bg-white text-black">
              <option value="1">Deluxe Room</option>
              <option value="2">Family Room</option>
              <option value="3">Junior Suite</option>
              <option value="4">Senior Suite</option>
            </select>

            <label>Check-in</label>
            <input
              type="date"
              className="w-full p-2 border mb-4"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <label>Check-out</label>
            <input
              type="date"
              className="w-full p-2 border mb-6"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            <button type="submit" className="w-full py-3 bg-yellow-700 text-white">
              Proceed to Payment
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-10 rounded-2xl shadow-lg border"
            style={{
              backgroundColor: "#FFFDF8",
              borderColor: "#B8860B",
            }}
          >
            <h2 className="text-xl mb-6">Payment</h2>

            <GcashUpload onFileSelect={setGcashFile} />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-3 rounded-lg"
              style={{
                backgroundColor: loading ? "#D4C5A9" : "#B8860B",
                color: "#F5F1E8",
              }}
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}