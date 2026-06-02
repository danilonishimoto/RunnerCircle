import AddShoppingCart from '@mui/icons-material/AddShoppingCart';

function CarouselItem({ item }) {
  return (
    <div className="w-1/3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
      <div className="w-full h-[70%] py-4">
        <img src={item.image} alt="" className="object-contain w-full h-full" />
      </div>
      <div className="bg-brand-green-lime h-[30%] px-3 py-2 flex flex-row items-center justify-between ">
        <div className="flex flex-col justify-top h-full">
          <p className="text-xs">{item.price}</p>
          <p className='font-medium'>{item.title}</p>
        </div>
        <button className="bg-white h-12 aspect-square flex items-center justify-center rounded-full ml-2">
          <AddShoppingCart />
        </button>
      </div>
    </div>
  );
}

export default CarouselItem;
