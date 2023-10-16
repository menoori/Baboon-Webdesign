// REACT
import React, { useEffect, useState } from "react";

// INTERNAL IMPORTS
import "../style/main.scss";
import { AnimationManager } from "../managers/AnimationManager";
import { ValidationManager } from "../managers/ValidationManager";

// NPM INSTALLS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

/*
  Information about the Baboon Input Component
*/

interface BaboonInputProps {
  id?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  regexValidation?:
    | "tel"
    | "email"
    | "soc-sec"
    | "password"
    | "swe-car-plate"
    | "url"
    | RegExp;
  type?:
    | "password"
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "time"
    | "tel"
    | "url"
    | undefined;
  noValidationAnimation?: boolean;
  disabled?: boolean;
  hideIcon?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  noHoverAnimation?: boolean;
  tooltip?: string;
}
export default function BaboonInput(props: BaboonInputProps) {
  // ----- MANAGERS -----
  const AM = new AnimationManager();
  const VM = new ValidationManager();

  // ----- STATE -----
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");
  const [validate, setValidate] = useState<"success" | "neutral" | "error">(
    "neutral"
  );

  // ----- USE HOOKS -----
  useEffect(() => {
    try {
      if (!props.id && props.regexValidation && !props.noValidationAnimation) {
        console.log("Include id to have animation on your validation");
      }
      if (
        (props.type === "date" || props.type === "datetime-local") &&
        props.placeholder
      )
        throw new Error("date and datetime-local can't have a placeholder");
    } catch (error) {
      window.alert(error);
    }
  }, []);

  // ----- HANDLER FUNCTIONS -----

  const handleIcon = (): JSX.Element | null => {
    switch (props.type) {
      case "date" || "datetime-local":
        return (
          <FontAwesomeIcon icon={faCalendar} className="baboon-input-icon" />
        );
      case "password":
        return (
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="baboon-input-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        );
      case "email":
        return (
          <FontAwesomeIcon icon={faEnvelope} className="baboon-input-icon" />
        );
      case "time":
        return (
          <FontAwesomeIcon icon={faStopwatch} className="baboon-input-icon" />
        );
      case "tel":
        return <FontAwesomeIcon icon={faPhone} className="baboon-input-icon" />;
      case "url":
        return <FontAwesomeIcon icon={faGlobe} className="baboon-input-icon" />;
      default:
        return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (props.onChange) props.onChange(e);
    setValue(e.target.value);
    if (!props.regexValidation) return;
    const isValid = RegExp(VM.getRegex(props.regexValidation)!).test(
      e.target.value
    );
    if (isValid) {
      if (validate === "success") return;
      setValidate("success");
      if (props.noValidationAnimation) return;
      AM.animateElement(e.target, "shakeVert");
      //   handleAnimation("shake-vertically", props.id!);
    } else {
      setValidate("neutral");
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!props.regexValidation) return;

    if (value === "") {
      setValidate("neutral");
      return;
    }

    const isValid = RegExp(VM.getRegex(props.regexValidation)!).test(value);

    if (!isValid) {
      if (validate === "error") return;
      setValidate("error");
      if (props.noValidationAnimation) return;
      //   handleAnimation("shake-horizontally", props.id!);
      console.log("should owrk");
      AM.animateElement(e.target, "shakeHor");
    }
  };

  return (
    <div
      className={`baboon-input-wrapper has-icon has-focus ${
        !props.noHoverAnimation && "has-hover"
      } ${props.type === "password" && "has-password"} ${
        value !== "" && "has-value"
      } ${
        validate === "success"
          ? "has-success"
          : validate === "error"
          ? "has-error"
          : validate === "neutral"
          ? "has-neutral"
          : ""
      }
      ${props.disabled && "has-disabled"}
      `}
      id={props.id}
      data-tooltip={props.tooltip}
    >
      <input
        id={`input-${props.id}`}
        value={value}
        type={showPassword ? "text" : props.type}
        placeholder={props.placeholder}
        className="baboon-input"
        required={props.required}
        onBlur={(e) => handleOnBlur(e)}
        disabled={props.disabled}
        onChange={(e) => handleChange(e)}
      />
      {props.type !== "date" && props.type !== "datetime-local" && (
        <label className="baboon-input-label" id={`label-${props.id}`}>
          {props.label}
          {props.required && <span className="has-required">*</span>}
        </label>
      )}
      {validate === "success" ? (
        <FontAwesomeIcon className="baboon-input-icon" icon={faCheckCircle} />
      ) : validate === "error" ? (
        <FontAwesomeIcon className="baboon-input-icon" icon={faTimesCircle} />
      ) : (
        handleIcon()
      )}
    </div>
  );
}
