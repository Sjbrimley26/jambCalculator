import React, { Component } from "react";
import { view } from "react-easy-state";
import _ from "lodash";

const Inputs = ({
  option,
  handleInputChange,
  selected_value
}) => {

  let state = option === "hinge_locations" ?
    {
      "Hinge 1": _.get(selected_value, "Hinge 1") || '',
      "Hinge 2": _.get(selected_value, "Hinge 2") || '',
      "Hinge 3": _.get(selected_value, "Hinge 3") || '',
      "Hinge 4": _.get(selected_value, "Hinge 4") || '',
    } :
    {
      "Bore 1": _.get(selected_value, "Bore 1") || '',
      "Bore 2": _.get(selected_value, "Bore 2") || ''
    };

  let inputs;

  const handleTextInputChange = e => {
    state[e.target.id] = e.target.value;
    handleInputChange(state);
  }

  const createTextInput = ( id, i ) => {
    return (
      <div key={i} >
        {`${id}: `}
        <input 
          key={i}
          type="number"
          name="build"
          id={id}
          value={ _.get(state, id) }
          onChange={handleTextInputChange}
        ></input>
      </div>
    );
  };

  const createArrayOfTextInputs = arr => {
    return arr.map((item, i) => createTextInput(item, i));
  };

  switch(option){
    case "hinge_locations":
      inputs = createArrayOfTextInputs([
        "Hinge 1",
        "Hinge 2",
        "Hinge 3",
        "Hinge 4"
      ]);
      break;
    
    case "bore_locations":
      inputs = createArrayOfTextInputs([
        "Bore 1",
        "Bore 2"
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

}

class TextInputSelect extends Component {
  constructor(props){
    super(props);
  }

  render(){
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

export default view(TextInputSelect)