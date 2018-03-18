import * as moment from 'moment';
import { Room } from '@models';

export type Review = {
  id: number;
  title: string;
  description: string;
  rating: number;
  restroom: Room;
  restroomId: number;
  author: any;
  authorIsAnonymous: boolean;
  createDate: moment.Moment;
  recaptchaResponse?: string;
};
