import React from 'react';
import { Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from 'react';

function AddFriend({ friendId }) {
  const queryClient = useQueryClient();
  const { authToken } = useContext(AuthContext);

  const addFriendMutation = useMutation((friendId) =>
    makeRequest('/addfriend', { method: 'POST', data: { friendId }, authToken })
  );

  const handleAddFriend = () => {
    addFriendMutation.mutate(friendId, {
      onSuccess: () => {
        // Invalidate the friend list query to refetch the updated list
        queryClient.invalidateQueries('friendsys');
      },
    });
  };

  return (
    <div>
      <Button
        className="btn btn-dark btn-sm border border-white"
        type="button"
        href="#"
        style={{ padding: "0.3% 5.5%", float: "right", width: "172px"}}
        onClick={handleAddFriend}
        disabled={addFriendMutation.isLoading}
      >
        {addFriendMutation.isLoading ? 'Adding...' : 'Add Friend'}
      </Button>
    </div>
  );
}

export default AddFriend;
