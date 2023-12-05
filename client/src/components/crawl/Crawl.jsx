import React from 'react';
import { useSelector } from 'react-redux';
import { CrawlWrapper } from './Crawl.style';
import { useDispatch } from 'react-redux';
import { RESTING } from '../../reducer/crawl';
import  Spinner  from './Spinner.style';



export default function Crawl() {
    const isCrawling = useSelector((state) => state.crawl.isCrawling);
    const dispatch = useDispatch();


    if (!isCrawling) { return null };


    //checks statechange
    //if state change, stop crawling
    // stop crawl function
    const stopCrawl = () => {
        dispatch({ type: RESTING });
    }

    return (
        <CrawlWrapper>
            <div className="container" >
                <div className="header" >
                    <h1>Crawling</h1>
                    <button className="Stop Crawling"
                        onClick={stopCrawl} >Stop</button>
                </div>
                <div className="content" >
                    <Spinner />
                </div>
            </div>

        </CrawlWrapper>
    );

}

