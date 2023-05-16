import React from 'react';
import { Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from 'react';

function RemoveFriend({ friendId }) {
  const queryClient = useQueryClient();
  const { authToken } = useContext(AuthContext);

  const removeFriendMutation = useMutation(() =>
    makeRequest('/removefriend', { method: 'POST', data: { friendId }, authToken })
  );

  const handleRemoveFriend = () => {
    removeFriendMutation.mutate(null, {
      onSuccess: () => {
        // Invalidate the friend list query to refetch the updated list
        queryClient.invalidateQueries('friendsys');
      },
    });
  };

  return (
    <Button
      className="btn btn-dark btn-sm border border-white"
      type="button"
      href="#"
      style={{ padding: "0.3% 5.5%", float: "right" }}
      onClick={handleRemoveFriend}
      disabled={removeFriendMutation.isLoading}
    >
      {removeFriendMutation.isLoading ? 'Removing...' : 'Remove Friend'}
    </Button>
  );
}

export default RemoveFriend;
