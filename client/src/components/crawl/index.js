const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');


dbName = "title-link-score";
collectionName = "wikipedia";

function hashCode(s) {
    for (var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

//wikipedia url
const initUrl = 'https://en.wikipedia.org';

// What we need to do for scraping
// 1. Visit the website
// 2. Get the HTML from the website (cheerio)
// 3. Find the element we want to scrape -> stort in DB ( we will use fs )
// 4. Find the next page url -> rank pages by reference
// 5. Go to the next page and repeat

let disallowedList = {
    ["/wiki/MediaWiki:Spam-blacklist"]: {
        'linkSegment': '/wiki/MediaWiki:Spam-blacklist',
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


    if (!htmlDoc.data) {
        await startNextQueue();
        return;
    }

    const $ = cheerio.load(htmlDoc.data); // conventional $ notation
    const links = $('a'); // get all links from the page
    const title = $("h1").text(); // get title of the page

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
            //create new data
            newData = {
                id: hashCode(url),
                title: title,
                link: url,
                score: 1,
            }
            checkVisitedBeforePush(newData);
            return;
        }

        // if not, it is a relative link
        const originUrl = new URL(url).origin;
        const newUrl = originUrl + href;
        //create new data
        newData = {
            id: hashCode(newUrl),
            title: title,
            link: newUrl,
            score: 1,
        }
        checkVisitedBeforePush(newData);
    });

    if (queue[progressIndex]) {
        await startNextQueue();
    } else {
        console.log('Finished crawling');
    }
};

/**
 * Check if the url is visited before check in mongodb
 * @param {object} data
 * @returns {boolean}
 */
async function checkVisitedBeforePush(data){
    await fetch(`http://localhost:3000/record/${data.id}`, {
        method: "GET",
    }, function (err, res) {
        if (err) throw err;
        if (res) {
            if(res == null){
                queue.push(data);
            } else {
                // update score
                res.score += 1;
                updateScore(res);
            }
        }
    }
    );


}

/**
 * Start crawling the next url in the queue
 */
const startNextQueue = async () => {
    await timeout();
    crawl(queue[progressIndex]);
    storeDb(queue[progressIndex]);
    progressIndex += 1;

}

/**
 * Timeout function
 */
const timeout = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 300);
    })
}

/**
 * Store new data in mongodb
 */
async function storeDb(data) {
    await fetch(`http://localhost:3000/record/add`, {
        method: "POST",
        body: JSON.stringify(data),
    }, function (err, res) {
        if (err) throw err;
        response.json(res);
    }
    );
}

/**
 * Update score in mongodb
 * @param {object} data
 * @returns {boolean}
 */
async function updateScore(data) {
    await fetch(`http://localhost:3000/update/${data.id}`, {
        method: "POST",
        body: JSON.stringify(data),
    }, function (err, res) { 
        if (err) throw err;
        response.json(res);
    }
    );
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
                    linkSegment: disallowedUrl,
                }
                const json = JSON.stringify(disallowedList);
                fs.writeFileSync('./disallowed.json', json);
            }
        }
    });
}


storeRobotsTxt(initUrl);
crawl(initUrl);
