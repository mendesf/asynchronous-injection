import * as E from 'fp-ts/Either';
import { BusinessError } from 'src/common/error';
import { IMaitreD, Reservation, TryAcceptInput } from './reservation';

export class MaitreD implements IMaitreD {
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  tryAccept =
    (input: TryAcceptInput) =>
    (reservations: Reservation[]): E.Either<BusinessError, Reservation> => {
      const reservedSeats = reservations.reduce<number>((sum, r) => sum + r.quantity, 0);

      if (this.capacity < reservedSeats + input.quantity) {
        return E.left(new BusinessError('Table unavailable.', 'try-accept-reservation'));
      }

      return E.right({ ...input, isAccepted: true });
    };
}
