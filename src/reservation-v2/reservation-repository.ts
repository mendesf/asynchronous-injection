import * as TE from 'fp-ts/TaskEither';
import { SystemError } from 'src/common/error';
import { Reservation } from './reservation';

export interface IReservationRepository {
  readReservations: (date: Date) => TE.TaskEither<SystemError, Reservation[]>;
  create: (reservation: Reservation) => TE.TaskEither<SystemError, number>;
}

export class ReservationRepository implements IReservationRepository {
  readReservations = (date: Date): TE.TaskEither<SystemError, Reservation[]> => {
    return TE.tryCatch(
      () => Promise.resolve([]),
      () => new SystemError('Failed to Load reservations.', 'load-reservations'),
    );
  };

  create = (reservation: Reservation): TE.TaskEither<SystemError, number> => {
    return TE.tryCatch(
      () => Promise.resolve(1),
      () => new SystemError('Failed to create reservation.', 'create-reservation'),
    );
  };
}
