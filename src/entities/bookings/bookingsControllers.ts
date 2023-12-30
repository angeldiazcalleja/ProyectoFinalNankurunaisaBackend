import { bookingsExtendedModel } from './bookingsModel';

export const createBooking = async (req, res) => {
  try {
    const { customerId, reservationId, information, pay } = req.body;

    if (!customerId || !reservationId || !information || !pay) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBooking = new bookingsExtendedModel({
      date: new Date(),
      customerId,
      reservationId,
      information,
      pay,
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      message: 'Booking created successfully',
      newBooking: savedBooking.toObject(),
    });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const getAllBookings = async (req, res) => {
    try {
      const allBookings = await bookingsExtendedModel.find();
  
      res.status(200).json({
        message: 'All bookings retrieved successfully',
        bookings: allBookings,
      });
    } catch (error) {
      console.error('Error al obtener todas las reservas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  export const getBookingById = async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      const booking = await bookingsExtendedModel.findById(bookingId);
  
      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
  
      res.status(200).json({
        message: 'Booking retrieved successfully',
        booking,
      });
    } catch (error) {
      console.error('Error al obtener la reserva por ID:', error);
  
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  export const updateBookingById = async (req, res) => {
    const { bookingId } = req.params;
    const { information, pay } = req.body;
  
    try {
      const booking = await bookingsExtendedModel.findByIdAndUpdate(
        bookingId,
        { information, pay },
        { new: true }
      );
  
      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
  
      res.status(200).json({
        message: 'Booking updated successfully',
        updatedBooking: booking.toObject(),
      });
    } catch (error) {
      console.error('Error al actualizar la reserva por ID:', error);
  
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };