import * as React from 'react';
import Icon from 'react-icons-kit';
import { man } from 'react-icons-kit/icomoon/man';
import { woman } from 'react-icons-kit/icomoon/woman';
import { manWoman } from 'react-icons-kit/icomoon/manWoman';
import { questionCircle } from 'react-icons-kit/fa/questionCircle';

import { RestroomGender } from '@models';

type RestroomGenderProps = {
  gender: RestroomGender;
};

export const RestroomGenderComponent: React.StatelessComponent<
  RestroomGenderProps
> = props => {
  let icon;
  switch (props.gender) {
    case RestroomGender.MALE:
      icon = man;
      break;
    case RestroomGender.FEMALE:
      icon = woman;
      break;
    case RestroomGender.ALLGENDER:
      icon = manWoman;
      break;
    default:
      icon = questionCircle;
  }
  return (
    <div className="restroom-gender">
      <Icon icon={icon} size={54} />
    </div>
  );
};
