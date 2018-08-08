import React, { Component } from "react";
import { view } from "react-easy-state";
// import { titleCase } from "../../misc/utils";

const Inputs = ({
  option, 
  handleInputChange,
  selected_value
}) => {

  let inputs;

  const createRadioInput = id => {
    return (
      <div key={Math.random()}>
        <input 
          type="radio"
          name="build"
          value={id}
          id={id}
          onChange={handleInputChange}
          checked={selected_value === id}
        ></input>
        <label htmlFor={id}>
          { id }
        </label>
      </div>
    );
  };

  const createArrayOfRadioInputs = arr => {
    return arr.map(item => createRadioInput(item));
  }

  switch(option) {
    case "build":
      inputs = createArrayOfRadioInputs([
        "Pre-Hung Single",
        "Pre-Hung Double",
        "Bore and Dap"
      ]);
      break;
    
    case "location":
      inputs = createArrayOfRadioInputs([
        "Interior",
        "Exterior"
      ]);
      break;
    
    case "material":
      inputs = createArrayOfRadioInputs([
        "FJ Pine",
        "Solid Pine",
        "Knotty Alder",
        "Superior Alder",
        "Composite"
      ]);
      break;
    
    case "jamb_width":
      // Need to add textarea for custom sizes
      inputs = createArrayOfRadioInputs([
        "4-5/8\"",
        "5-3/8\"",
        "6-5/8\"",
        "7-1/2\""
      ]);
      break;
    
    case "height":
      // Need to add textarea for custom sizes
      inputs = createArrayOfRadioInputs([
        "6\'8\"",
        "7\'0\"",
        "8\'0\""
      ]);
      break;
    
    case "swing":
      inputs = createArrayOfRadioInputs([
        "Into Building",
        "Out of Building"
      ]);
      break;
    
    case "sidelites":
      inputs = createArrayOfRadioInputs([
        "0",
        "1",
        "2"
      ]);
      break;
  }

  return (
    <form>
      <fieldset>
        { inputs }
      </fieldset>
    </form>
  );
};

class InputSelect extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="inputSelect" >
        < Inputs
          option={this.props.option}
          handleInputChange={this.props.handleInputChange}
          selected_value={this.props.selected_value}
        />
      </div>
    );
  }
}

export default view(InputSelect);