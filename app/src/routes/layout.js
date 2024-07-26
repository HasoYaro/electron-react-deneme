import Header from '../modules/header/header'
import { Outlet } from 'react-router-dom';



export default function Layout(){
    
    return(<>
        <div style={{width: "100vw", height: "100vh"}}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    </>)
}