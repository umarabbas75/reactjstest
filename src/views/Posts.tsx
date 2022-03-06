import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actionCreators/posts";
import { useTypedSelector } from "../hooks/useTypeSelector";

import { useHistory } from "react-router-dom";
import AddPostModal from "./AddPostModal";
import EditIcon from "@mui/icons-material/Edit";

import { ActionType } from "../redux/actionTypes/auth";
import IconButton from "@mui/material/IconButton";
import DeleteModal from "./DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function Album() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getting_posts, posts } = useTypedSelector((state) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      await dispatch(getAllPosts());
    };
    fetchPosts();
  }, []);

  const openEditModal = (item: any) => {
    dispatch({
      type: ActionType.ADD_POST_MODAL_TOGGLE,
      payload: item,
    });
  };

  const openDeleteModal = (item: any) =>{
    dispatch({
      type: ActionType.DELETE_POST_MODAL_TOGGLE,
      payload: item,
    });
  }

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md" sx={{ minWidth: 650 }}>
            {/* <Button
              variant="contained"
              sx={{ marginBottom: "10px" }}
              onClick={addPost}
            >
              Add Post page
            </Button> */}

            <AddPostModal />

            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                {getting_posts ? (
                  "loading...."
                ) : (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>userId</TableCell>
                        <TableCell>title</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {posts &&
                        posts.length > 0 &&
                        posts.map((item: any) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>
                              <IconButton>
                                <EditIcon
                                  onClick={() => {
                                    openEditModal(item);
                                  }}
                                />
                              </IconButton>

                              <IconButton>
                                <DeleteIcon onClick={() => {
                                    openDeleteModal(item.id);
                                  }} />
                              </IconButton>
                              <IconButton>
                                <VisibilityIcon onClick={() => {
                                    history.push({pathname : '/viewPost', state : item})
                                  }} />
                              </IconButton>
                              
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </>
                )}
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </main>

      <DeleteModal />
    </>
  );
}
