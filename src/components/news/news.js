import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';

function News() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isFiltered, setFilter] = useState(null);
    const [textFilter, setTextFilter] = useState("");
    const [sort, setSort] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageArray, setPageArray] = useState([]);


    useEffect(() =>{
        isFiltered ? fetchWithFilter() : fetchForPages();
    }, [textFilter,sort,pageNumber])

    function fetchIt(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=200&_start="+(((pageNumber-1)*200)))
                .then(res => res.json())
                .then(
                    (result) => {
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    function fetchForPages(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=200&_start=0&title_contains="+textFilter)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    function fetchWithFilter(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=200&_start="+(((pageNumber-1)*200))+"&"+textFilter+"&"+sort)
                .then(res => res.json())
                .then(
                    (result) => {
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }
    function handleOnClickSearch(value){
        setFilter(true);
        setTextFilter(value);
    }

    function handleOnClickSort(value){
        setFilter(true);
        setSort(value);
    }

    function parseISOString(s) {
        var dateStr = s.slice(0, -5);
        return new Date(dateStr).toUTCString();
    }


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <div className="newsDiv">
                    <p><input placeholder="Поиск по заголовку" className="searchInput" id="searchInputTitle" type="text"/> <button className="searchBtn" onClick={()=>handleOnClickSearch("title_contains="+document.getElementById('searchInputTitle').value)}><FontAwesomeIcon icon={faSearch}/></button></p>
                    <p><input placeholder="Поиск по содержанию" className="searchInput" id="searchInputSummary" type="text"/> <button className="searchBtn" onClick={()=>handleOnClickSearch("summary_contains="+document.getElementById('searchInputSummary').value)}><FontAwesomeIcon icon={faSearch}/></button></p>
                    <button className="sortBtn" onClick={()=>handleOnClickSort("_sort=publishedAt:desc")}>Сначала новые</button>
                    <button className="sortBtn" onClick={()=>handleOnClickSort("_sort=publishedAt:asc")}>Сначала старые</button>
                </div>
                <hr/>
                <ul className="newsList">
                    {
                        items.length!==0 ?
                            items.map(item => (
                                <li key={item.id}>
                                    <p className="newsTitle" id="newsTitle"><NavLink className="newTitleLink" id="headerNews" to={"/news/"+item.id}>{item.title}</NavLink></p>
                                    <p><img className="postImage" src={item.imageUrl}/></p>
                                    <p>Дата публикации: {parseISOString(item.publishedAt)}</p>
                                    <hr/>
                                </li>
                            ))
                            :
                            <div className="aboutDiv">
                                <h1>Страница не найдена</h1>
                            </div>
                    }
                </ul>
                <hr className="hrSplit"/>
            </div>
        );
    }
}

export default News;