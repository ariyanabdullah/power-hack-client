import React from "react";
import { toast } from "react-hot-toast";

const Modal = ({ setUserInfo, refetch, setLoading }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const FullName = form.name.value;
    const email = form.email.value;
    const phone = form.number.value;
    const amount = form.amount.value;

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    const d = new Date();
    const years = parseFloat(d.getTime() / year);

    const userInfo = {
      FullName,
      email: email,
      phone: phone,
      amount: amount,
      date: years,
    };

    setLoading(true);

    const url = "https://power-hack-six.vercel.app/api/add-billing";

    fetch(url, {
      method: "POST",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ userInfo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Billing Added Successfully");
          refetch();
          setLoading(false);
          setUserInfo(null);
        }
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
        return;
      });
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-[300px]">
          <div>
            <h1 className="text-center my-3 text-xl font-bold text-primary">
              Add Your <span className="text-[#eb01b9]">Information</span>
            </h1>

            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className=" input rounded-none p-0 mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />

              <input
                type="number"
                required
                name="number"
                placeholder="Phone Number"
                className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />
              <input
                type="number"
                name="amount"
                required
                placeholder="Payable Amount"
                className=" input p-0  rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />
              <button
                type="submit"
                className="btn btn-sm btn-outline btn-secondary"
              >
                submit
              </button>
              <label
                htmlFor="my-modal"
                className="btn btn-sm btn-primary ml-2  "
              >
                cencel
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
