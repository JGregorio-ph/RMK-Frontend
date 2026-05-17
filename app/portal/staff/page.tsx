"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/dashboard.css";

type BookingStatus = "pending" | "confirmed" | "rejected";

interface Reservation {
  id: string;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  gcashRef: string;
  status: BookingStatus;
  submittedAt: string;
  specialNotes?: string;
}

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`rmk-badge rmk-badge--${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function GuestDetailModal({
  reservation,
  onClose,
}: {
  reservation: Reservation;
  onClose: () => void;
}) {
  return (
    <div className="rmk-modal-overlay" onClick={onClose}>
      <div className="rmk-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rmk-modal__close" onClick={onClose}>
          ×
        </button>

        <h3 className="rmk-modal__title">Guest Details</h3>

        <p className="rmk-modal__subtitle">{reservation.id}</p>

        <StatusBadge status={reservation.status} />

        <br />
        <br />

        {[
          ["Guest Name", reservation.guestName],
          ["Room Type", reservation.roomType],
          ["Check-in", reservation.checkIn],
          ["Check-out", reservation.checkOut],
          [
            "Nights",
            `${reservation.nights} night${
              reservation.nights > 1 ? "s" : ""
            }`,
          ],
          ["Amount Paid", `₱${reservation.amount.toLocaleString()}`],
          ["GCash Ref", reservation.gcashRef],
          ["Special Notes", reservation.specialNotes || "None"],
          ["Submitted", reservation.submittedAt],
        ].map(([label, val]) => (
          <div key={label} className="rmk-modal__row">
            <span className="rmk-modal__row-label">{label}</span>

            <span className="rmk-modal__row-value">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StaffDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "overview" | "confirmed-rooms"
  >("overview");

  const [viewingGuest, setViewingGuest] =
    useState<Reservation | null>(null);

  const [reservations, setReservations] = useState<any[]>([]);

  const confirmedRooms = reservations.filter(
    (r) => r.booking_status?.toLowerCase() === "confirmed"
  );

  const today = new Date().toISOString().slice(0, 10);

  const todayCheckIns = confirmedRooms.filter(
    (r) => r.check_in === today
  );

  useEffect(() => {
  fetch("/api/bookings")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setReservations(data);
      } else {
        console.error(data);
        setReservations([]);
      }
    })
    .catch((err) => {
      console.error(err);
      setReservations([]);
    });
  }, []);

  const handleLogout = () => router.push("/portal/login");

  return (
    <div className="rmk-page">
      {/* Header */}
      <div className="rmk-header">
        <div>
          <h1 className="rmk-header__title">Staff Dashboard</h1>

          <p className="rmk-header__subtitle">
            RMK Hotel &amp; Resort — Staff Portal
          </p>
        </div>

        <button className="rmk-btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="rmk-tabs">
        {[
          { key: "overview", label: "Overview" },
          { key: "confirmed-rooms", label: "Room Reservations" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() =>
              setActiveTab(key as "overview" | "confirmed-rooms")
            }
            className={`rmk-tab${
              activeTab === key ? " rmk-tab--active" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <>
          <div className="rmk-section">
            <h2 className="rmk-section-title">Staff Overview</h2>

            <div className="rmk-section-divider" />
          </div>

          <div className="rmk-grid-3">
            {[
              {
                label: "Today's Check-ins",
                value: todayCheckIns.length,
              },
              {
                label: "Confirmed Room Bookings",
                value: confirmedRooms.length,
              },
            ].map(({ label, value }) => (
              <div key={label} className="rmk-stat-card">
                <h2 className="rmk-stat-card__label">{label}</h2>

                <p className="rmk-stat-card__value">{value}</p>
              </div>
            ))}
          </div>

          {/* Upcoming check-ins */}
          <div className="rmk-section--lg">
            <h2 className="rmk-section-title">
              Upcoming Check-ins
            </h2>

            <div className="rmk-section-divider" />

            <br />

            <div className="rmk-table-wrapper">
              <table className="rmk-table">
                <thead>
                  <tr>
                    {[
                      "Booking ID",
                      "Guest",
                      "Room",
                      "Check-in",
                      "Check-out",
                      "Payment Preview",
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {confirmedRooms.slice(0, 3).map((r) => (
                    <tr key={r.booking_id}>
                      <td className="rmk-table__cell--id">
                        {r.booking_id}
                      </td>

                      <td className="rmk-table__cell--dark">
                        {r.guest_name}
                      </td>

                      <td className="rmk-table__cell--dark">
                        {r.type_name || `Room #${r.room_id}`}
                      </td>

                      <td className="rmk-table__cell--muted">
                        {r.check_in}
                      </td>

                      <td className="rmk-table__cell--muted">
                        {r.check_out}
                      </td>

                      {/* Displaying payment validation label preview */}
                      <td className="rmk-table__cell--dark font-medium">
                        {r.payment_method === 'GCash' ? '💙 GCash' : '🏨 On-Site'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* CONFIRMED ROOMS */}
      {activeTab === "confirmed-rooms" && (
        <>
          <div className="rmk-section">
            <h2 className="rmk-section-title">
              Confirmed Room Reservations
            </h2>

            <div className="rmk-section-divider" />

            <p className="rmk-description">
              Showing all admin-confirmed bookings ready for
              check-in processing.
            </p>
          </div>

          {confirmedRooms.length === 0 ? (
            <div
              className="rmk-card"
              style={{ padding: "3rem", textAlign: "center" }}
            >
              <p className="rmk-table__empty">
                No confirmed reservations at this time.
              </p>
            </div>
          ) : (
            <div className="rmk-table-wrapper">
              <div className="rmk-table-scroll">
                <table className="rmk-table">
                  <thead>
                    <tr>
                      {[
                        "Booking ID",
                        "Guest Name",
                        "Room Type",
                        "Check-in",
                        "Check-out",
                        "Amount",
                        "Payment Method",
                        "Details",
                      ].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {confirmedRooms.map((r) => (
                      <tr key={r.booking_id}>
                        <td className="rmk-table__cell--id">
                          {r.booking_id}
                        </td>

                        <td className="rmk-table__cell--dark">
                          {r.guest_name}
                        </td>

                        <td className="rmk-table__cell--dark">
                          {r.type_name || `Room #${r.room_id}`}
                        </td>

                        <td className="rmk-table__cell--muted">
                          {r.check_in}
                        </td>

                        <td className="rmk-table__cell--muted">
                          {r.check_out}
                        </td>

                        <td className="rmk-table__cell--gold">
                          ₱{Number(r.total_price).toLocaleString()}
                        </td>

                        {/* Integration point: Displays payment type safely */}
                        <td className="rmk-table__cell--dark font-semibold">
                          {r.payment_method === 'GCash' ? '💙 GCash' : '🏨 On-Site'}
                        </td>

                        <td>
                          <button
                            className="rmk-btn-view"
                            onClick={() =>
                              setViewingGuest({
                                id: r.booking_id,
                                guestName: r.guest_name,
                                roomType: r.type_name || `Room #${r.room_id}`,
                                checkIn: r.check_in,
                                checkOut: r.check_out,
                                nights: Math.max(1, (new Date(r.check_out).getTime() - new Date(r.check_in).getTime()) / 86400000),
                                amount: Number(r.total_price),
                                gcashRef: r.payment_method === 'GCash' ? 'Receipt Attached' : 'N/A',
                                status: r.booking_status.toLowerCase() as any,
                                submittedAt: r.created_at || "Recent",
                                specialNotes: r.payment_method === 'GCash' ? "Paid via Mobile Checkout" : "Pay at Front Desk",
                              })
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <p className="rmk-table-footer">
            {confirmedRooms.length} confirmed reservation
            {confirmedRooms.length !== 1 ? "s" : ""}
          </p>
        </>
      )}

      {/* Modals */}
      {viewingGuest && (
        <GuestDetailModal
          reservation={viewingGuest}
          onClose={() => setViewingGuest(null)}
        />
      )}
    </div>
  );
}