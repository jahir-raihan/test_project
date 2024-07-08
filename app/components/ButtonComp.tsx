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
    <button 
      onClick={execute_function} 
      className=" border h-[55px] rounded-xl  w-[200px] border-gray-300 dark:border-neutral-800 bg-slate-800"
      style={{marginTop:'2em', display:"flex", alignItems:"center", justifyContent:"center", gap:'.3em'}}
      >
        <i className={icon_class}></i> {buttonName}
    </button>
  );
};

export default ButtonComp;
