import { InputAdmin } from "@/components";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import { Country, State } from "country-state-city";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { saveShoppingInfo } from "@/redux/actions/cart.actions";
import PrivateRoute from "@/layouts/auth/PrivateRoute";

const Shipping: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { shippingInfo } = useAppSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const handleFormShoppingSubmit = (e) => {
    e.preventDefault();

    if (!address || !city || !country || !state) {
      toast.error("All field not emty!!");
      return;
    }

    if (phoneNo?.length > 12 || phoneNo.length < 9) {
      toast.error("Phone number to 9 - 12");
      return;
    }

    dispatch(
      // @ts-ignore
      saveShoppingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    toast.success("Save shopping info");
    router.push("/order/confirm");
  };

  const dataSelect = Country.getAllCountries().map((item) => {
    return {
      _id: item.isoCode,
      name: item.name,
    };
  });

  console.log(dataSelect);

  return (
    <div>
      <PrivateRoute>
        <Head>
          <title>Shipping - Amazone</title>
        </Head>
        <LayoutMain>
          <div className='my-8 mx-4'>
            <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
              Shipping Details
            </h1>
            <form
              className='max-w-[1000px]'
              onSubmit={handleFormShoppingSubmit}
            >
              <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
                Infomation
              </h3>
              <p className='text-base text-gray-400 mb-2'>
                Amazone - hosybinhkog - hutech
              </p>
              <InputAdmin
                label='Your ddress'
                name='address'
                placeholder='49/1 bui dinh tuy...'
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
              />
              <InputAdmin
                label='Your city'
                name='city'
                placeholder='Ho chi minh city'
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
              />
              <InputAdmin
                label='Your phone'
                name='phoneNo'
                type='number'
                placeholder='0987654321'
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <InputAdmin
                label='Pin code'
                name='pinCode'
                type='number'
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />

              <InputAdmin
                as='select'
                name='country'
                label='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                dataSelect={dataSelect}
              />
              {country && (
                <InputAdmin
                  as='select'
                  name='State'
                  label='State'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  dataSelect={State.getStatesOfCountry(country).map((item) => {
                    return {
                      _id: item.isoCode,
                      name: item.name,
                    };
                  })}
                />
              )}
              <button
                disabled={
                  !address ||
                  !city ||
                  !country ||
                  !state ||
                  !phoneNo ||
                  !pinCode
                }
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2 disabled:opacity-40 disabled:cursor-not-allowed'
              >
                Submit
              </button>
            </form>
          </div>
        </LayoutMain>
      </PrivateRoute>
    </div>
  );
};

export default Shipping;
