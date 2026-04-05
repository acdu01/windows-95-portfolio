import React, { forwardRef } from "react";
import { windowsButton, icon } from "./TaskBar.css.mjs";
const WindowButton = forwardRef(
  ({ children, small = false, icon: icon$1, active = false, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "button",
    {
      className: windowsButton({ active, small }),
      ...props,
      ref
    },
    /* @__PURE__ */ React.createElement("div", { className: icon }, icon$1),
    children
  )
);
export {
  WindowButton
};
