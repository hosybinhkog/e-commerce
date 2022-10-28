import { Category } from "@/interfaces";
import { useRouter } from "next/router";
import React from "react";

interface CategoryFeedItemProps {
  category: Category;
}

const CategoryFeedItem: React.FC<CategoryFeedItemProps> = ({ category }) => {
  const router = useRouter();

  const handlePushCategoryPage = () =>
    router.push(`/categories/${category._id}`);

  return (
    <div>
      <div className='relative flex flex-col m-5 bg-white  z-30 p-10 rounded-md'>
        <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
          One more category is the best
        </p>
        <h4
          onClick={handlePushCategoryPage}
          className='cursor-pointer line-clamp-2 font-bold text-lg text-gray-900'
        >
          {category.name}
        </h4>
        <img
          onClick={handlePushCategoryPage}
          src={
            category.img.url ||
            "https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Desktop_Dash_Kindle_1x._SY304_CB639752818_.jpg"
          }
          className='cursor-pointer w-full min-h-[300px] max-h-[350px] object-contain rounded-lg'
        />

        <p className='text-xs my-2 line-clamp-2'>{category.shortDescription}</p>
        <button
          onClick={handlePushCategoryPage}
          className='mt-auto text-left cursor-pointer text-blue-400 font-semibold hover:underline duration-150 transition'
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default CategoryFeedItem;
