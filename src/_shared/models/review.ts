import * as moment from 'moment';

export type Review = {
  id: number;
  description: string;
  rating: number;
  outOfOrder: boolean;
  createDate: moment.Moment;
};
