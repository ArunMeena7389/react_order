import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCustomerDataAction,
  getpackageCustomerDataAction,
} from "../../Redux/Action";
import { useDispatch } from "react-redux";

const CustomerRedirectPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // get id from url
  const navigate = useNavigate();
  console.log(id, "ididid-------1111");

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
  }, []);
  return <div></div>;
};

export default CustomerRedirectPage;
