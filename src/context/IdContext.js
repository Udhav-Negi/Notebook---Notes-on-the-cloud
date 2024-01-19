import React from 'react'
import { createContext, useState } from "react";
const Context = createContext();

const IdContext = ({children}) => {
  const [login, setLogin] = useState(false)
  return (
    <Context.Provider value={{login, setLogin}}>
        {children}
    </Context.Provider>
    
  )
}

export default IdContext
export {Context}