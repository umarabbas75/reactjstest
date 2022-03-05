import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ActionType } from "../redux/actionTypes/auth";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from '../hooks/useTypeSelector';
import { useHistory } from "react-router-dom";
import { addPost } from "../redux/actionCreators/posts";



export default function AddPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {adding_posts,adding_post_succcess } = useTypedSelector((state) => state.posts);
 

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
    history.push('/Posts')
    dispatch({
        type : ActionType.RESET_POST_STATES
    });
  }



  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
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
              autoFocus
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
                Add Post
                {adding_posts ? 'adding post....' : 'Add Post'}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
