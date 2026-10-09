


import Header from './Header';
import Footer_3 from './Footer_3';
import { Outlet } from "react-router-dom";

// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children".
const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet/>
            </main>
                  
           <Footer_3/>
        </div>);
};

export default Layout;

 