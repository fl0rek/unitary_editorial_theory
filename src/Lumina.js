import { publish, subscribe, unsubscribe } from "../../events";

import { publish } from "../events"

const PostList = (props) => {
    return (
        <ul>
            <h2>Posts</h2>
            {props.listData.map((el) => {
                return (
                    <li key={el.tld}>
                        <a href="${el.hash}@{el.height}">${el.hash}@{el.height}</a>
                    </li>
                );
            })}
        </ul>
    );
}

const ListControl = (props) => {
  const showList = () => {
    publish('showList');
  }
  const hideList = () => {
    publish('hideList');
  }
  return (
    <div>
      { 
        props.listState ? <button onClick={hideList}>Hide List</button> :
        <button onClick={showList}>Show List</button>
       }
    </div>
  );
}

//export default ListControl;

const Lumina = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    subscribe( (e: Event) => {
                        console.log(e);
                        //if e.data.type === "posts"
                })

                /*
    async function fetchData() {
      const apiUrl = 'https://restcountries.com/v3.1/region/africa';
      const response = await fetch(apiUrl)
      let data = await response.json()
      setList(data)
    }
    fetchData()
                */

    return () => { }
  }, []);

  return (
    <div className="Lumina">
                        <pre> hello</pre>
                        
      <ListControl listState={isOpen}></ListControl>
      {
        isOpen ? <PostList listData={postList}></PostList> :
      }
    </div>
  );
}
export default Lumina;

