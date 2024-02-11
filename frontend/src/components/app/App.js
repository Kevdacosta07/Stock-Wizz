import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../../pages/MAIN/home/home";
import Login from "../../pages/MAIN/login/login";
import Error from "../../pages/MAIN/Error/error";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useSelector} from "react-redux";
import Admin from "../../pages/ADMIN/index/admin";
import AdminHeader from "../adminHeader/AdminHeader";
import Products from "../../pages/ADMIN/products/products";
import Members from "../../pages/ADMIN/membres/members";
import Rapports from "../../pages/ADMIN/rapports/rapports";
import Addproduct from "../../pages/ADMIN/products/addproduct";
import SpecificProduct from "../../pages/ADMIN/products/specificProduct";
import confirmRemoveProduct from "../../pages/ADMIN/products/confirmRemoveProduct";
import AddOption from "../../pages/ADMIN/options/addOption";
import EditOption from "../../pages/ADMIN/options/editOption";
import ConfirmRemoveProduct from "../../pages/ADMIN/products/confirmRemoveProduct";
import AddMembers from "../../pages/ADMIN/membres/addMembers";
import Logout from "../../pages/ADMIN/membres/logout";
import EditMember from "../../pages/ADMIN/membres/editMember";
import EditProduct from "../../pages/ADMIN/products/editProduct";
import AddStock from "../../pages/ADMIN/options/addStock";
import RemoveStock from "../../pages/ADMIN/options/removeStock";

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
                {user && <Route path='/produits/confirmRemove/:id' element={<ConfirmRemoveProduct />}/>}
                {user && <Route path='/produits/edit/:id' element={<EditProduct />}/>}
                {user && <Route path='/membres' element={<Members />}/>}
                {user && <Route path='/membres/add' element={<AddMembers />}/>}
                {user && <Route path='/membres/edit/:id' element={<EditMember />}/>}
                {user && <Route path='/logout' element={<Logout />}/>}
                {user && <Route path='/options/add/:id' element={<AddOption />}/>}
                {user && <Route path='/options/edit/:id' element={<EditOption />}/>}
                {user && <Route path='/options/stockadd/:id' element={<AddStock />}/>}
                {user && <Route path='/options/stockremove/:id' element={<RemoveStock />}/>}
                {user && <Route path='/rapports' element={<Rapports />}/>}
            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
