import { InputAdmin } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { createCategory } from "@/redux/actions/category.actions";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const newCategory: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error, success } = useAppSelector((state) => state.createCategory);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ArrayBuffer | string>("");
  const [imagesPreview, setImagesPreview] = useState<ArrayBuffer | string>("");

  const handleFormSubmitNewProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);

    const id = toast.loading("Create category....");
    // @ts-ignore

    formData.append("images", images);

    // @ts-ignore
    dispatch(createCategory(formData));
    toast.remove(id);
  };

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

  useEffect(() => {
    if (success) {
      toast.success("Create category success !!");
      router.push("/dashboard/category");
    }

    if (error) {
      toast.error(error);
    }
  }, [success, toast, error]);

  return (
    <Layout>
      <Head>
        <title>Create category</title>
      </Head>
      <h5 className='text-2xl font-extrabold text-gray-700'>
        Create category page
      </h5>
      <form onSubmit={handleFormSubmitNewProduct}>
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
          <p>{error}</p>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default newCategory;
