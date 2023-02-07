import { ActionResult, handleError, Ok } from 'src/common/http';
import { IMaitreD, Reservation } from 'src/reservation-v1/reservation';

export class ReservationController {
  private readonly maitreD: IMaitreD;

  constructor(maitreD: IMaitreD) {
    this.maitreD = maitreD;
  }

  async Post(reservation: Reservation): Promise<ActionResult> {
    try {
      const id = await this.maitreD.tryAccept(reservation);
      return new Ok({ id });
    } catch (err) {
      return handleError(err);
    }
  }
}
