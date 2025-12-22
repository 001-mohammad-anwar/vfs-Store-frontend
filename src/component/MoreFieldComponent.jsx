import React from "react";
import { IoMdClose } from "react-icons/io";

const MoreFieldComponent = ({ close, value, onChange, submit }) => {

  return (
    <section className="fixed right-0 left-0 bottom-0 top-0 bg-neutral-900 bg-opacity-65 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-md w-full max-w-lg flex items-center justify-center p-4 flex-col rounded">
        <div className="flex items-center justify-between w-full mb-4">
          <h1 className="font-semibold">Add field</h1>
          <IoMdClose onClick={close} size={20} className="cursor-pointer" />
        </div>

        <input
          className="bg-blue-50 my-3 p-2 border focus-within:border-yellow-500 outline-none w-full rounded"
          placeholder="Enter field name"
          type="text"
          value={value}
          onChange={onChange}
        
        />
        <button
         onClick={submit}
         className="font-semibold bg-yellow-500 py-1 px-4 rounded border border-yellow-500  hover:bg-white" >
            Add field
        </button>


      </div>
    </section>
  );
};

export default MoreFieldComponent;
