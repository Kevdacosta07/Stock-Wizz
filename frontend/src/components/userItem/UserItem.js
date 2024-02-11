import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FaPen, FaTrash} from "react-icons/fa";
import {deleteUser} from "../../features/auth/authSlice";

const UserItem = ( { user, myuseradmin } ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getRandomColor = () => {
        return `rgb(50, 27, 123)`;
    };

    const imagepath = "/uploads/"

    const [currentColor, setCurrentColor] = useState(getRandomColor());

    return (
        <div className='card'>
            {!user.profileImage ? (<div className="image" style={{backgroundColor: currentColor}}><p>{user.first_name[0]+user.last_name[0]}</p></div>) :
                (<div className="image" style={{backgroundColor: "white"}}>
                    <img src={imagepath + user.profileImage} alt=""/>
                </div>)}
            <div className="name">
                <p className="name">{user.first_name + " " + user.last_name}</p>
            </div>
            <div className="poste">
                <p className="poste">{user.poste}</p>
            </div>

            {user.is_admin && <div className="admin"><p>Admin</p></div>}

            <div className="settings">
                {myuseradmin === true && <FaTrash onClick={() => dispatch(deleteUser(user._id))} className="trash icon"/>}
                {myuseradmin === true && <FaPen onClick={() => navigate("/membres/edit/"+user._id)} className="gear icon"/>}
            </div>
        </div>
    );
};

export default UserItem;