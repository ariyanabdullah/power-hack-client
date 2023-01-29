import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import BillingModal from "../EditBilling/BillingModal";

const BillingList = ({ billings, refetch, loading }) => {
  const { setPaid } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);
  const handleDelete = (id) => {
    const url = `https://power-hack-six.vercel.app/api/delete-billing/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Deleted SuccessFull");
          refetch();
        }
      });
  };

  // get the total paid ammount here
  let arr = [];

  const total = () => {
    billings?.forEach((element) => {
      arr = [...arr, element.amount];
    });
  };

  total();

  const totalPaidAmount = arr.reduce(
    (acc, currentValue) => acc + parseInt(currentValue),
    0
  );

  setPaid(totalPaidAmount);

  // total paid ammount end here

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-center">Billing Id</th>
              <th className="text-center">Full Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Phone</th>
              <th className="text-center">Paid Amount</th>
              <th className="text-center"> Action</th>
            </tr>
          </thead>
          <tbody>
            {billings?.map((bill) => {
              const { _id, FullName, phone, amount, email } = bill;
              return (
                <tr key={_id}>
                  <th className="text-center">
                    {" "}
                    {loading ? <> Generating Id </> : <> {_id}</>}{" "}
                  </th>
                  <td className="text-center">{FullName}</td>
                  <td className="text-center">{email}</td>
                  <td className="text-center">{phone}</td>
                  <td className="text-center">{amount}</td>
                  <td className="flext items-center justify-between">
                    <label
                      htmlFor="my-modal"
                      onClick={() => setUserInfo(bill)}
                      className="btn btn-link"
                    >
                      {" "}
                      Edit
                    </label>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="btn btn-link"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* <!-- row 1 --> */}
          </tbody>
        </table>
      </div>
      {userInfo && (
        <BillingModal
          userInfo={userInfo}
          refetch={refetch}
          setUserInfo={setUserInfo}
        >
          {" "}
        </BillingModal>
      )}
    </div>
  );
};

export default BillingList;
