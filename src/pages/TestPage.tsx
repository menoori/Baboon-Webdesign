import React from "react";
import "../components/components.scss";
import BaboonButton from "../components/BaboonButton";
import BaboonInput from "../components/BaboonInput";
import BaboonInputFile from "../components/BaboonInputFile";

export default function TestPage() {
  /*
  MEINPUT
 Password needs to be able to clear when pressing at the red x
 Make a clear button?
 Options to only allow certain type of inputs
 when chosing type, e.g. number only allow number inputs
 Textbox needs to be able to increase in size and whitespace
*/
  /*
  MEBUTTON
 Outline buttonStyle ruins theme
 Flat buttonStyle ruins theme
 */

  /*
  MEINPUTFILE

  Icon is off center when no label text
  When file received perform validation
 */
  return (
    <>
      <div className="test" data-tooltip="hej">
        KOKOKKO
      </div>
      <BaboonInput
        label="I'm an Input"
        regexValidation={"url"}
        id="123"
        placeholder="testinnng"
        hideIcon
        type="url"
        required
        tooltip="hej"
      />
      <BaboonButton type="submit" size="medium" transitionY tooltip="hej">
        I'm a button
      </BaboonButton>
      <BaboonInputFile
        required
        label="I'm an Input File"
        id="1232"
        tooltip="Input file"
      />
    </>
  );
}
