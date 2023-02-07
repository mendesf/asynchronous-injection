import { flow, pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { ActionResult, handleError, Ok } from 'src/common/http';
import { IMaitreD } from './reservation';
import { IReservationRepository } from './reservation-repository';

export type PostInput = Readonly<{
  date: Date;
  email: string;
  name: string;
  quantity: number;
}>;

export class ReservationController {
  private readonly repository: IReservationRepository;
  private readonly maitreD: IMaitreD;

  constructor(repository: IReservationRepository, maitreD: IMaitreD) {
    this.maitreD = maitreD;
    this.repository = repository;
  }

  Post(input: PostInput): Promise<ActionResult> {
    return pipe(
      this.repository.readReservations(input.date),
      TE.chain(flow(this.maitreD.tryAccept(input), TE.fromEither)),
      TE.chain(this.repository.create),
      TE.match(
        (err) => handleError(err),
        (id) => new Ok({ id }),
      ),
    )();
  }
}
