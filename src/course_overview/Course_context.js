import exp from "constants";
import { useContext, createContext, useState } from "react";

const Coursecontext = courseCreate();

export const useContext = () => {
   
    return useContext(courseContext);

};