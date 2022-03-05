import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/auth";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { addPost } from "../redux/actionCreators/posts";

const AddPostModal = () => {
  const dispatch = useDispatch();
  const { add_post_modal_visibiity,adding_post_succcess,adding_posts } = useTypedSelector((state) => state.posts);
  const addPostModalToggle = () => {
    dispatch({
      type: ActionType.ADD_POST_MODAL_TOGGLE,
    });
  };

  const addPostReq = async (postData : any) =>{
    await  dispatch(addPost(postData));
  } 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let postData =JSON.stringify({
        title: data.get("title"),
        body: data.get("body"),
        userId: data.get("userId"),
      })

     
      addPostReq(postData)
  };

  if(adding_post_succcess){
    //history.push('/Posts')
    dispatch({
        type : ActionType.RESET_POST_STATES
    });
    addPostModalToggle()
  }


  return (
    <>
      <Button
        variant="contained"
        sx={{ marginBottom: "10px" }}
        onClick={addPostModalToggle}
      >
        Add Post Modal
      </Button>
      <Dialog open={add_post_modal_visibiity} onClose={addPostModalToggle}>
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill below fields to create the new post
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="body"
              label="body"
              name="body"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="userId"
              label="User ID"
              id="userId"

            />

            <Button
            disabled={adding_posts}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                
                {adding_posts ? 'adding post....' : 'Add Post'}
            </Button>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={addPostModalToggle}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default AddPostModal;
