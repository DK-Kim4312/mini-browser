import styled from "styled-components";


export const CrawlWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
        width: 600px;
        height: 600px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 20px;
            font-weight: bold;
        }
        .close {
            cursor: pointer;
            font-size: 20px;
            font-weight: bold;
        }
    }
    .content {
        overflow: auto;
        .link {
            margin-bottom: 10px;
            a {
                text-decoration: none;
                color: black;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

`;