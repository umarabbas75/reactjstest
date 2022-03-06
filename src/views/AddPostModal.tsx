import React , {useEffect} from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/auth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { addPost,editPost } from "../redux/actionCreators/posts";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const AddPostModal = () => {
  const dispatch = useDispatch();

  const {
    add_post_modal_visibiity,
    adding_post_succcess,
    adding_posts,
    initialValues,
    updating_post_succcess
  } = useTypedSelector((state) => state.posts);
  const addPostModalToggle = () => {
    dispatch({
      type: ActionType.ADD_POST_MODAL_TOGGLE,
    });
  };

  const addPostReq = async (postData: any) => {
    await dispatch(addPost(postData));
  };
  const editPostReq = async (postData: any,postId : any) => {
    await dispatch(editPost(postData,postId));
  };


  console.log('========initialValues=========',initialValues)


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    body: Yup.string().required("body is required"),
    userId: Yup.string().required("userId is required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  };

  const { handleSubmit, reset, formState, control } = useForm(formOptions);
  const { errors } = formState;
  const onFinish = (values: any) => {

  
    if(initialValues){
      editPostReq(values,values.id);
    }
    else{
      addPostReq(values);
    }
    
  };

  useEffect(() => {
    if(add_post_modal_visibiity && initialValues){
      reset(initialValues)
    }
   }, [add_post_modal_visibiity])
   

  if (adding_post_succcess || updating_post_succcess) {
    //history.push('/Posts')
    dispatch({
      type: ActionType.RESET_POST_STATES,
    });
    addPostModalToggle();
    reset();
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
        <Box component="form" onSubmit={handleSubmit(onFinish)} sx={{ mt: 1 }}>
          <DialogContent>
            <DialogContentText>
              Fill below fields to create the new post
            </DialogContentText>
            <Controller
              name={"title"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoFocus
                />
              )}
            />
            <Controller
              name={"body"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  margin="normal"
                  required
                  fullWidth
                  id="body"
                  label="body"
                  name="body"
                />
              )}
            />
            <Controller
              name={"userId"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  margin="normal"
                  required
                  fullWidth
                  name="userId"
                  label="User ID"
                  id="userId"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addPostModalToggle}>Cancel</Button>
            <Button type="submit" disabled={adding_posts}>
              {adding_posts ? "adding post...." : "Add Post"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AddPostModal;
