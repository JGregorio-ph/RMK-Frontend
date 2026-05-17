export default function Rooms({ params }: { params: { RoomID: string } }) {
  return <div>Room: {params.RoomID}</div>;
}