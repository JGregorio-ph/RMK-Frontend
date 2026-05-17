'use client'
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE THIS IN THE BOOKINGS PAGE (just add these 2 things):
//
//  1. At the top of bookings/page.tsx:
//       import GcashUpload from '@/app/components/GcashUpload';
//
//  2. Inside the <form>, add a payment method selector and drop in:
//       <GcashUpload onFileSelect={(file) => setGcashFile(file)} />
//
//  3. When submitting, include gcashFile in your FormData:
//       formData.append('gcash_proof', gcashFile);
// ─────────────────────────────────────────────────────────────────────────────

interface GcashUploadProps {
  onFileSelect: (file: File | null) => void;
}

const GCASH_NUMBER = '09XX-XXX-XXXX'; // ← Replace with the hotel's real GCash number
const GCASH_NAME   = 'Hotel Owner Name'; // ← Replace with account name

export default function GcashUpload({ onFileSelect }: GcashUploadProps) {
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'onsite' | ''>('');
  const [preview, setPreview]             = useState<string | null>(null);
  const [fileName, setFileName]           = useState<string | null>(null);
  const [dragOver, setDragOver]           = useState(false);

  function handleFile(file: File | null) {
    if (!file) return;
    setFileName(file.name);
    onFileSelect(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0] ?? null);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  }

  function handleRemove() {
    setPreview(null);
    setFileName(null);
    onFileSelect(null);
  }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>

      {/* ── Payment Method Selector ── */}
      <label
        className="block text-sm tracking-widest uppercase mb-3"
        style={{ color: '#6B5A47' }}
      >
        Payment Method
      </label>

      <div className="flex gap-4 mb-6">
        {/* GCash option */}
        <button
          type="button"
          onClick={() => { 
            setPaymentMethod('gcash'); 
            setPreview(null); 
            setFileName(null); 
            onFileSelect(null); 
          }}
          className="flex-1 py-3 px-4 rounded-lg border-2 text-sm tracking-widest uppercase transition-all"
          style={{
            borderColor:       paymentMethod === 'gcash' ? '#B8860B' : '#D4C5A9',
            backgroundColor:   paymentMethod === 'gcash' ? '#B8860B' : 'transparent',
            color:             paymentMethod === 'gcash' ? '#F5F1E8' : '#6B5A47',
          }}
        >
          💙 GCash
        </button>

        {/* Pay on-site option */}
        <button
          type="button"
          onClick={() => { 
            setPaymentMethod('onsite'); 
            setPreview(null); 
            setFileName(null); 
            onFileSelect(null); 
          }}
          className="flex-1 py-3 px-4 rounded-lg border-2 text-sm tracking-widest uppercase transition-all"
          style={{
            borderColor:     paymentMethod === 'onsite' ? '#B8860B' : '#D4C5A9',
            backgroundColor: paymentMethod === 'onsite' ? '#B8860B' : 'transparent',
            color:           paymentMethod === 'onsite' ? '#F5F1E8' : '#6B5A47',
          }}
        >
          🏨 Pay On-Site
        </button>
      </div>

      {/* ── GCash Flow ── */}
      {paymentMethod === 'gcash' && (
        <div className="space-y-5">

          {/* Step 1 — Hotel GCash details */}
          <div
            className="rounded-xl p-5 border"
            style={{ backgroundColor: '#EDE6D6', borderColor: '#B8860B' }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: '#8B7355' }}
            >
              Step 1 — Send Payment To
            </p>
            <div className="flex items-center gap-4">
              {/* GCash logo placeholder */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                style={{ backgroundColor: '#007AFF' }}
              >
                G
              </div>
              <div>
                <p
                  className="text-2xl font-bold tracking-wider"
                  style={{ color: '#B8860B', fontFamily: "'Playfair Display', serif" }}
                >
                  {GCASH_NUMBER}
                </p>
                <p className="text-sm" style={{ color: '#6B5A47' }}>{GCASH_NAME}</p>
              </div>
            </div>
            <p className="text-xs mt-3" style={{ color: '#8B7355' }}>
              Please use your full name as the GCash reference/note when sending.
            </p>
          </div>

          {/* Step 2 — Upload screenshot */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: '#8B7355' }}
            >
              Step 2 — Upload Payment Screenshot
            </p>

            {!preview ? (
              <label
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all"
                style={{
                  borderColor:     dragOver ? '#B8860B' : '#D4C5A9',
                  backgroundColor: dragOver ? '#EDE6D6' : '#FFFDF8',
                }}
              >
                <span className="text-3xl mb-2">📷</span>
                <span className="text-sm tracking-wide" style={{ color: '#8B7355' }}>
                  Drag & drop or <span style={{ color: '#B8860B', textDecoration: 'underline' }}>browse</span>
                </span>
                <span className="text-xs mt-1" style={{ color: '#B0A090' }}>
                  JPG, PNG, WEBP accepted
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden border-2" style={{ borderColor: '#B8860B' }}>
                <img
                  src={preview}
                  alt="GCash payment proof"
                  className="w-full object-cover max-h-64"
                />
                <div
                  className="absolute inset-0 flex items-end p-3"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
                >
                  <span className="text-white text-xs truncate flex-1">{fileName}</span>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="ml-3 text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#B8860B', color: '#F5F1E8' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Pay On-Site Notice ── */}
      {paymentMethod === 'onsite' && (
        <div
          className="rounded-xl p-5 border text-center"
          style={{ backgroundColor: '#EDE6D6', borderColor: '#B8860B' }}
        >
          <p className="text-2xl mb-2">🏨</p>
          <p className="text-sm tracking-wide" style={{ color: '#6B5A47' }}>
            You can pay upon check-in at the front desk.
          </p>
          <p className="text-xs mt-2" style={{ color: '#8B7355' }}>
            Please bring a valid ID and your booking confirmation email.
          </p>
        </div>
      )}

    </div>
  );
}
