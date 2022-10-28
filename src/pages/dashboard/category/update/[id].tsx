import { InputAdmin } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const UpdateCategory: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error, success } = useAppSelector((state) => state.createCategory);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ArrayBuffer | string>("");
  const [imagesPreview, setImagesPreview] = useState<ArrayBuffer | string>("");

  const handleDataChange = (e) => {};

  const handleFormSubmitUpdateProduct = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Head>
        <title>Update category</title>
      </Head>
      <h5 className='text-2xl font-extrabold text-gray-700'>
        Update category page
      </h5>
      <form onSubmit={handleFormSubmitUpdateProduct}>
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
                src={imagesPreview as string}
                alt='Avatar priview'
              />
            )}
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit update
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default UpdateCategory;
