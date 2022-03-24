import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import { useState } from "react";
import { tab } from '@testing-library/user-event/dist/tab';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';



function App() {
  const [check, setCheck] = useState(false);
  const [bookmark, setBookmark] = useState({ name: '', link: '' })
  const [view, viewBookmark] = useState([])
  const [count,setCount] = useState(0)
  const [search,setsearch] = useState({search_bookmark:''})


  //states are being saved here
  const HandleChange = (event) => {
      const { name, value } = event.target
      setBookmark({ ...bookmark, [name]: value })
  }

  const HandleSearch = (event)=>{
    
    const { name, value } = event.target
    setsearch({ ...search, [name]: value })
  }

///
  
  useEffect(async () => {

    let response = await fetch('http://localhost:3001/viewbookmark');
    let data = await response.json();

    console.log("here we go ", data)
    viewBookmark(data)
    setCheck(true)

}, [count])

  /////////////////
  
  
  const SearchData = async (e) => {
    e.preventDefault()
    console.log("In search")
    const { search_bookmark } = search;
    console.log("seeee",search.search_bookmark)

    let response = await fetch('http://localhost:3001/searchbookmark', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            search_bookmark
        })
    });
    let data = await response.json();
    let data1 = JSON.stringify(data)
    alert(data1)
    console.log("Sucess of data", data)
    setCount(count+1)
}


  //Adding to the database

    
      const AddData = async (e) => {
        e.preventDefault()
        console.log("send Data")
        const { name, link } = bookmark;

        let response = await fetch('http://localhost:3001/storebookmark', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name, link
            })
        });
        let data = await response.json();
        console.log("Sucess of data", data)
        setCount(count+1)
    }

    ///// Update
    const UpdateBookmark = async (id)=>{
      let name = prompt("Enter Bookmark Name")
      let link= prompt("Enter Bookmark link")

      let response = await fetch('http://localhost:3001/updatebookmark',{
          method:"POST",
          headers:{
              "Content-type":"application/json"
          },
          body:JSON.stringify({
              name:name,link:link,id:id
          })

      });
      let data = await response.json();
      console.log("Sucess of data", data)
      setCount(count+1)
      
    
    }

    ////Delete

    const DeleteBookmark =async (id)=>{
      //e.preventDefault()
      let response = await fetch("http://localhost:3001/deletebookmark",{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },

          body:JSON.stringify({id})
      });

      let data = await response.json()

      //setting count to update bookmark after deleting
      setCount(count+1)


  }



    /////

  {if(check){
  return (<>
  <form>
    <input type="text" name="search_bookmark" onChange={HandleSearch}/>
    <Button size={'small'} type="primary" onClick={SearchData} > Search </Button>
  </form>
    <h1>Jibran</h1>
    
    <form>
      <label>Name: </label>
      <input type="text" name='name' onChange={HandleChange}/>
      <label>link: </label>
      <input type="text" name='link' onChange={HandleChange}/>
    <Button size={'small'} type="primary" onClick={AddData} > Add    </Button>
    </form>
    
    <table>
                <tr>
                    <th> Name</th>
                    <th> Link</th>
                    <th>Update</th>
                    <th>Delete</th>

                </tr>
                {view.map((itm, ind) =>
                    <tr>
                        <td key={itm.name+ind} >{itm.name}</td>
                        <td key={itm.link+ind}>{itm.link}</td>
                        <td><center >
                            
                          <Button onClick={()=>{UpdateBookmark(itm._id)}} style={{color:'blue'}}>Edit</Button>  
                             </center>
                        </td>
                        <td >
                            <center>
                          <Button onClick={()=>{DeleteBookmark(itm._id)}} style={{color:'red'}}>Delete</Button>  
                            </center>
                        </td>
                    </tr>
                )}
            </table>

  </>  
  );
  }
  else{
    
      return(<>
      <h2>Loading</h2>
      
      </>)
  }
}
    }
    
export default App;
//////////
