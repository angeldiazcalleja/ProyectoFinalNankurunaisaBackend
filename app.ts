import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/entities/users/routers";
import appointmentRouter from "./src/entities/appointments/appointmentsRouters";
import destinationRouter from "./src/entities/destinations/destinationsRouters";
import bookingRouter from "./src/entities/bookings/bookingsRouters";


import cors from "cors";
import CONF from "./src/core/config";

const app = express();

app.use(express.json());
const { PORT, DB_URL } = CONF;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Successful database connection");
  })
  .catch((err) => console.log("Database connection error: " + err));

  const corsOptions = {
    origin: 'https://preeminent-panda-fd88f1.netlify.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.use(cors());
  app.use("/users", userRouter);
  app.use("/auth", userRouter);
  app.use("/appointments", appointmentRouter)
 app.use("/destinations", destinationRouter)
 app.use("/bookings", bookingRouter)
  
app.listen(PORT, () => {
  console.log("Server is up and running on " + PORT);
});