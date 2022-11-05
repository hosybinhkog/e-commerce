import { Feed, FeedCategory, Loading } from "@/components";
import Banner from "@/components/Banner";
import { useAppDispatch, useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { getCategories } from "@/redux/actions/category.actions";
import { getProduct } from "@/redux/actions/product.actions";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const [cateogriesSearch, setCateogriesSearch] = useState("");
  const { loading: loadingCategories, categories } = useAppSelector(
    (state) => state.categories
  );
  const { loading, products } = useAppSelector((state) => state.products);

  useEffect(() => {
    // @ts-ignore
    dispatch(getCategories());
    // @ts-ignore
    dispatch(getProduct(router.query.keyword, currentPage, cateogriesSearch));
    window.scrollTo(0, 0);
  }, [dispatch, currentPage, cateogriesSearch, router.query.keyword]);

  return (
    <div>
      <Head>
        <title>Amazon EB</title>
      </Head>
      <LayoutMain>
        {loading || loadingCategories ? (
          <Loading />
        ) : (
          <>
            <Banner />
            <FeedCategory categories={categories} />
            <Feed products={products} />
          </>
        )}
      </LayoutMain>
    </div>
  );
};

export default Home;
