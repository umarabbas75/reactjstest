import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { ActionType } from "../redux/actionTypes";
import { deletePost } from "../redux/actionCreators/posts";
import Spinner from "../components/Spinner"
const DeleteModal = () => {
  const {
    delete_post_modal_visibiity,
    postId,
    deleting_posts,
    deleting_post_succcess,
  } = useTypedSelector((state) => state.posts);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: ActionType.DELETE_POST_MODAL_TOGGLE,
    });
  };
  const deletePostReq = async () => {
    await dispatch(deletePost(postId));
  };
  const handleDelete = () => {
    deletePostReq();
  };

  if (deleting_post_succcess) {
    dispatch({
      type: ActionType.DELETE_POST_MODAL_TOGGLE,
    });
    dispatch({
      type: ActionType.RESET_POST_STATES,
    });
  }
  return (
    <>
      <Dialog
        open={delete_post_modal_visibiity}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete the Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to delete the post. it will not be deleted
            permanantly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button variant="contained" disabled={deleting_posts} onClick={handleDelete}>
            
            {deleting_posts ? <><span>Deleting....</span><Spinner color="inherit" size={20}/></> : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
