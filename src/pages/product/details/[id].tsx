import { ProductDetails, SectionCategory, Loading } from "@/components";
import ReviewCard from "@/components/ReviewCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { getCategories } from "@/redux/actions/category.actions";
import {
  clearErrors,
  getDetails,
  newReview,
} from "@/redux/actions/product.actions";
import { Rate } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const { loading, product, error } = useAppSelector(
    (state) => state.productDetails
  );
  const { loading: loadingCategories, categories } = useAppSelector(
    (state) => state.categories
  );
  const { success, error: veviewError } = useAppSelector(
    (state) => state.newReview
  );

  const { user } = useAppSelector((state) => state.user);

  const handleSubmitCreateCommentNew = async (e) => {
    e.preventDefault();
    const id = toast.loading("Post comment...");
    const formData = new FormData();
    formData.set("rating", rating as unknown as string);
    formData.set("comment", comment);
    formData.set("productId", router.query.id as string);

    //@ts-ignore
    await dispatch(newReview(formData));
    setComment("");
    toast.remove(id);
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getDetails(router.query.id));

    // @ts-ignore
    dispatch(getCategories());

    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Post comment success !");
    }

    if (veviewError) {
      toast.error("Post comment error");
    }

    if (error) {
      // @ts-ignore
      dispatch(clearErrors());
      router.replace("/");

      toast.error("Product is not found");
    }
  }, [dispatch, veviewError, success, error]);

  return (
    <>
      {loading || loadingCategories ? (
        <Loading />
      ) : (
        <div>
          <LayoutMain>
            <div>
              <ProductDetails product={product} />
              <div className='w-full mx-auto flex flex-col p-5 my-10 border-[2px] shadow-yellow-500 shadow rounded-sm space-y-2 bg-white'>
                <h3 className='text-4xl font-bold'>Comments</h3>
                <hr className='pb-2' />
                <div className='flex flex-col gap-3'>
                  {product?.reviews &&
                    product.reviews.map((review) => <ReviewCard />)}
                  {!product?.reviews?.length && (
                    <p className='italic text-xs text-gray-500'>
                      0 comments of products
                    </p>
                  )}
                </div>
              </div>
              <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
              {user ? (
                <>
                  <form
                    className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
                    onSubmit={handleSubmitCreateCommentNew}
                  >
                    <h3 className='text-sm text-yellow-500'>Amazone EB....</h3>
                    <h4 className='text-3xl font-bold'>
                      Leave a comment below!
                    </h4>
                    <hr className='py-3 mt-2' />
                    <label htmlFor='' className='block mb-5'>
                      <span className='text-gray-700'>Comment</span>
                      <p>
                        Choose ratings:{" "}
                        <Rate
                          allowHalf
                          value={rating}
                          onChange={(e) => setRating(e)}
                        />
                      </p>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={8}
                        className='shadow rounded border py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none ring-0'
                        placeholder='Comment...'
                      />
                    </label>

                    <input
                      disabled={!comment}
                      type='submit'
                      className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold cursor-pointer py-2 px-4 rounded duration-200 ease-in-out disabled:opacity-60 disabled:pointer-events-none'
                    />
                  </form>
                </>
              ) : (
                <p className='text-yellow-500 text-2xl font-semibold  text-center'>
                  Loggin to comment
                </p>
              )}
            </div>
            <SectionCategory categories={categories} />
          </LayoutMain>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
