import "./components.scss";
import React, { useState } from "react";

// NPM INSTALLS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
/*
  Information about the MeInputFile Component
  - Only allowable files are .txt and .json
*/

interface BaboonInputFileProps {
  id: string; // Is a must
  onSelectFile?: (data: string) => void;
  noValidationAnimation?: boolean;
  disabled?: boolean;
  label?: string;
  hideIcon?: boolean;
  required?: boolean;
  noHoverAnimation?: boolean;
  tooltip?: string;
}
export default function BaboonInputFile(props: BaboonInputFileProps) {
  // ----- MANAGERS -----

  // ----- STATE -----
  const [fileName, setFileName] = useState<string>();
  const [validate, setValidate] = useState<"success" | "neutral" | "error">(
    "neutral"
  );

  // ----- HANDLER FUNCTIONS -----
  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files![0].name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setValidate("success");
      if (props.onSelectFile) props.onSelectFile(result);
    };
    reader.readAsText(e.target.files![0]);
  };

  return (
    <div
      className={`baboon-input-wrapper ${
        !props.noHoverAnimation && "has-hover"
      }  ${
        validate === "success"
          ? "has-success"
          : validate === "error"
          ? "has-error"
          : validate === "neutral"
          ? "has-neutral"
          : ""
      }`}
      id={`baboon-input-wrapper-${props.id}`}
      data-tooltip={props.tooltip}
    >
      <input
        id={`baboon-input-${props.id}`}
        type="file"
        className="baboon-input-file"
        required={props.required}
        disabled={props.disabled}
        accept=".txt,.json"
        tabIndex={-1}
        onChange={(e) => handleSelectFile(e)}
      />
      <label
        id={`baboon-input-label-${props.id}`}
        className="baboon-input-file-label"
        htmlFor={`baboon-input-${props.id}`}
        tabIndex={0}
      >
        {fileName ? fileName : props.label}
        {props.required && <span className="has-required">*</span>}
      </label>
      {validate === "success" ? (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="baboon-input-file-icon"
        />
      ) : validate === "error" ? (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="baboon-input-file-icon"
        />
      ) : (
        <FontAwesomeIcon icon={faFile} className="baboon-input-file-icon" />
      )}
    </div>
  );
}
