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
  gcashScreenshot: string;
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

function GCashReceiptModal({
  reservation,
  onClose,
}: {
  reservation: any; // Dynamic typing handles raw query payloads safely
  onClose: () => void;
}) {
  if (!reservation) return null;

  return (
    <div className="rmk-modal-overlay" onClick={onClose}>
      <div className="rmk-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rmk-modal__close" onClick={onClose}>
          ×
        </button>

        <h3 className="rmk-modal__title">Payment Receipt</h3>
        <p className="rmk-modal__subtitle">GCash Verification</p>

        {/* IMAGE INTEGRATION PIPELINE BACKED BY ARTISAN STORAGE SYMLINK */}
        <div style={{ margin: '1.5rem 0', display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
          {reservation.proof_of_payment ? (
            <img 
              src={`http://localhost:8000/storage/${reservation.proof_of_payment}`} 
              alt="GCash Payment Receipt Screenshot" 
              style={{ maxHeight: '260px', maxWidth: '100%', borderRadius: '6px', objectFit: 'contain', border: '1px solid #ddd' }}
            />
          ) : (
            <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem' }}>🏨</span>
              <p style={{ margin: '8px 0 0 0', fontWeight: 'bold', color: '#6B5A47' }}>Pay On-Site Selected</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#888' }}>No receipt attachment provided.</p>
            </div>
          )}
        </div>

        {[
          ["Booking ID", reservation.id],
          ["Reference No.", reservation.gcashRef],
          ["Amount", `₱${reservation.amount.toLocaleString()}`],
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

export default function AdminDashboard() {
  const router = useRouter();

  const [reservations, setReservations] = useState<any[]>([]);

  const [activeTab, setActiveTab] =
    useState<"overview" | "reservations">("overview");

  const [filterStatus, setFilterStatus] =
    useState<BookingStatus | "all">("all");

  const [viewingReceipt, setViewingReceipt] =
    useState<Reservation | null>(null);

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

  const handleStatusChange = (
    id: string,
    newStatus: BookingStatus
  ) =>
    setReservations((prev) =>
      prev.map((r) =>
        r.booking_id === id
          ? { ...r, booking_status: newStatus }
          : r
      )
    );

  const filtered =
    filterStatus === "all"
      ? reservations
      : reservations.filter(
          (r) => r.booking_status === filterStatus
        );

  const counts = {
    total: reservations.length,
    pending: reservations.filter(
      (r) => r.booking_status === "pending"
    ).length,
    confirmed: reservations.filter(
      (r) => r.booking_status === "confirmed"
    ).length,
    rejected: reservations.filter(
      (r) => r.booking_status === "rejected"
    ).length,
  };

  const FilterPills = ({
    current,
    setter,
  }: {
    current: BookingStatus | "all";
    setter: (s: BookingStatus | "all") => void;
  }) => (
    <div className="rmk-filters">
      {(
        ["all", "pending", "confirmed", "rejected"] as const
      ).map((s) => (
        <button
          key={s}
          onClick={() => setter(s)}
          className={`rmk-filter${
            current === s ? " rmk-filter--active" : ""
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );

  const ActionButtons = ({
    id,
    status,
    handler,
  }: {
    id: string;
    status: BookingStatus;
    handler: (id: string, s: BookingStatus) => void;
  }) => (
    <div className="rmk-action-group">
      <button
        className="rmk-btn-confirm"
        disabled={status === "confirmed"}
        onClick={() => handler(id, "confirmed")}
      >
        Confirm
      </button>

      <button
        className="rmk-btn-reject"
        disabled={status === "rejected"}
        onClick={() => handler(id, "rejected")}
      >
        Reject
      </button>
    </div>
  );

  return (
    <div className="rmk-page">
      {/* Header */}
      <div className="rmk-header">
        <div>
          <h1 className="rmk-header__title">
            Admin Dashboard
          </h1>

          <p className="rmk-header__subtitle">
            RMK Hotel &amp; Resort — Admin Portal
          </p>
        </div>

        <button
          className="rmk-btn-primary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="rmk-tabs">
        {(
          ["overview", "reservations"] as const
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rmk-tab${
              activeTab === tab
                ? " rmk-tab--active"
                : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <>
          <div className="rmk-section">
            <h2 className="rmk-section-title">
              Overview
            </h2>

            <div className="rmk-section-divider" />
          </div>

          <div className="rmk-grid-3">
            {[
              {
                label: "Total Reservations",
                value: reservations.length,
              },
              {
                label: "Available Rooms",
                value: 18,
              },
              {
                label: "Staff Members",
                value: 9,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rmk-stat-card"
              >
                <h2 className="rmk-stat-card__label">
                  {label}
                </h2>

                <p className="rmk-stat-card__value">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="rmk-section--lg">
            <h2 className="rmk-section-title">
              Room Booking Verifications
            </h2>

            <div className="rmk-section-divider" />

            <br />

            <div className="rmk-grid-4">
              {[
                {
                  label: "All",
                  value: counts.total,
                  status: "all" as const,
                },
                {
                  label: "Pending",
                  value: counts.pending,
                  status: "pending" as const,
                },
                {
                  label: "Confirmed",
                  value: counts.confirmed,
                  status: "confirmed" as const,
                },
                {
                  label: "Rejected",
                  value: counts.rejected,
                  status: "rejected" as const,
                },
              ].map(({ label, value, status }) => (
                <button
                  key={label}
                  className="rmk-count-card"
                  onClick={() => {
                    setFilterStatus(status);
                    setActiveTab("reservations");
                  }}
                >
                  <p className="rmk-count-card__label">
                    {label}
                  </p>

                  <p className="rmk-count-card__value">
                    {value}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* RESERVATIONS */}
      {activeTab === "reservations" && (
        <>
          <div className="rmk-tab-header">
            <div>
              <h2 className="rmk-section-title">
                Room Reservations
              </h2>

              <div className="rmk-section-divider" />
            </div>

            <FilterPills
              current={filterStatus}
              setter={setFilterStatus}
            />
          </div>

          <div className="rmk-table-wrapper">
            <div className="rmk-table-scroll">
              <table className="rmk-table">
                <thead>
                  <tr>
                    {[
                      "Booking ID",
                      "Guest",
                      "Room",
                      "Check-in",
                      "Check-out",
                      "Amount",
                      "Status",
                      "Receipt",
                      "Actions",
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="rmk-table__empty"
                      >
                        No reservations found.
                      </td>
                    </tr>
                  )}

                  {filtered.map((r) => (
                    <tr key={r.booking_id}>
                      <td className="rmk-table__cell--id">
                        {r.booking_id}
                      </td>

                      <td className="rmk-table__cell--dark">
                        {r.guest_name}
                      </td>

                      <td className="rmk-table__cell--dark">
                        {r.type_name}
                      </td>

                      <td className="rmk-table__cell--muted">
                        {r.check_in}
                      </td>

                      <td className="rmk-table__cell--muted">
                        {r.check_out}
                      </td>

                      <td className="rmk-table__cell--gold">
                        ₱
                        {Number(
                          r.total_price
                        ).toLocaleString()}
                      </td>

                      <td>
                        <StatusBadge
                          status={r.booking_status}
                        />
                      </td>

                      <td>
                        <button
                          className="rmk-btn-view"
                          onClick={() =>
                            setViewingReceipt({
                              id: r.booking_id,
                              guestName: r.guest_name,
                              roomType: r.type_name || `Room #${r.room_id}`,
                              checkIn: r.check_in,
                              checkOut: r.check_out,
                              nights: 1,
                              amount: Number(r.total_price),
                              gcashRef: r.payment_method === 'GCash' ? 'Verified File' : 'N/A',
                              proof_of_payment: r.proof_of_payment,
                              status: r.booking_status.toLowerCase() as any,
                              submittedAt: r.created_at || "Recent",
                            } as any)
                          }
                        >
                          View
                        </button>
                      </td>

                      <td>
                        <ActionButtons
                          id={r.booking_id}
                          status={r.booking_status}
                          handler={handleStatusChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="rmk-table-footer">
            Showing {filtered.length} of{" "}
            {reservations.length} reservations
          </p>
        </>
      )}

      {/* Modals */}
      {viewingReceipt && (
        <GCashReceiptModal
          reservation={viewingReceipt}
          onClose={() => setViewingReceipt(null)}
        />
      )}
    </div>
  );
}