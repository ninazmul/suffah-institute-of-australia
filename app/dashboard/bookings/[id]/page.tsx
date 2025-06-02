import { getBookingById } from "@/lib/actions/booking.actions";
import { formatDateTime } from "@/lib/utils";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const BookingDetails = async ({ params }: PageProps) => {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">Booking not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-xl mt-10 border border-gray-200">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Booking Details</h1>
        <p className="text-sm text-gray-500">
          Submitted on {formatDateTime(booking.date).dateOnly} at{" "}
          {formatDateTime(booking.date).timeOnly}
        </p>
      </div>

      {/* Personal Info */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
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
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
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
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Schedule</h2>
        {booking.schedule.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {booking.schedule.map(
              (s: { day: string; timeSlot: string }, i: number) => (
                <li
                  key={i}
                  className="bg-gray-50 border border-gray-200 rounded-md p-2"
                >
                  <span className="font-medium">{s.day}:</span> {s.timeSlot}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No schedule provided.</p>
        )}
      </section>

      {/* Notes */}
      {booking.note && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Additional Notes
          </h2>
          <p className="text-sm text-gray-700 border border-gray-200 bg-gray-50 rounded-md p-3">
            {booking.note}
          </p>
        </section>
      )}
    </div>
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

export default BookingDetails;
