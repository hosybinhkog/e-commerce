import { InputAdmin } from "@/components";
import Layout from "@/layouts/admin/Layout";
import { NextPage } from "next";

const newProduct: NextPage = () => {
  return (
    <Layout>
      <h5 className='text-2xl font-extrabold text-gray-700'>
        Create product page
      </h5>
      <form>
        <div className='grid gap-3 mb-6'>
          <InputAdmin as='textarea' name='name' label='Name' />
          <InputAdmin type='file' name='name' label='Name' />
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

export default newProduct;
