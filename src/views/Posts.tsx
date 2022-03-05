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
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import AddPostModal from './AddPostModal'
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
  const addPost = () => {
    history.push("/addPost");
  };

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
                            <TableCell>--</TableCell>
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
    </>
  );
}
