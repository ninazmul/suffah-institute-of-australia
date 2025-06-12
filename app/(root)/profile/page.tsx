import Collection from "@/components/shared/Collection";
import { getBookingsByUser } from "@/lib/actions/booking.actions";
import { getOrdersByEmail } from "@/lib/actions/order.actions";
import { getUserEmailById } from "@/lib/actions/user.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

type Booking = {
  _id: string;
  name: string;
  email: string;
  age: string;
  language: string;
  course: string;
  teacher: string;
  progress: string;
  payment: string;
  status: string;
  date: string;
  schedule: { day: string; timeSlot: string }[];
  note?: string;
};

const ProfilePage = async ({ searchParams }: PageProps) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const email = await getUserEmailById(userId);

  const bookings = await getBookingsByUser(email);

  const resolvedSearchParams = await searchParams;
  const ordersPage = Number(resolvedSearchParams?.ordersPage) || 1;

  const orders = await getOrdersByEmail({ email, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  return (
    <>
      <section className="m-4 md:mt-10">
        <div>
          {bookings?.map((booking: Booking) => (
            <details
              key={booking._id}
              className="group max-w-7xl mx-auto bg-white shadow-sm p-4 rounded-xl border border-gray-200 mb-4 transition hover:shadow-md"
            >
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600 transition flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 group-open:mb-2">
                <div className="flex items-center gap-2">
                  <span>
                    {booking.name} —{" "}
                    {formatDateTime(new Date(booking.date)).dateOnly} at{" "}
                    {formatDateTime(new Date(booking.date)).timeOnly}
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2 text-sm mt-1 sm:mt-0">
                  <StatusBadge label="Status" value={booking.status} />
                  <StatusBadge label="Payment" value={booking.payment} />
                  <StatusBadge label="Progress" value={booking.progress} />
                </div>
              </summary>

              <div className="mt-6 space-y-6 text-sm text-gray-700">
                {/* Personal Info */}
                <section>
                  <h2 className="text-base font-semibold text-gray-700 mb-2">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Full Name" value={booking.name} />
                    <InfoRow label="Email" value={booking.email} />
                    <InfoRow label="Age" value={booking.age} />
                    <InfoRow label="Language" value={booking.language} />
                  </div>
                </section>

                {/* Course Info */}
                <section>
                  <h2 className="text-base font-semibold text-gray-700 mb-2">
                    Course Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Course" value={booking.course} />
                    <InfoRow label="Teacher" value={booking.teacher} />
                    <InfoRow label="Progress" value={booking.progress} />
                    <InfoRow label="Payment Status" value={booking.payment} />
                    <InfoRow label="Booking Status" value={booking.status} />
                  </div>
                </section>

                {/* Schedule */}
                <section>
                  <h2 className="text-base font-semibold text-gray-700 mb-2">
                    Schedule
                  </h2>
                  {booking.schedule.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {booking.schedule.map(
                        (s: { day: string; timeSlot: string }, i: number) => (
                          <li
                            key={i}
                            className="bg-gray-50 border border-gray-200 rounded-md p-2"
                          >
                            <span className="font-medium">{s.day}:</span>{" "}
                            {s.timeSlot}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No schedule provided.
                    </p>
                  )}
                </section>

                {/* Notes */}
                {booking.note && (
                  <section>
                    <h2 className="text-base font-semibold text-gray-700 mb-2">
                      Additional Notes
                    </h2>
                    <p className="text-sm text-gray-700 border border-gray-200 bg-gray-50 rounded-md p-3">
                      {booking.note}
                    </p>
                  </section>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* My Tickets */}
      <section className="mt-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Event Tickets</h3>
        </div>
      </section>

      <section className="wrapper mb-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>
    </>
  );
};

const StatusBadge = ({ label, value }: { label: string; value: string }) => {
  const colors = {
    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-blue-100 text-blue-700",
    "In Progress": "bg-indigo-100 text-indigo-700",
    default: "bg-gray-100 text-gray-700",
  };

  const colorClass = colors[value as keyof typeof colors] || colors.default;

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colorClass} border border-gray-200`}
    >
      {label}: {value}
    </span>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800 border border-gray-200 rounded-md p-2 bg-gray-50">
      {value}
    </span>
  </div>
);

export default ProfilePage;
