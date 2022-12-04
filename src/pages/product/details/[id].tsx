import {
  ProductDetails,
  SectionCategory,
  Loading,
  InputAdmin,
} from "@/components";
import ReviewCard from "@/components/ReviewCard";
import { NEW_REVIEW_RESET } from "@/constants/redux.contants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { addItemsToCart } from "@/redux/actions/cart.actions";
import { getCategories } from "@/redux/actions/category.actions";
import {
  clearErrors,
  getDetails,
  newReview,
} from "@/redux/actions/product.actions";
import { InputNumber, Pagination, Rate } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [quanlity, setQuantity] = useState(1);
  const [currentComment, setCurrentComment] = useState<number>(1);
  const [defaultSizePage, setDefaultSizePage] = useState<number>(5);
  const [imgs, setImgs] = useState<ArrayBuffer | undefined[]>([]);
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

  const handleSubmitCreateCommentNew = (e) => {
    e.preventDefault();
    const id = toast.loading("Post comment...");
    const formData = new FormData();
    formData.set("rating", rating as unknown as string);
    formData.set("comment", comment);
    formData.set("productId", router.query.id as string);

    // @ts-ignore
    imgs.forEach((image) => {
      formData.append("imgs", image);
    });

    //@ts-ignore
    dispatch(newReview(formData));
    setComment("");
    setRating(5);
    toast.remove(id);
  };

  const decreaseQuantity = () => {
    if (product.Stock <= quanlity) {
      toast.error("Quantity < Stock");
      return;
    }
    setQuantity((quanlity) => quanlity + 1);
  };

  const imcreaseQuantity = () => {
    if (quanlity === 1) {
      toast.error("Quantity >= 0");
      return;
    }
    setQuantity((quanlity) => quanlity - 1);
  };

  const handleAddToCart = () => {
    // @ts-ignore
    dispatch(addItemsToCart(router.query.id, quanlity));
    setImgs([]);
    toast.success("Add cart successfully");
  };

  const handleDataChange = (e) => {
    const files = Array.from(e.target.files);

    setImgs([]);

    files.forEach((files) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // @ts-ignore
          setImgs((old) => [...old, reader.result]);
        }
      };

      // @ts-ignore
      reader.readAsDataURL(files);
    });
  };

  const reviewShowNumber =
    currentComment === 1 ? 0 : (currentComment - 1) * defaultSizePage;

  useEffect(() => {
    if (success) {
      toast.success("Post comment success !");
      setImgs([]);
      dispatch({ type: NEW_REVIEW_RESET });
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

    // @ts-ignore
    dispatch(getDetails(router.query.id));

    // @ts-ignore
    dispatch(getCategories());

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch, veviewError, success, error]);

  return (
    <>
      {loading || loadingCategories ? (
        <Loading />
      ) : (
        <div>
          <LayoutMain>
            <div>
              <ProductDetails
                product={product}
                quanlity={quanlity}
                decreaseQuantity={decreaseQuantity}
                imcreaseQuantity={imcreaseQuantity}
                handleAddToCart={handleAddToCart}
              />
              <div className='w-full mx-auto flex flex-col p-5 my-10 border-[2px] shadow-yellow-500 shadow rounded-sm space-y-2 bg-white'>
                <h3 className='text-4xl font-bold'>Comments</h3>
                <hr className='pb-2' />
                <div className='flex flex-col gap-3'>
                  {product?.reviews &&
                    product.reviews
                      .slice(
                        reviewShowNumber,
                        reviewShowNumber + defaultSizePage
                      )
                      .map((review) => (
                        <ReviewCard key={review._id} review={review} />
                      ))}
                  {!product?.reviews?.length && (
                    <p className='italic text-xs text-gray-500'>
                      0 comments of products
                    </p>
                  )}
                  <div className='flex items-center justify-center gap-3'>
                    <Pagination
                      size='default'
                      current={currentComment}
                      pageSize={defaultSizePage}
                      responsive
                      total={product?.reviews?.length}
                      onChange={(e) => setCurrentComment(e)}
                    />
                    <div className='flex items-center gap-2'>
                      <span>Set Size Page</span>
                      <InputNumber
                        min={1}
                        max={10}
                        size='small'
                        value={defaultSizePage}
                        onChange={(e) => setDefaultSizePage(e)}
                      />
                    </div>
                  </div>
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
                      <InputAdmin
                        type='file'
                        name='imgs'
                        label='Images'
                        multible
                        onChange={handleDataChange}
                      />
                      <div className='flex gap-3 items-center flex-wrap py-2'>
                        {imgs &&
                          //@ts-ignore
                          imgs.map((item, index) => (
                            <img
                              key={index}
                              className='object-cover w-[200px] h-[150px] rounded-md'
                              src={item}
                              alt='Avatar priview'
                            />
                          ))}
                      </div>
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
