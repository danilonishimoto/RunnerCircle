import { useState } from "react";
import CarouselItem from "./CarouselItem";
import { ArrowBackIos } from "@mui/icons-material";
import { ArrowForwardIos } from "@mui/icons-material";

function Carousel({ items = [] }) {
  const [current, setCurrent] = useState(0);
  
  const handleBackClick = () => {
    const min = 0
    current > min && setCurrent((prev) => prev - 1);
  };

  const handleForwardClick = () => {
    const max = items.length - 3
    current < max && setCurrent((prev) => prev + 1);
  };

  console.log(current)

  return (
    <div className="w-full h-[272px] flex justify-center items-center">
      <div className="flex items-center">
        <button>
          <ArrowBackIos onClick={handleBackClick} />
        </button>
      </div>
      <div className="w-4/5 flex flex-row justify-between gap-2 px-2 h-full">
        {items.map((item, index) => {
          if (index === current) {
            return <CarouselItem item={item} />;
          } else if(index === current + 1) {
            return <CarouselItem item={item} />
          } else if(index === current + 2) {
            return <CarouselItem item={item} />
          }
        })}
      </div>
      <div className="flex items-center">
        <button>
          <ArrowForwardIos onClick={handleForwardClick} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
