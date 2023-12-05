import DisplayListButton from "./components/displayList/DisplayListButton";
import Display from "./components/displayList/Display";
import StartCrawlButton from "./components/crawl/StartCrawlButton";
import Crawl from "./components/crawl/Crawl";

function App() {
  return (
    <div className="App">
        <DisplayListButton />
        <Display />
        <StartCrawlButton/>
        <Crawl/>
     
    </div>
  );
}

export default App;