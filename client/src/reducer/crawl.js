export const CRAWLING = 'CRAWLING';
export const RESTING = 'RESTING';
export const CRASHED = 'CRASHED';

const initialState = {
    isCrawling: false,
    isError: false,
    numberOfDataCrawled: 0,
};

/**
 * Crawl reducer
 * @param {*} state : current state
 * @param {*} action : action to be executed
 * @returns
 */
const crawlReducer = (state = initialState, action) => {
    switch (action.type) {
        case CRAWLING:
            return {
                ...state,
                isCrawling: true,
                isError: false,

            };
        case RESTING:
            return {
                ...state,
                isCrawling: false,
                isError: false,
            };
        case CRASHED:
            return {
                ...state,
                isCrawling: false,
                isError: true,
            };
        default:
            return state;
    };
}

export default crawlReducer;