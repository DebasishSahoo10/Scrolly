import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../Contexts/DataContext";
import { useState } from "react";
import { PostComponent } from "../Components/PostComponent";
import { AuthContext } from "../Contexts/AuthContext";
import { PostField } from "../Components/PostField";

const Home = () => {

    const [sortFilter, setSortFilter] = useState("Trending")
    
    const navigate = useNavigate()

    const {state, dispatch} = useContext(DataContext)
    const {auth} = useContext(AuthContext)

    const filteredState = state.posts.slice().sort((a,b)=> sortFilter==="Trending" ? b.likes.likeCount - a.likes.likeCount : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
   
    const setSort = (text) => {
        setSortFilter(text)
    }

    const handlePostBtn = () => {
        if (auth.length===0) {
            navigate("/login")
            return
        }
        dispatch({type : "POSTFIELD_TRUE"})
    }

    return (
        <>
            <h1>Scrolly</h1>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login" style={{marginLeft : "10px"}}>Login</NavLink>
                <NavLink to="/selected" style={{marginLeft : "10px"}}>Selected</NavLink>
            </div>
            <div>
                <button value={"Trending"} style={{color : sortFilter==="Trending" && "Yellow"}} onClick={(e)=>setSort(e.target.value)}>Trending</button>

                <button value={"Newest"} style={{color : sortFilter==="Newest" && "Yellow"}} onClick={(e)=>setSort(e.target.value)}>Newest</button>
            </div>
            <div>
                <button onClick={()=>handlePostBtn()}>Add a Post</button>
                {state.newPostField && <PostField/>}
            </div>
            <ul>
                {filteredState.map(post => {
                    return (
                        <li key={post._id} style={{listStyle : "none"}}>
                            <PostComponent post={post}/>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Home;