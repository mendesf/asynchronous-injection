import { MaitreD } from './reservation-v2/maitre-d';
import { ReservationController } from './reservation-v2/reservation-controller';
import { ReservationRepository } from './reservation-v2/reservation-repository';

((): void => {
  const repository = new ReservationRepository();
  const maitreD = new MaitreD(100);
  const controller = new ReservationController(repository, maitreD);

  controller
    .Post({
      date: new Date(),
      email: 'a@b.c',
      name: 'Felipe',
      quantity: 2,
    })
    .then(console.log)
    .catch(console.error);
})();
