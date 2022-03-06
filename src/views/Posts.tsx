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

import { ActionType } from "../redux/actionTypes";
import IconButton from "@mui/material/IconButton";
import DeleteModal from "./DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import Spinner from "../components/Spinner"
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {Post} from "../redux/reducers/posts"
export default function ViewPosts() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.

  const { getting_posts, filteredPosts } = useTypedSelector((state) => state.posts);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredPosts.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await dispatch(getAllPosts());
    };
    fetchPosts();
  }, []);

  const openEditModal = (item: Post) => {
    
    dispatch({
      type: ActionType.ADD_POST_MODAL_TOGGLE,
      payload: item,
    });
  };

  const openDeleteModal = (item: number) => {
    dispatch({
      type: ActionType.DELETE_POST_MODAL_TOGGLE,
      payload: item,
    });
  };

  const searchPost = (e:React.ChangeEvent<HTMLInputElement>) =>{
    dispatch({
      type: ActionType.FILTER_POST,
      payload: e.target.value,
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
      <Box sx={{display : 'flex', alignItems : 'center', gap : 1,marginBottom : '10px'}}>
      <AddPostModal />
            <TextField
          label="Search Post"
          id="search-post"
          onChange={searchPost}
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
          }}
        />
      </Box>
           
            {getting_posts ? (
                  <Spinner color="primary" />
                ) : (   <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                
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
                      {(filteredPosts && filteredPosts.length > 0 && rowsPerPage > 0
                        ? filteredPosts.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredPosts
                      ).map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.userId}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>
                          <IconButton>
                              <VisibilityIcon
                                onClick={() => {
                                  history.push({
                                    pathname: "/viewPost",
                                    state: item,
                                  });
                                }}
                              />
                            </IconButton>
                            <IconButton>
                              <EditIcon
                                onClick={() => {
                                  openEditModal(item);
                                }}
                              />
                            </IconButton>

                            <IconButton>
                              <DeleteIcon
                                onClick={() => {
                                  openDeleteModal(item.id);
                                }}
                              />
                            </IconButton>
                            
                          </TableCell>
                        </TableRow>
                      ))}

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          count={filteredPosts.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </TableRow>
                    </TableFooter>
                  </>
                
              </Table>
            </TableContainer>)}
          </Container>
        </Box>
      </main>

      <DeleteModal />
    </>
  );
}
