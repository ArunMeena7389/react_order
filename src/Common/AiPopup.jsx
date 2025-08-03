import React, { Fragment, useEffect, useState } from "react";
import PopupComponent from "../Ui-Elements/Popup/PopupComponent";
import ButtonComponent from "../Ui-Elements/Button/ButtonComponent";
import TextAreaComponent from "../Ui-Elements/TextArea/TextAreaComponent";
import { genrateAiText } from "../Redux/Action";
import { useDispatch } from "react-redux";

const AiPopup = ({
  isOpen = true,
  onClose,
  onPrimaryClick,
  textValue,
  ...props
}) => {
  const dispatch = useDispatch();
  const [aitextValue, setAitextValue] = useState(textValue);

  const genrateAiData = async () => {
    await dispatch(
      genrateAiText(
        { inputText: textValue, type: "Indian food short description" },
        (data) => {
          setAitextValue(data.description);
        }
      )
    );
  };
  useEffect(() => {
    if (isOpen) {
      genrateAiData();
    }
    // eslint-disable-next-line
  }, [isOpen]);
  return (
    <Fragment>
      <PopupComponent
        isOpen={isOpen}
        onClose={() => {
          if (onClose) onClose();
        }}
        title="Description Suggestion"
        width="700px"
        height="auto"
        content={
          <TextAreaComponent
            label="Description"
            name="desc"
            value={aitextValue}
            onChange={(e) => setAitextValue(e.target.value)}
          />
        }
        footer={
          <>
            <ButtonComponent
              name="Cancel"
              variant="secondary"
              onClick={() => {
                if (onClose) onClose();
              }}
            />
            <ButtonComponent
              name="Apply"
              variant="primary"
              onClick={() => {
                if (onPrimaryClick)
                  onPrimaryClick({ aitextValue: aitextValue });
              }}
            />
          </>
        }
      />
    </Fragment>
  );
};

export default AiPopup;
