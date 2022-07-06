import React from "react";

const AddOnPerNightButton = (props) => {
    return (<input
        type="button"
        id={"Add_Addon_" + props.Id}
        value="Remove"
        className="border btn btn-danger btn-lg addOn-btn"
        onClick={() =>
          props.selectAddon(
            `${props.Id}`,
            `${props.Name}`,
            `${props.tax}`,
            `${props.Price}`
          )
        }
      />)
}

export default React.memo(AddOnPerNightButton);