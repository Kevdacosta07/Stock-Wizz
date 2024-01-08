import React from 'react';
import {useDispatch} from "react-redux";
import {deleteArticle} from "../../features/articles/articlesSlice";

const ArticleItem = ( {article, user = null} ) => {

    const dispatch = useDispatch()

    return (
        <div className='goal'>
            {new Date(article.createdAt).toLocaleDateString('ch-CH')}
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            {user &&
                <div>
                    <button className='btn btn-update' onClick={'update'}>
                        Modifier
                    </button>

                    <button className='btn btn-delete' onClick={() => dispatch(deleteArticle(article._id))}>
                        Supprimer
                    </button>
                </div>
            }
        </div>
    );
};

export default ArticleItem;