import { Card, Button, Container, Stack, Image, Form } from 'react-bootstrap';
import { useInView } from "react-intersection-observer";
import { AuthContext } from "../context/authContext";
import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostPfp from '../components/PostPfp';
import  { makeRequest } from "../axios";
import ReactPlayer from "react-player";
import moment from "moment";
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import Comment from './Comment';



function ProfilePosts () {
    const { currentUser } = useContext(AuthContext);
    const { username } = useParams();

    const { isLoading, error, data } = useQuery(["posts", username], () =>
        makeRequest.get(`/getuserposts/${username}`).then((res) => {
        return res.data;
        })
    );
    return (
        <> 
        <div className="posts">
            {error ? "Whoops, unexpected error occured" :
             isLoading ? "loading" :
             data.map((post) =>
                <div className="post" key={post.id}>
                    <Container className="d-flex align-items-center justify-content-center" style={{ maxWidth: "780px" }}>
                    <Stack>
                    <Card className= "my-post">
                        <Stack 
                        direction="horizontal" 
                        gap={3} 
                        style={{width: '97%', margin: 'auto', 
                        paddingTop: '2%'}}>

                            <div className="ms-start">{post.pfp ? <PostPfp src={post.pfp} alt="pfp"/> : 
                                <PostPfp src="/images/blankpfp.jpg" alt="pfp"/>} {post.name}</div>
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
                            <Card.Title>{post.postDesc}</Card.Title> 
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
    )
}

export default ProfilePosts;