import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerDataAction } from "../../Redux/Action";
import { useDispatch } from "react-redux";

const CustomerRedirectPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // get id from url
  const navigate = useNavigate();
  console.log(id, "ididid-------1111");

  useEffect(() => {
    localStorage.setItem("business_ID", id);
    dispatch(
      getCustomerDataAction(id, (data) => {
        navigate("/customer", { replace: true, state: { businessID: id } });
      })
    );
    // navigate('/customer', { replace: true, state: { businessID: id } });
    // eslint-disable-next-line
  }, []);
  return <div></div>;
};

export default CustomerRedirectPage;
