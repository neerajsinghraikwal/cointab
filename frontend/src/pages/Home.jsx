import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import axios from "axios"
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";

const Home = () => {
  const [fetchLoading,setFetchLoading] = useState(false)
  const [deleteLoading,setDeleteLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const handleFetch = async() => {
      setFetchLoading(true);
      try{
        let data = await axios.post("https://cointab-c0o9.onrender.com/users")
        console.log(data)
        setFetchLoading(false);
        toast({
          title: 'Successful',
          description: "Data saved successfully",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
      }catch(e){
        toast({
          title: 'Try Again...',
          description: "Sorry...",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
      }
  };

  const handleUsers = () => {
    navigate("/users")
  };

  const handleDelete = async() => {
    setDeleteLoading(true);
      try{
        await axios.delete("https://cointab-c0o9.onrender.com/users")
        setDeleteLoading(false);
         toast({
          title: 'Successful',
          description: "Data deleted successfully",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
      }catch(e){
         toast({
          title: 'Try Again...',
          description: "Sorry...",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
      }
  };

  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        display={"flex"}
        alignItems="center"
        backgroundColor=""
      >
        <VStack m="auto" gap="3">
          <Button w="200px" onClick={handleFetch} isLoading={fetchLoading} loadingText='Fetching'>
            Fetch
          </Button>
          <Button w="200px" onClick={handleUsers}>
            Users
          </Button>
          <Button w="200px" onClick={handleDelete} isLoading={deleteLoading} loadingText='Deleting'>
            Delete
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Home;