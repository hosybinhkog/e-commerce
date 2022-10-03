import React from "react";

interface StatusCard {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  count: number | string;
  title: string;
}

const StatusCard: React.FC<StatusCard> = ({ icon: Icon, count, title }) => {
  return (
    <div className='status-card'>
      <div className='status-card__icon'>
        <Icon />
      </div>
      <div className='status-card__info'>
        <h4>{count}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default StatusCard;
