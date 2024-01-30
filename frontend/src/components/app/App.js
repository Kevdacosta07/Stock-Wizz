import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../../pages/MAIN/home/home";
import Login from "../../pages/MAIN/login/login";
import Error from "../../pages/MAIN/Error/error";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ArticlesAdmin from "../../pages/articlesAdmin/ArticlesAdmin";
import {useSelector} from "react-redux";
import Admin from "../../pages/ADMIN/index/admin";
import AdminHeader from "../adminHeader/AdminHeader";
import Products from "../../pages/ADMIN/products/products";
import Members from "../../pages/ADMIN/membres/members";
import Rapports from "../../pages/ADMIN/rapports/rapports";
import Addproduct from "../../pages/ADMIN/products/addproduct";
import SpecificProduct from "../../pages/ADMIN/products/specificProduct";
import AddOption from "../../pages/ADMIN/options/addOption";

function App() {

    const {user} = useSelector((state) => state.auth)

  return (
    <>
      <Router>
        <div className='container'>
            {user && <AdminHeader/>}
            <Routes>
                <Route path='/*' element={<Error />}/>

                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />}/>
                {user && <Route path='/admin' element={<Admin />}/>}
                {user && <Route path='/produits' element={<Products />}/>}
                {user && <Route path='/produit/:id' element={<SpecificProduct />}/>}
                {user && <Route path='/produits/add' element={<Addproduct />}/>}
                {user && <Route path='/membres' element={<Members />}/>}
                {user && <Route path='/rapports' element={<Rapports />}/>}
                {user && <Route path='/options/add/:id' element={<AddOption />}/>}
                {user && <Route path='/adminArticles' element={<ArticlesAdmin />}/>}
            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
