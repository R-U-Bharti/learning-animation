import React from 'react'
import MaxWidth from './MaxWidth'

const WidthCheck = () => {
    return (
        <>
            {/* <div className="bg-gradient-to-r from-blue-800 to-black h-screen flex justify-center w-screen">
                <div className="max-w-[1366px] w-full">

                    <div className="border border-white w-full">
                        My Content
                    </div>
                </div>
            </div> */}

            <MaxWidth 
            // style={{
            //     background: 'linear-gradient(to right, #000000, #000000, #000000, #000)',
            // }}
            className={"bg-gradient-to-r from-blue-900 to-black"}
            >

                <div className="border text-white h-screen">
                    My content
                </div>

            </MaxWidth>
        </>
    )
}

export default WidthCheck