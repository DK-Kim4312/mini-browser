import React from 'react';
import { useDispatch } from 'react-redux';
import { CRAWLING } from '../../reducer/crawl';
import crawlAction from './crawlAction';

// write code that starts crawling by calling the API
// by clicking the button
// display by showing the number of links crawled
export default function OpenCrawlButton() {

    const dispatch = useDispatch();

    const startCrawling = () => {
        dispatch({ type: CRAWLING });
        crawlAction();
    }

    return (
        <button 
            onClick={startCrawling}
            >Start Crawling Data</button>
    )
}