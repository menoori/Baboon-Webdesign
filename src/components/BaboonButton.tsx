import "./components.scss";
// REACT
import React, { ReactElement, useState } from "react";

// NPM INSTALLS

/*
  Information about the BaboonButton Component
*/

interface BaboonButtonProps {
  children: JSX.Element | JSX.Element[] | string | string[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonStyle?: "hitta på egna";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  type?: "submit" | "button" | "reset";
  noHoverAnimation?: boolean;
  transitionY?: boolean;
  tooltip?: string;
}
export default function BaboonButton(props: BaboonButtonProps) {
  // ----- CONSTANTS -----

  // ----- STATE -----

  // ----- USE HOOKS -----

  // ----- STYLING -----

  const buttonStyle: string = ``;

  // ----- HANDLERS -----
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      className={`baboon-button ${!props.noHoverAnimation && "has-hover"} 
      ${props.transitionY && "has-animation"}
      ${
        props.size === "small"
          ? "small"
          : props.size === "medium"
          ? "medium"
          : "large"
      }`}
      type={props.type}
      onClick={(e) => handleClick(e)}
      disabled={props.disabled}
      data-tooltip={props.tooltip}
    >
      <span className="baboon-button-span">{props.children}</span>
    </button>
  );
}
