import { Loading, ProductItem } from "@/components";
import { CLEAR_ERRORS_CATEGORY } from "@/constants/redux.contants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { getDetails } from "@/redux/actions/category.actions";
import { getProduct } from "@/redux/actions/product.actions";
import { Pagination } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductByCategories: NextPage = () => {
  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useAppSelector((state) => state.products);
  const {
    loading: loadingCategories,
    category,
    error,
  } = useAppSelector((state) => state.categoryDetails);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPage = Math.floor(filteredProductsCount / resultPerPage);

  useEffect(() => {
    //@ts-ignore
    dispatch(getDetails(router.query.id));

    if (error) {
      toast.error(error);
      //@ts-ignore
      dispatch({ type: CLEAR_ERRORS_CATEGORY });
      router.push("/");
    }

    // @ts-ignore
    dispatch(getProduct(router.query.keyword, currentPage, router.query.id));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch, currentPage, router.query.id, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutMain>
          <div className='px-5 py-5'>
            <h5 className='text-gray-900 font-extrabold md:text-3xl text-xl mb-2'>
              {category?.name}
            </h5>
            <p className='text-gray-500 text-xs mb-4'>
              {category?.description}
            </p>
            <div className='border rounded-lg py-2 px-4 border-gray-500 text-sm'>
              <p>
                {filteredProductsCount} products for{" "}
                <span className='text-xs text-red-500 font-semibold cursor-pointer'>
                  {category?.name}
                </span>
              </p>
            </div>
            <div className='grid-flow-row-dense grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {products?.map((product) => (
                <ProductItem key={product._id} imageHeight product={product} />
              ))}
            </div>
            <div className='flex items-center justify-center mt-4'>
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={totalPage}
                pageSize={20}
                onChange={(e) => setCurrentPage(e)}
              />
            </div>
            <div className='border rounded-lg py-3 mt-10  text-sm bg-gray-300 flex justify-center items-center'>
              <span className='hover:underline cursor-pointer text-2xl font-semibold text-[#007185]'>
                {" "}
                See all results
              </span>
            </div>
          </div>
        </LayoutMain>
      )}
    </>
  );
};

export default ProductByCategories;
