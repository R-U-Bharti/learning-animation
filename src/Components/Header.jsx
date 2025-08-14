import React, { useEffect } from 'react'

const Header = () => {

    useEffect(() => {
     document.getElementsByClassName(".mycontainer")
    }, [])
    

  return (
    <>
        <div className="h-screen w-screen grid grid-cols-4 mycontainer">
            <div className=""></div>
        </div>
    </>
  )
}

export default Header