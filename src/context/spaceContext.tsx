
import React, { useState, createContext } from "react";

interface SpaceContext {
    spaces : object[];
    index : number;
    setIndex : (_ : number) => void;
}

const initialSpaceContext : SpaceContext = {
    spaces : [],
    index : -1,
    setIndex : (_ : number) => {},

}

export const SpaceContext = createContext(initialSpaceContext)



export default function SpaceContextProvider({children}){

    // useEffect to get all possible spaces endpoint(s)
    const [index, setIndex] = useState(initialSpaceContext.index);
    const [spaces, setSpace] = useState(initialSpaceContext.spaces);

    const SpaceContextValue : SpaceContext = {
       spaces,
       index,
       setIndex
    };

    return (<SpaceContext.Provider 
                value={SpaceContextValue}>
                {children}
            </SpaceContext.Provider>)
}