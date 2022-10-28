import React from "react";
import ReactStars from "react-rating-stars-component";

interface ReviewCardProps {
  review?: any;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "yellow",
    value: review?.rating || 4.5,
    isHalf: true,
    size: 25,
  };
  return (
    <>
      <div className='flex gap-2 pb-3 border-b border-gray-300'>
        <div className=' flex-shrink-0'>
          <div className='border-yellow-400 p-2 border-[2px] mr-3 rounded-full'>
            <img
              src='https://alliance.site.drupaldisttest.cc.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
              alt=''
              className='h-10 w-10 rounded-full'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-xs font-bold'>
            {review?.name || "Nguyễn Xuân Thành"}
          </p>
          <ReactStars {...options} />
          <span className='text-base text-gray-500 max-w-2xl lg:max-w-full line-clamp-5'>
            {review?.comment ||
              "Hay qua pro ơi Hay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơiHay qua pro ơi"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
