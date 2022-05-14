import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faScroll } from "@fortawesome/free-solid-svg-icons";
import {faNewspaper} from "@fortawesome/free-solid-svg-icons";

function New() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState(null);
    const { id } = useParams();
    const [outputItems, setOutputItems] = useState([]);
    let query ="";
    let sameIt=[];

    useEffect(() => {
        fetch("https://api.spaceflightnewsapi.net/v3/articles/"+id)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    sameIt = result.title.split(" ");
                    fetchSame();
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    })

    function fetchSame(){
        sameIt.forEach(element =>
            element.length>3 && element.toLowerCase()!=="space" ?
                query = query+"&title_contains="+element : ""
        );
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?"+query)
                .then(ress => ress.json())
                .then(
                    (results) => {
                        setIsLoaded(true);
                        setOutputItems(results);
                    },
                    
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
        }
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <ul className="newsList">
                    <li key={item.id}>
                        <p id="newsTitle">{item.title}</p>
                        <p className="postUrl">Ссылка на источник: <a href={item.url}>{item.url}</a></p>
                        <p><img className="postInImage" src={item.imageUrl}/></p>
                        <p id="postSummary">{item.summary}</p>
                    </li>
                </ul>
                <hr/>
                <p/>
                <label id="sameNewsLbl"><FontAwesomeIcon icon={faNewspaper}/> Похожие статьи:</label>
                <p/>
                <hr/>
                <div>
                    <ul className="newsList">
                        {outputItems.map(itemS => (item.id!==itemS.id ?
                            <li key={itemS.id}>
                                <p id="newsTitle"><Link id="headerNews" to={"/news/"+itemS.id}>{itemS.title}</Link></p>
                                <p><img className="postImage" src={itemS.imageUrl}/></p>
                                <p>Дата публикации: {item.publishedAt}</p>
                            </li>
                            :""))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default New;