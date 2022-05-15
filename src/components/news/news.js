import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';

function News() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isFiltered, setFilter] = useState(null);
    const [textFilter, setTextFilter] = useState("");
    const [sort, setSort] = useState("");
    const [pageCount, setPageCount] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageArray, setPageArray] = useState([]);


    function countPages(count){
        setPageCount(Math.ceil(count/5));
        getPageArray(Math.ceil(count/5));
    }

    function getPageArray(num){

        if(num < 6){
            let temp=[];
            for (let i=0;i<=num-3;i++){
                temp[i]=i+2;
            }
            setPageArray(temp);
        }
        else if(pageNumber + 2 >=num){
            setPageArray([num-5,num-4,num-3,num-2,num-1]);
        }
        else if(pageNumber -2 <=1){
            setPageArray([2,3,4,5,6]);
        }
        else{
            setPageArray([pageNumber-2,pageNumber-1,pageNumber,pageNumber+1,pageNumber+2]);
        }
    }

    useEffect(() =>{
        fetchForPages();
        isFiltered ? fetchWithFilter() : fetchIt();
    }, [textFilter,sort,pageNumber])

    function fetchIt(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=5&_start="+(((pageNumber-1)*5)))
                .then(res => res.json())
                .then(
                    (result) => {
                        setItems(result);
                    },
                    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                    // чтобы не перехватывать исключения из ошибок в самих компонентах.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    function fetchForPages(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=100&"+textFilter)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        countPages(result.length)
                    },
                    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                    // чтобы не перехватывать исключения из ошибок в самих компонентах.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    function fetchWithFilter(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=5&_start="+(((pageNumber-1)*5))+"&"+textFilter+"&"+sort)

                .then(res => res.json())
                .then(
                    (result) => {
                        setItems(result);
                    },
                    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                    // чтобы не перехватывать исключения из ошибок в самих компонентах.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }
    function handleOnClickText(value){
        setFilter(true);
        setTextFilter(value);
    }

    function handleOnClickSort(value){
        setFilter(true);
        setSort(value);
    }

    function handlePageClick(value){
        setPageNumber(value);
        getPageArray(pageCount);
    }


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <div className="sortAndPageBars">
                    <p className="search"> Поиск по заголовку: <FontAwesomeIcon icon={faSearch}/> <input className="searchInput" type="text" onChange={(e)=>handleOnClickText("title_contains="+e.target.value)}/></p>
                    <p className="search"> Поиск по содержанию: <FontAwesomeIcon icon={faSearch}/> <input className="searchInput" type="text" onChange={(e)=>handleOnClickText("summary_contains="+e.target.value)}/></p>
                    <button className="sortBtn" onClick={()=>handleOnClickSort("_sort=publishedAt:desc")}><FontAwesomeIcon icon={faCircleUp}/>  Сначала новые</button>
                    <button className="sortBtn" onClick={()=>handleOnClickSort("_sort=publishedAt:asc")}><FontAwesomeIcon icon={faCircleDown}/>   Сначала старые</button>
                </div>
                <div className="sortAndPageBars">
                    <button className="pageBarBtn" onClick={()=>handlePageClick(1)}>1</button>
                    {pageArray.map(page => (
                        <button className="pageBarBtn" onClick={()=>handlePageClick(page)}>{page.toString()}</button>
                    ))}
                    {
                        pageCount!==1 ?
                            <button className="pageBarBtn" onClick={()=>handlePageClick(pageCount)}>{pageCount}</button>
                            : ""
                    }
                </div>
                <hr/>
                <ul className="newsList">
                    {items.map(item => (
                        <li key={item.id}>
                            <p className="newsTitle" id="newsTitle"><NavLink className="newsTitleLink" id="headerNews" to={"/news/"+item.id}>{item.title}</NavLink></p>
                            <p><img className="postImage" src={item.imageUrl}/></p>
                            <p>Дата публикации: {item.publishedAt}</p>
                            <hr/>
                        </li>
                    ))}
                </ul>
                <hr className="hrSplit"/>
                <div className="pageBar">
                    <button className="pageBarBtnFs" onClick={()=>handlePageClick(1)}>1</button>
                    {pageArray.map(page => (
                        <button className="pageBarBtn" onClick={()=>handlePageClick(page)}>{page.toString()}</button>
                    ))}
                    {
                        pageCount!==1 ?
                            <button className="pageBarBtnFs" onClick={()=>handlePageClick(pageCount)}>{pageCount}</button>
                            : ""
                    }
                </div>
            </div>
        );
    }
}

export default News;