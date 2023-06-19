import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Contexts/DataContext";
import { useState } from "react";
import { PostComponent } from "../Components/PostComponent";
import { AuthContext } from "../Contexts/AuthContext";
import { PostField } from "../Components/PostField";
import { Nav } from "../Components/Nav";
import { FilterButton } from "../Components/FilterButton";
import HomeStyles from "./Home.module.css"
import Add from "../assets/Add.png"

const Home = () => {

    const [sortFilter, setSortFilter] = useState("Trending")
    
    const navigate = useNavigate()

    const {state, dispatch} = useContext(DataContext)
    const {auth} = useContext(AuthContext)

    const filteredState = state.posts.slice().sort((a,b)=> sortFilter==="Trending" ? b.likes.likeCount - a.likes.likeCount : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())


    const handlePostBtn = () => {
        if (auth.length===0) {
            navigate("/login")
            return
        }
        dispatch({type : "POSTFIELD_TRUE"})
    }

    return (
        <div className={HomeStyles.home}>
            <Nav/>
            <FilterButton sortState={sortFilter} sortFunc={setSortFilter}/>
            <div className={HomeStyles.addButton}>
                <img src={Add} alt="" onClick={()=>handlePostBtn()} height={60} width={60}/>
                {state.newPostField && <PostField/>}
            </div>
            <ul className={HomeStyles.postlists}>
                {filteredState.map(post => {
                    return (
                        <li key={post._id} style={{listStyle : "none"}}>
                            <PostComponent post={post}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home;