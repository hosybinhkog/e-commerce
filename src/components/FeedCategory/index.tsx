import { Category } from "@/interfaces";
import React from "react";
import CategoryFeedItem from "./CategoryFeedItem";

interface FeedCategoryProps {
  categories: Category[];
}

const FeedCategory: React.FC<FeedCategoryProps> = ({ categories }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto pb-[200px]'>
      {categories.slice(0, 8).map((category) => (
        <CategoryFeedItem key={category._id} category={category} />
      ))}
    </div>
  );
};

export default FeedCategory;
