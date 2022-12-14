import React, { useEffect, useState }  from 'react';
import {Button, Divider, Input} from "antd";
import axios from "axios";
import API_URL from "../conf/api-url";
import "./index.css"
import SearchTable from "../utils/searchTable"
import SentFrom from '../utils/sentForm';

export function ForeignBookPage(){
    const [genres, setGenres] = useState(null);
    const [btnActive, setBtnActive] = useState(null);
    const [readBook, setReadBook] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        axios
        .get(`${API_URL}/foreign`)
        .then((result)=>{
            setGenres(result.data);
            const temp = result.data["reprGenres"];
            var activeArray = []
            for(let i=0; i<temp.length; i++){
                activeArray.push(false)
            }
            setBtnActive(activeArray);
        })
        .catch((error)=>{
            console.error(error);
        });
    }, [])

    function genreToggle(idx){
        let newArr = Array.from(btnActive);
        if(btnActive[idx] === true){
            console.log("hello",idx);
            newArr[idx] = false;
            setBtnActive(newArr);
        }
        else{
            console.log("world",idx);
            newArr[idx] = true;
            setBtnActive(newArr);
        }
    };

    const onSearch = (inputData)=>{
        console.log("sent:",inputData);
        axios
        .get(`${API_URL}/foreign/search=${inputData}`)
        .then((result)=>{
            setSearchResult(result.data);
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
        },
    ];

    // console.log(searchResult);

    if (genres === null){
        return( 
            <div id="loading">
                <Button
                    type="link"
                    loading="true"
                    size="large"
                    style={{fontSize:"250%"}}
                >
                    Loading
                </Button>
            </div>
        )
    }

    if(searchResult == null){
        return(
            <div>
                <h2>???????????? ??????</h2>
                <div className="searchArea">
                    <h3>???????????? ????????? ?????? ????????? ???????????? ?????? ??? ????????? ?????????.</h3>
                    <Input.Search
                        size="large"
                        placeholder='??? ????????? ??????????????????!'
                        allowClear
                        enterButton
                        onSearch={onSearch}
                    />
                    <div>
                        <h3>??????????????? ????????????.</h3>
                    </div>
                </div>
    
                <Divider/>
                <SentFrom
                    columns={columns}
                    genres={genres}
                    readBook={readBook}
                    btnActive={btnActive}
                    setReadBook={setReadBook}
                    genreToggle={genreToggle}
                />
            </div>
        )
    }

    if(searchResult.length != 0){
        return(
            <div>
                <h2>???????????? ??????</h2>
                <div className="searchArea">
                    <h3>???????????? ????????? ?????? ????????? ???????????? ?????? ??? ????????? ?????????.</h3>
                    <Input.Search
                        size="large"
                        placeholder='??? ????????? ??????????????????!'
                        allowClear
                        enterButton
                        onSearch={onSearch}
                    />
                    <div>
                        <SearchTable 
                            columns={columns} 
                            data={searchResult} 
                            readBook={readBook}
                            setReadBook={setReadBook}
                        />
                    </div>
                </div>

                <Divider/>
                <SentFrom
                    columns={columns}
                    genres={genres}
                    readBook={readBook}
                    btnActive={btnActive}
                    setReadBook={setReadBook}
                    genreToggle={genreToggle}
                />
            </div>
        )
    }

    else{
        console.log("check01");
        return(
            <div>
                <h2>???????????? ??????</h2>
                <div className="searchArea">
                    <h3>???????????? ????????? ?????? ????????? ???????????? ?????? ??? ????????? ?????????.</h3>
                    <Input.Search
                        className="searchFrom"
                        size="large"
                        placeholder='??? ????????? ??????????????????!'
                        allowClear
                        enterButton
                        onSearch={onSearch}
                    />
                </div>

                <Divider/>
                <SentFrom
                    columns={columns}
                    genres={genres}
                    readBook={readBook}
                    btnActive={btnActive}
                    setReadBook={setReadBook}
                    genreToggle={genreToggle}
                />
            </div>
        )
    }
}