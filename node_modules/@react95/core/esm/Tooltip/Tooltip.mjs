import React, { forwardRef, useState } from "react";
import cn from "classnames";
import { wrapper, tip } from "./Tooltip.css.mjs";
function formatDate(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day.toString().padStart(2, "0")} ${monthNames[monthIndex]} ${year}`;
}
const TooltipRenderer = ({
  children,
  text = formatDate(/* @__PURE__ */ new Date()),
  delay = 1e3,
  ...rest
}, ref) => {
  const [show, setShow] = useState(false);
  const [delayTimer, setDelayTimer] = useState(0);
  const handleEnter = () => {
    const timer = window.setTimeout(() => {
      setShow(true);
    }, delay);
    setDelayTimer(timer);
  };
  const handleLeave = () => {
    clearTimeout(delayTimer);
    setShow(false);
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ...rest,
      className: cn(wrapper, rest.className),
      onMouseEnter: handleEnter,
      onMouseLeave: handleLeave,
      ref
    },
    show && /* @__PURE__ */ React.createElement("div", { className: tip }, text),
    children
  );
};
const Tooltip = forwardRef(
  TooltipRenderer
);
export {
  Tooltip
};
