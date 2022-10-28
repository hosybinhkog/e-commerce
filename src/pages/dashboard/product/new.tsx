import { InputAdmin } from "@/components";
import { NEW_PRODUCT_RESET } from "@/constants/redux.contants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { getCategories } from "@/redux/actions/category.actions";
import { clearErrors, createProduct } from "@/redux/actions/product.actions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const newProduct: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.categories);
  const { success, error, loading } = useAppSelector(
    (state) => state.newProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState<ArrayBuffer | undefined[]>([]);
  const [imagesPreview, setImagesPreview] = useState<ArrayBuffer | undefined[]>(
    []
  );

  const handleFormSubmitNewProduct = (e) => {
    e.preventDefault();
    const id = toast.loading("Create product....");

    const formData = new FormData();

    const categoryName = categories.find((cate) => cate._id === category);

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("description", description);
    formData.set("category", categoryName.name);
    formData.set("categoryId", category);
    formData.set("Stock", Stock.toString());

    // @ts-ignore
    images.forEach((image) => {
      formData.append("imgs", image);
    });

    // @ts-ignore
    dispatch(createProduct(formData));
    toast.remove(id);
  };

  const handleDataChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((files) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // @ts-ignore
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      // @ts-ignore
      reader.readAsDataURL(files);
    });
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getCategories());

    if (success) {
      toast.success("Create product successfully!!");
      router.push("/dashboard/product");
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    if (error) {
      toast.error("Error create product!!");
      // @ts-ignore
      dispatch(clearErrors());
    }
  }, [dispatch, error, success, toast, toast]);

  return (
    <Layout>
      <h5 className='text-2xl font-extrabold text-gray-700'>
        Create product page
      </h5>
      <form onSubmit={handleFormSubmitNewProduct}>
        <div className='grid gap-3 mb-6'>
          <InputAdmin
            name='name'
            label='Name product'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputAdmin
            name='price'
            label='Price'
            value={price}
            type='number'
            onChange={(e) => setPrice(e.target.value)}
          />
          <InputAdmin
            name='description'
            value={description}
            as='textarea'
            label='Description'
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputAdmin
            name='stock'
            value={Stock}
            type='number'
            label='Stock'
            onChange={(e) => setStock(e.target.value)}
          />
          <InputAdmin
            as='select'
            name='category'
            dataSelect={categories}
            value={Stock}
            type='number'
            label='Category'
            onChange={(e) => setCategory(e.target.value)}
          />
          <InputAdmin
            name='images'
            type='file'
            multible
            onChange={handleDataChange}
            label='Images'
          />
          <div className='flex gap-2 items-center flex-wrap'>
            {imagesPreview &&
              //@ts-ignore
              imagesPreview.map((item, index) => (
                <img
                  key={index}
                  className='object-cover w-[200px] h-[150px] rounded-md'
                  src={item}
                  alt='Avatar priview'
                />
              ))}
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50'
            disabled={
              !category || !name || !description || !images || !Stock || !price
            }
          >
            Submit to create
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default newProduct;
