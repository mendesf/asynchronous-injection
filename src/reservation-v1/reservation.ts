export type Reservation = Readonly<{
  date: Date;
  email: string;
  name: string;
  quantity: number;
  isAccepted: boolean;
}>;

export interface IMaitreD {
  tryAccept(reservation: Reservation): Promise<number>;
}
