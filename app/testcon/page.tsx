{/*
'use client';
import { useEffect, useState } from 'react';

export default async function TestHandshake() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

        // This is the handshake in action
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accommodations`, {
            headers: {
            'Accept': 'application/json'
            } 
        });

    return (
        <div style={{ padding: '20px', background: 'white', color: 'black' }}>
            <h1>Handshake Status: {data ? '✅ Connected' : '⏳ Waiting...'}</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
    */}