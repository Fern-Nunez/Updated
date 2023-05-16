import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from 'react';
import moment from 'moment';
import { Image, Stack } from 'react-bootstrap';
import PostPfp from './PostPfp';


function Comments({ postId }) {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(['comments', postId], () =>
  makeRequest.get(`/getcomments/${postId}`).then((res) => {
  return res.data;
  })
);
  return (
  <div>
    {error
      ? "Something went wrong"
      : isLoading
      ? "loading"
      : data.map((comment) => (
          <div className="comment">
            <div style={{display: "flex"}}>
              <div>
                <div style={{marginLeft: "15px"}}>
                  <PostPfp src={comment.pfp} alt="pfp"/>
                </div>
              </div>

              <div>
                <Stack className='vertical'>
                  <Stack direction="horizontal">
                    <span style={{fontWeight: "bold", fontSize: "15px"}}>{comment.name}</span>
                    <span className="date" style={{marginLeft: "4px"}}> {moment(comment.dateCreated).fromNow()} </span>
                  </Stack>
                  <div>
                    <p>{comment.commentDesc}</p>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        ))}
  </div>
  )
}

export default Comments
