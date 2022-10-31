import React from "react";
import { Carousel as CarouselAntd } from "antd";

import slide1 from "@assets/img/slide1.webp";
import slide2 from "@assets/img/slide2.webp";
import slide3 from "@assets/img/slide3.webp";
import slide4 from "@assets/img/slide4.webp";
import Image from "next/image";

const Banner: React.FC = () => {
  return (
    <React.Fragment>
      <div className='relative'>
        <div className='absolute w-full h-32 bg-gradient-to-t from-teal-100 to-transparent bottom-0 z-20'></div>
        <CarouselAntd
          autoplay
          infinite
          dotPosition='left'
          effect='fade'
          autoplaySpeed={5000}
        >
          <div>
            <Image className='rounded-b-md img-banner' src={slide1} alt='' />
          </div>
          <div>
            <Image className='rounded-b-md img-banner' src={slide2} alt='' />
          </div>
          <div>
            <Image className='rounded-b-md img-banner' src={slide3} alt='' />
          </div>
          <div>
            <Image className='rounded-b-md img-banner' src={slide4} alt='' />
          </div>
        </CarouselAntd>
      </div>
    </React.Fragment>
  );
};

export default Banner;
