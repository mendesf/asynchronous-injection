import * as E from 'fp-ts/Either';
import { BusinessError } from 'src/common/error';

export type Reservation = Readonly<{
  date: Date;
  email: string;
  name: string;
  quantity: number;
  isAccepted: boolean;
}>;

export type TryAcceptInput = Omit<Reservation, 'isAccepted'>;

export interface IMaitreD {
  tryAccept(input: TryAcceptInput): (reservations: Reservation[]) => E.Either<BusinessError, Reservation>;
}
