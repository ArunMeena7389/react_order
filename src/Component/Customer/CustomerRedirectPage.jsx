import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCustomerDataAction,
  getpackageCustomerDataAction,
} from "../../Redux/Action";
import { useDispatch } from "react-redux";

const CustomerRedirectPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    localStorage.setItem("business_ID", id);
    await dispatch(getpackageCustomerDataAction(id, (data) => {}));
    await dispatch(
      getCustomerDataAction(id, (data) => {
        navigate("/customer", { replace: true, state: { businessID: id } });
      })
    );
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/main-icon.jpg"
            alt="Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Welcome!
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-6">
          We are preparing your experience. Please wait a moment while we load
          everything for you.
        </p>

        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRedirectPage;
