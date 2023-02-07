import { SystemError } from 'src/common/error';
import { Reservation } from './reservation';

export interface IReservationRepository {
  readReservations(date: Date): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<number>;
}

export class ReservationRepository implements IReservationRepository {
  readReservations(date: Date): Promise<Reservation[]> {
    throw new SystemError('Failed to Load reservations.', 'load-reservations');
  }

  create(reservation: Reservation): Promise<number> {
    throw new SystemError('Failed to create reservation.', 'create-reservation');
  }
}
