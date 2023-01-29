import React from "react";

const BillingModal = ({ userInfo, setUserInfo, refetch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const FullName = form.name.value || userInfo?.FullName;
    const email = form.email.value || userInfo?.email;
    const phone = form.number.value || userInfo?.phone;
    const amount = form.amount.value || userInfo?.amount;

    const userData = {
      FullName,
      email: email,
      phone: phone,
      amount: amount,
    };

    const url = `https://power-hack-six.vercel.app/api/update-billing/${userInfo?._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserInfo(null);
          refetch();
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-[300px]">
          <div>
            <h1 className="text-center my-3 text-xl font-bold text-primary">
              Edit Billing <span className="text-[#eb01b9]">Information</span>
            </h1>

            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                name="name"
                placeholder={
                  userInfo?.FullName ? `${userInfo.FullName}` : "FullName"
                }
                className=" input rounded-none p-0 mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />

              <input
                type="email"
                name="email"
                placeholder={
                  userInfo?.email ? `${userInfo.email}` : "User Email"
                }
                className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />

              <input
                type="number"
                name="number"
                placeholder={
                  userInfo?.phone ? `${userInfo.phone}` : "User Phone Number"
                }
                className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />
              <input
                type="number"
                name="amount"
                placeholder={
                  userInfo?.amount ? `${userInfo.amount}` : "Payable Ammount"
                }
                className=" input p-0  rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />
              <button
                type="submit"
                className="btn btn-sm btn-outline btn-secondary"
              >
                Update
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

export default BillingModal;
