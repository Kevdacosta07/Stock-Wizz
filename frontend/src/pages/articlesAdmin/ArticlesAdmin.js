import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getUserArticles} from "../../features/articles/articlesSlice";
import ArticleItem from "../../components/articleItem/ArticleItem";

const ArticlesAdmin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { userArticles, isError, isSuccess, isLoading, message } = useSelector((state) => state.articles)

    useEffect(() => {
        if (!user)
        {
            navigate('/')
        }

        if (isError)
        {
            toast.error(message)
        }

        else {
            dispatch(getUserArticles())
        }
    }, []);

    return (
        <>
            <section className='heading'>
                <h1>Mes articles</h1>
                <p>Administration des articles</p>
            </section>

            <section className='content'>
                {userArticles.length > 0 ? (
                    <div className='goals'>
                        {userArticles.map((article) => (
                            <ArticleItem article={article} key={article._id} user={user}/>
                        ))}
                    </div>
                ) : (<h3>Aucun article disponible</h3>)}
            </section>
        </>


    );
};

export default ArticlesAdmin;