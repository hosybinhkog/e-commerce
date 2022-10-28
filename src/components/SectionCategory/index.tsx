import { Category } from "@/interfaces";
import { useRouter } from "next/router";
import React from "react";

interface SectionCategory {
  categories: Category[];
}

const SectionCategory: React.FC<SectionCategory> = ({ categories }) => {
  const router = useRouter();

  return (
    <div>
      <div className='bg-gray-100'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
            <h2 className='text-2xl font-bold text-gray-900 text-center'>
              Products by Categories
            </h2>

            <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
              {categories.slice(0, 6).map((callout) => (
                <div key={callout.name} className='group relative'>
                  <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                    <img
                      src={callout.img.url}
                      alt={callout.name}
                      className='h-full w-full object-cover object-center'
                      onClick={() => router.push(`/categories/${callout._id}`)}
                    />
                  </div>
                  <h3
                    className='mt-6 text-sm text-gray-500 cursor-pointer'
                    onClick={() => router.push(`/categories/${callout._id}`)}
                  >
                    <div>
                      <span className='absolute inset-0' />
                      {callout.name}
                    </div>
                  </h3>
                  <p className='text-base font-semibold text-gray-900'>
                    {callout.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCategory;
