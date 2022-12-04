import { InputAdmin, Loading } from "@/components";
import {
  CLEAR_ERRROR_UPDATE_CATEGORY,
  UPDATE_CATEGORY_RESET,
} from "@/constants/redux.contants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import {
  getDetails,
  updateCategoryDetails,
} from "@/redux/actions/category.actions";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateCategory: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { category, loading } = useAppSelector(
    (state) => state.categoryDetails
  );

  const {
    loading: updateLoading,
    success,
    error,
  } = useAppSelector((state) => state.updateCategoryDetails);

  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [images, setImages] = useState<ArrayBuffer | string>(
    category?.imgs || ""
  );
  const [imagesPreview, setImagesPreview] = useState<ArrayBuffer | string>(
    category?.imgs || ""
  );

  const categoryId = router.query?.id;

  const handleDataChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((files) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // @ts-ignore
          setImagesPreview(reader.result);
          setImages(reader.result);
        }
      };

      // @ts-ignore
      reader.readAsDataURL(files);
    });
  };

  const handleFormSubmitUpdateCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);

    const id = toast.loading("Update category....");
    // @ts-ignore

    formData.append("images", images?.url || images);

    // @ts-ignore
    dispatch(updateCategoryDetails(categoryId, formData));
    toast.remove(id);
  };

  useEffect(() => {
    if (!category || category?._id !== categoryId) {
      // @ts-ignore
      dispatch(getDetails(categoryId));
    } else {
      setName(category?.name);
      setDescription(category?.description);
      setImages(category?.img?.url);
      setImagesPreview(category?.img?.url);
    }

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRROR_UPDATE_CATEGORY });
    }

    if (success) {
      toast.success("Create successfully");
      dispatch({ type: UPDATE_CATEGORY_RESET });
      router.push("/dashboard/category");
    }
  }, [dispatch, categoryId, category, success, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <Head>
            <title>Update category</title>
          </Head>
          <h5 className='text-2xl font-extrabold text-gray-700'>
            Update category page
          </h5>
          <form onSubmit={handleFormSubmitUpdateCategory}>
            <div className='grid gap-3 mb-6'>
              <InputAdmin
                name='title'
                label='Name product'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputAdmin
                name='description'
                value={description}
                as='textarea'
                label='Description'
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputAdmin
                name='images'
                type='file'
                value={images as string}
                onChange={handleDataChange}
                label='Images'
              />
              <div className='flex gap-2 items-center justify-center'>
                {imagesPreview && (
                  //@ts-ignore
                  <img
                    className='object-cover w-[400px] h-[300px] rounded-md'
                    // @ts-ignore
                    src={imagesPreview?.url || (imagesPreview as string)}
                    alt='Avatar priview'
                  />
                )}
              </div>
              <p className='py-2 text-red-500'>{error}</p>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Submit update
              </button>
            </div>
          </form>
        </Layout>
      )}
    </>
  );
};

export default UpdateCategory;
