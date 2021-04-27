import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfAlt as halfStar } from "@fortawesome/free-solid-svg-icons";

const ReviewStars = (props) => {
  const [value, setValue] = useState(props.value);
  const [maxStars, setMaxStars] = useState(props.maxStars);
  const [color, setColor] = useState(props.color);
  const [fullIcon, setFullIcon] = useState(props.fullIcon);
  const [halfIcon, setHalfIcon] = useState(props.halfIcon);
  const [emptyIcon, setEmptyIcon] = useState(props.emptyIcon);
  const [clickable, setClickable] = useState(props.clickable);
  const [showNumerical, setShowNumerical] = useState(props.showNumerical);
  const [spacing, setSpacing] = useState(props.spacing);
  const [size, setSize] = useState();

  useEffect(() => {
    if (props.onChange) props.onChange(value);
  }, [value]);

  useEffect(() => {
    setValue(props.value);
    setMaxStars(props.maxStars);
    setColor(props.color);
    setFullIcon(props.fullIcon);
    setHalfIcon(props.halfIcon);
    setEmptyIcon(props.emptyIcon);
    setClickable(props.clickable);
    setShowNumerical(props.showNumerical);
    setSpacing(props.spacing);
    setSize(props.size);
  }, [props]);

  return (
    <ul style={{ display: "inline", listStyleType: "none", padding: 0 }}>
      {showNumerical ? <>({value}) </> : null}
      {Array.from(Array(maxStars).keys()).map((e, i) => {
        let icon = emptyIcon;

        if (i < Math.ceil(value) && value % 1 >= 0.5) icon = halfIcon;
        if (i < Math.floor(value)) icon = fullIcon;

        return (
          <li
            key={i}
            style={{
              display: "inline",
              color,
              cursor: clickable ? "pointer" : "default",
              marginLeft: i === 0 ? "0px" : spacing,
              fontSize: size,
            }}
            onClick={() => {
              if (clickable) {
                setValue(value === i + 1 ? i + 1 - 0.5 : i + 1);
              }
            }}
          >
            {icon}
          </li>
        );
      })}{" "}
    </ul>
  );
};

ReviewStars.defaultProps = {
  fullIcon: <FontAwesomeIcon icon={fullStar} />,
  halfIcon: <FontAwesomeIcon icon={halfStar} />,
  emptyIcon: <FontAwesomeIcon icon={emptyStar} />,
  value: 2,
  maxStars: 5,
  color: "#000000",
  clickable: false,
  showNumerical: false,
  spacing: "1px",
  size: "12pt",
};

export default ReviewStars;
