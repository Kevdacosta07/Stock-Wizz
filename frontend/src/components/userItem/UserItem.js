import React from 'react';
import {useDispatch} from "react-redux";
import {deleteArticle} from "../../features/articles/articlesSlice";

const UserItem = ({article, user = null} ) => {

    const dispatch = useDispatch()

    return (
        <div className='card'>

        </div>
    );
};

export default UserItem;