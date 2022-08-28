import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setpage } from "../../Redux/Actions";
import csspage from './Pagination.module.css'

export default function Pagination ({juegos, games_per_page}) {
    const pages = [];
    const dispatch = useDispatch();
    const currentpage = useSelector(state => state.pagina)
    for (var i= 1 ; i<=Math.ceil(juegos/games_per_page) ; i++) {
        pages.push(i)
    }
    return (
        <div>
            {
                pages.map((page,index) => {
                    return <button 
                    onClick={() => dispatch(setpage(page))} 
                    key={index}
                    className={page === currentpage ? csspage.active : csspage.desactive }
                    >
                    {page}
                    </button>
                })
            }
        </div>
    )
}