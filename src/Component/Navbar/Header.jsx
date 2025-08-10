import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../Ui-Elements/CustomDropdown/CustomDropdown";
import ButtonComponent from "../../Ui-Elements/Button/ButtonComponent";
import RoundedCircle from "../../Ui-Elements/RoundedCircle/RoundedCircle";
// import { useDispatch, useSelector } from 'react-redux';

// let initialPayload = {
//     "fields": ["name", "price", "image_url", "taste", "description"],
//     "filter": {
//     }
// }
const profileData = JSON.parse(localStorage.getItem("profile"));

const Header = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/merchant/item");
  };

  return (
    <nav className="header">
      <div
        style={{
          display: "flex",
        }}
      >
        <RoundedCircle size={40} content="αɱ" bgColor="bg-secondary" />
        <div className="ms-1" style={{ width: "100px" }}>
          <ButtonComponent
            name=" Add"
            onClick={handleAddClick}
            type="add"
            variant="secondary"
            fullWidth={true}
            icon="+"
            className="ms-2"
          />
        </div>
      </div>
      <div className="d-flex m-1" style={{ gap: 10 }}>
        <CustomDropdown
          triggerContent={
            <>
              <button className="logout-button">
                <RoundedCircle
                  size={35}
                  content={
                    <img
                      src={
                        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                      }
                      alt="Profile"
                      className="rounded-circle w-100 h-100"
                    />
                  }
                />

                <span className="mx-2">{profileData?.name || "Arun Meena"}</span>
              </button>
            </>
          }
          items={[
            { id: "1", name: "Profile" },
            { id: "2", name: "Settings" },
            { id: "3", name: "Logout" },
          ]}
          width={"220px"}
          onSelect={(item) => {
            if (item.id === "3") {
              localStorage.removeItem("token");
              navigate("/sign-in");
            } else if (item.id === "1") {
              navigate("/merchant/profile");
            }
          }}
        />
      </div>
    </nav>
  );
};

export default Header;
