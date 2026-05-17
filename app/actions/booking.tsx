'use server'
import pool from '@/lib/db';

//Comment for you Back-enders: replace "formData" with an existing variable*/}
{// Commented since the code is redundant by this time. Uncomment once you can find use for it.
export async function createRoomType(formData: { get: (arg0: string) => any; }){
    const typeName = formData.get('type_name');
    const basePrice = formData.get('base_price');
    const description = formData.get('description');
    const imgurl = formData.get('image_url');
}

export async function createRoom(formData: { get: (arg0: string) => any; }){
    const roomNumber = formData.get('room_number');
    const room_status = formData.get('room_status');
    const typeId = formData.get('type_id');
}

export async function createBooking(formData: { get: (arg0: string) => any; }){
    const guestName = formData.get('guest_name');
    const guestEmail = formData.get('guest_email');
    const checkIn = formData.get('check_in');
    const roomId = formData.get('room_id');
}
    */}