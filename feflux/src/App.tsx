import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import { MyGlobalContext } from "./context";
import { useCallback, useEffect, useState } from "react";
import { PrivateRoutes, PublicRoutes } from "./route";
import { lib } from "./lib";
import axios from "axios";

function App() {

  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const urls = lib.url

  const checksToken = useCallback( async() => {
    try {
      const response = await axios.get(`${urls}/user/profile`, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log(response)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        localStorage. removeItem('token')
      } else {
        console.log('Unexpected error', error);
      }
    }
  },[token, urls])
  


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('token')!);
    if(items) {
      checksToken()
      setStatus(true) 
      setToken(items)
    }
  }, [checksToken])

  return (
    <>
      <MyGlobalContext.Provider value= {{ token, loading, setLoading, setToken }}>
        <Routes>
        {
          status
               ? <Route path="/*" element={<PrivateRoutes />} />
               : <Route path="/*" element={<PublicRoutes />} />
        }

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </MyGlobalContext.Provider>
    </>
  )
}

export default App
