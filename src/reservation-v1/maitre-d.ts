import { BusinessError } from 'src/common/error';
import { IMaitreD, Reservation } from './reservation';
import { IReservationRepository } from './reservation-repository';

export class MaitreD implements IMaitreD {
  private readonly capacity: number;
  private readonly repository: IReservationRepository;

  constructor(capacity: number, repository: IReservationRepository) {
    this.capacity = capacity;
    this.repository = repository;
  }

  async tryAccept(reservation: Reservation): Promise<number> {
    const reservations = await this.repository.readReservations(reservation.date);
    const reservedSeats = reservations.reduce<number>((sum, r) => sum + r.quantity, 0);

    if (this.capacity < reservedSeats + reservation.quantity) {
      throw new BusinessError('Table unavailable.', 'try-accept-reservation');
    }

    return this.repository.create({ ...reservation, isAccepted: true });
  }
}
