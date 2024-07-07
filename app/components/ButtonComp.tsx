import React from "react";


interface ButtonCompProps {
    buttonName: string;
    icon_class:string;
    execute_function: () => void;

}

const ButtonComp: React.FC<ButtonCompProps> = ({
  buttonName,
  icon_class,
  execute_function,

  
}) => {
  return (
    <button onClick={execute_function} className="btn-gradient-primary filter-button" style={{marginTop:'2em', height:'40px', display:"flex", alignItems:"center", justifyContent:"center", gap:'.3em'}}>
        <i className={icon_class}></i> {buttonName}
    </button>
  );
};

export default ButtonComp;
