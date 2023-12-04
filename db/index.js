const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');


//wikipedia url
const initUrl = 'https://en.wikipedia.org';

// What we need to do for scraping
// 1. Visit the website
// 2. Get the HTML from the website (cheerio)
// 3. Find the element we want to scrape -> stort in DB ( we will use fs )
// 4. Find the next page url -> rank pages by reference
// 5. Go to the next page and repeat

let dbList = {
    ["https://en.wikipedia.org/wiki/Computer_science"] : {
        title : 'Computer Science',
        score : 1,
    }
};

let disallowedList = {
    ["/wiki/MediaWiki:Spam-blacklist"] : {
        'linkSegment' : '/wiki/MediaWiki:Spam-blacklist',
    }
};

let queue = [];
let progressIndex = 0;

/**
 * crawl function
 * @param {*} url 
 * @returns 
 */
const crawl = async (url) => {
    console.log(`Visiting ${url}`);
    console.log('Number of URL in queue: ', queue.length - progressIndex);

    try {
        var htmlDoc = await axios.get(url);
    } catch (e) {
        await startNextQueue();
        return;
    }


    if(!htmlDoc.data) {
        await startNextQueue();
        return;
    }

    const $ = cheerio.load(htmlDoc.data); // conventional $ notation
    const links = $('a'); // get all links from the page
    const title = $("h1").text();

    if(dbList[url]) {
        dbList[url].score += 1;
    } else {
        dbList[url] = {
            title,
            score : 1,
        }
    }

    // check if the url is allowed to be crawled
    const isAllowed = await checkRobotTXT(url);
    if (!isAllowed) {
        await startNextQueue();
        return;
    }

    links.each((index, link) => {
        const href = $(link).attr('href');

        if (!href) return;

        // if href starts with http or https
        if (href.startsWith('http://') || href.startsWith('https://')) {
            checkVisitedBeforePush(href);
            return;
        }

        // if not, it is a relative link
        const originUrl = new URL(url).origin;
        const newUrl = originUrl + href;
        checkVisitedBeforePush(newUrl);
    });

    if (queue[progressIndex]) {
        await startNextQueue();
    } else {
        console.log('Finished crawling');
        console.log(dbList);
    }
};

/**
 * Check if the url has been visited before
 * If not, push it to the queue
 * @param {string} href 
 */
const checkVisitedBeforePush = (href) => {
    if (!dbList[href]) {
        queue.push(href);
    }
}

/**
 * Start crawling the next url in the queue
 */
const startNextQueue = async () => {
    await timeout();
    crawl(queue[progressIndex]);
    progressIndex += 1;
    if (progressIndex % 10 === 0) {
        storeDb();
    }
}

/**
 * Timeout function
 */
const timeout = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 500);
    })
}

/**
 * Store dbList in a file
 */
const storeDb = () => {
    // store dbList in a file
    const json = JSON.stringify(dbList);
    fs.writeFileSync('./db.json', json);
}

/**
 * Check if the url is allowed to be crawled based on disallowedList
 * @param {string} currentUrl
 * @returns {boolean}
 */
const checkRobotTXT = async (currentUrl) => {
    let isAllowed = true;
    for (const key in disallowedList) {
        if (currentUrl.includes(key)) {
            isAllowed = false;
            break;
        }
    }
    return isAllowed;
}

/**
 * Store disallowedList in a file
 * @param {string} mainUrl
 */
const storeRobotsTxt = async (mainUrl) => {
    const robotUrl = mainUrl + '/robots.txt';
    const robotTxt = await fetch(robotUrl);
    const robotTxtText = await robotTxt.text();
    const robotTxtLines = robotTxtText.split('\n');
    robotTxtLines.forEach(line => {
        if (line.includes('Disallow:')) {
            const disallowedUrl = line.split(' ')[1];


            if (!disallowedUrl) {
                console.log('Error Disallowed url text');
            } else {
                if (!disallowedUrl.includes('/wiki/')) {
                    //continue to next iteration
                    return;
                 }
                console.log('Disallowed url text', disallowedUrl);
                // store disallowedList in a file
                disallowedList[disallowedUrl] = {
                    linkSegment : disallowedUrl,
                }
                const json = JSON.stringify(disallowedList);
                fs.writeFileSync('./disallowed.json', json);
            }
        }
    });
}


storeRobotsTxt(initUrl);
crawl(initUrl);
