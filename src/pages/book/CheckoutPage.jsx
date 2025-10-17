import React, { use, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2"; // ✅ fixed import
import { useCreateOrderMutation } from "../../redux/Features/Orders/orderApi"; // ✅ import mutation hook

function CheckoutPage() {
  // Get items from Redux cart
  const cartitems = useSelector((state) => state.cart.cartitems);

  // Calculate total price
  const totalPrices = cartitems
    .reduce((acc, item) => acc + Number(item.newPrice), 0)
    .toFixed(2);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // API mutation hook from RTK Query
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  // Get logged-in user
  const { currentUser } = useAuth();

  // Handle form submission
  const onSubmit = async (data) => {
    const neworder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productids: cartitems.map((item) => item?._id),
      totalPrices: totalPrices,
    };

    try {
      // Send API request
      await createOrder(neworder).unwrap();

      // Show confirmation alert
      Swal.fire({
        title: "Confirmation",
        text: "Your order placed successfully.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });

      navigate("/order");
    } catch (err) {
      console.error("Failed to create order:", err);
      alert("Failed to create order. Please try again.");
    }
  };

  // Show loading or error states
  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p className="text-red-500">An error occurred. Please try again.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 mb-2">
            Cash On Delivery
          </h2>
          <p className="text-gray-500 mb-2">Total price: {totalPrices}</p>
          <p className="text-gray-500 mb-6">
            Items: {cartitems.length > 0 ? cartitems.length : 0}
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            {/* ✅ Fixed async submit */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  {/* Full Name */}
                  <div className="md:col-span-5">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.name && (
                      <p className="text-red-500">Name is required</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      value={currentUser?.email || ""}
                      disabled
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="number"
                      {...register("phone", { required: true })}
                      placeholder="+123 456 7890"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.phone && (
                      <p className="text-red-500">Phone is required</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      {...register("city")}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* Country */}
                  <div className="md:col-span-2">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      {...register("country")}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* State */}
                  <div className="md:col-span-2">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      {...register("state")}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* Zipcode */}
                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      type="text"
                      {...register("zipcode")}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="form-checkbox"
                      />
                      <label className="ml-2">
                        I agree to the{" "}
                        <Link className="underline text-blue-600">Terms</Link>{" "}
                        &{" "}
                        <Link className="underline text-blue-600">Policy</Link>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-5 text-right">
                    <button
                      disabled={!isChecked}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
