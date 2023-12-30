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
