import React, { FC } from 'react';
import './Location-info.scss';

interface LocationInfoProps {
  city: string;
  icon: string;
  conditionText: string;
}

const get128pxImage = (url: string): string  => {
  return url.replace('64x64', '128x128');
}

const LocationInfo: FC<LocationInfoProps> = (props: LocationInfoProps) => (
  <div className="LocationInfoWrapper">
    <p className='LocationInfoCity'>{props.city}</p>
    <div className='LocationInfoConditionWrapper'>
      <img className='LocationInfoConditionIcon' src={get128pxImage(props.icon)} alt="Weather icon" />
      <p className='LocationInfoConditionText'>{props.conditionText}</p>
    </div>
  </div>
);

export default LocationInfo;
