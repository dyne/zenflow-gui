import React, {ReactNode} from 'react';
import Sidebar from "./sidebar"
import Topbar from "./topbar";
import {useAuth} from "../lib/auth";
import SignIn from "../pages/sign_in";


type layoutProps = {
    children: ReactNode
}


const Layout:React.FunctionComponent<layoutProps> = (layoutProps:layoutProps) => {
  const { isSignedIn } = useAuth()
    return (
        <>
            {!isSignedIn()&&<SignIn/>}
            {isSignedIn()&&<>
                <div className="drawer drawer-mobile">
                    <input id = "my-drawer" type = "checkbox" className = "drawer-toggle" />
                    <div className="drawer-content">
                        {layoutProps?.children}
                    </div>
                    <div className="drawer-side bg-base-content">
                        <label htmlFor="my-drawer" className="drawer-overlay">sidebar</label>
                        <Sidebar/>
                    </div>
                </div>
            </>}
        </>

    )
}

export default Layout;