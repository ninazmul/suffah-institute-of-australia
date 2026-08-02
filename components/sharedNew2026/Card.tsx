import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { getUserEmailById } from "@/lib/actions/user.actions";
import { isAdmin } from "@/lib/actions/admin.actions";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  const email = await getUserEmailById(userId);
  const adminStatus = await isAdmin(email);

  return (
    <div className="group relative flex flex-col w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      {/* Full image display with 16:9 aspect ratio */}
      <Link
        href={`/events/${event._id}`}
        className="flex-center relative w-full bg-gray-50"
      >
        <div className="relative w-full pb-[56.25%]">
          {" "}
          {/* 16:9 Aspect Ratio */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${event.imageUrl})` }}
          />
        </div>
      </Link>

      {/* Admin Actions */}
      {adminStatus && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`dashboard/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id.toString()} />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5">
        {/* Price and Category */}
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-max rounded-full bg-green-100 px-4 py-1 text-green-60 flex items-center">
              {event.isFree
                ? "FREE"
                : `$${event.price.infant}-${event.price.adult}`}
            </span>
            <p className="p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        {/* Date and Time */}
        <p className="p-medium-16 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        {/* Event Title */}
        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 text-black">
            {event.title}
          </p>
        </Link>

        {/* Order Link */}
        {hasOrderLink && (
          <Link
            href={`/dashboard/orders?eventId=${event._id}`}
            className="flex gap-2"
          >
            <p className="text-primary-500">Order Details</p>
            <Image
              src="/assets/icons/arrow.svg"
              alt="search"
              width={10}
              height={10}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
