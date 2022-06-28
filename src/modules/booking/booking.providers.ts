import { Booking } from "src/models/booking.model";

export const bookingProviders = [
    {
        provide: "BOOKING_REPOSITOTY",
        useValue: Booking
    }
]
