import { Card, Stack, Image, Form, Button, Container } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClipItNav from "../components/ClipItNav";
import PostPfp from "../components/PostPfp";
import { makeRequest } from "../axios";
import ReactPlayer from "react-player";
import { useState } from "react";
import collapse from "bootstrap";
import "../css/Background.css";
import moment from "moment";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
//import Axios from "axios"

function Home() {
    //makes api request to getposts of users added as friends onto current users main feed
    //allows posts to be loading as new posts are updated, no need for refreshing pages
    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get("/getposts").then((res) => {
        return res.data;
        })
    );

    console.log(data);

    return (
        <>
        <div className="default-bg-container"/>
            <ClipItNav/>
        <div className="posts">
            {error ? "Whoops, unexpected error occured" :
             isLoading ? "loading" :
             data.map((post) =>
                <div className="post" key={post.id}>
                    <Container className="d-flex align-items-center justify-content-center" style={{maxWidth: "780px", paddingTop: "10px", paddingBottom: "5px"}}>
                    <Stack>
                    <Card className= "my-post">
                        <Stack 
                        direction="horizontal" 
                        gap={3} 
                        style={{width: '97%', margin: 'auto', 
                        paddingTop: '2%'}}>

                            <div className="ms-start">
                                {post.pfp ? <PostPfp src={post.pfp} alt="pfp"/> : 
                                <PostPfp src="images/blankpfp.jpg" alt="pfp"/>}
                                    <Link to={`/profile/${post.username}`}
                                    style={{textDecoration: "none", color: "inherit"}}>
                                        {post.name}
                                    </Link> 
                            </div>
                            <div className="ms-auto">{moment(post.dateCreated).fromNow()}</div>

                        </Stack>
                        
                        {post.postContent.endsWith('.mp4') ? (
                                <ReactPlayer
                                url={post.postContent}
                                width="100%"
                                height="auto"
                                controls={true}
                                controlsList="nodownload"
                                volume={0.5}
                                style={{ padding: '2%', paddingBottom: '.5%' }}
                                />
                            ) : (
                                <Image src={post.postContent} fluid rounded
                                 style={{ padding: '2%', paddingBottom: '.5%' }} />
                            )
                        }
                        <div style={{marginLeft: "15px"}}>
                            <i className="fa-solid fa-heart"/>
                        </div>
                        <div style={{padding: "15px", paddingTop: "5px", paddingBottom: "5px"}}>
                            <p style={{fontSize: "20px"}}> {post.postDesc} </p>
                        </div>
                        <Comment postId={post.id}/>
                        <Comments postId={post.id}/>


                    </Card>
                    </Stack>
                    </Container>
                </div>
            )}
        </div>
        </>
    );
}

export default Home;