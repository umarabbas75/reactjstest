import React , {useEffect} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actionCreators/posts";
import { useTypedSelector } from "../hooks/useTypeSelector";

export default function Album() {
  
  const dispatch = useDispatch()
  const {getting_posts,posts } = useTypedSelector((state) => state.posts);

  const rows = [
    {
      id: 1,
      userId: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    },
    {
      id: 2,
      userId: 2,
      title: "qui est esse",
    },
    {
      id: 3,
      userId: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    },
  ];

  useEffect(() => {
    const fetchPosts = async ()=>{
      await dispatch(getAllPosts());
    }
    fetchPosts()
  }, [])
  

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
       <Container maxWidth="md">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
             {getting_posts ? 'loading....' :       <>
                <TableHead>
                  <TableRow>
                   
                    <TableCell >id</TableCell>
                    <TableCell >userId</TableCell>
                    <TableCell >title</TableCell>
                    <TableCell >Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts && posts.length > 0 && posts.map((item : any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.userId}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>--</TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              
                </>}
                </Table>
             
            </TableContainer>
          </Container>
        </Box>
      </main>
    </>
  );
}
