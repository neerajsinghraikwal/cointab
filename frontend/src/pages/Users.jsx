import { Box, Center, HStack } from "@chakra-ui/layout";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "@chakra-ui/image";
import { Spinner } from "@chakra-ui/spinner";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";

const Users = () => {
  const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [array, setArray] = useState([]);

  async function fetchData() {
    let apiUrl = `https://cointab-c0o9.onrender.com/users?page=${page}`;
    if (country) {
      apiUrl += "&country=" + country;
    }
    if (gender) {
      apiUrl += "&gender=" + gender;
    }
    if (age) {
      apiUrl += "&age=" + age;
    }
    console.log(array, total, apiUrl);
    try {
      let users = await axios.get(apiUrl);
      if (users.data.total == 0) {
        setArray([]);
        setData(users.data.data);
        setLoading(false);
      } else {
        setTotal(Math.ceil(users.data.total / 10));
        setData(users.data.data);
        setLoading(false);
        let arr = [];
        for (let i = 1; i <= Math.ceil(users.data.total / 10); i++) {
          arr.push(i);
          setArray(arr);
        }
      }
    } catch (e) {
      setArray([]);
      console.log(e);
    }
  }
  // console.log("gender",gender)

  const handleReset = () => {
    setGender(null);
    setCountry(null);
    setAge(null);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page, age, country, gender]);

  if (loading) {
    return (
      <>
        <Center h={"100vh"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            width="100px"
            height="100px"
          />
        </Center>
      </>
    );
  } else {
    return (
      <>
        <Box>
          <HStack>
            <Select
              placeholder="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>

            <Select
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </Select>

            <Select placeholder="Age" onChange={(e) => setAge(+e.target.value)}>
              <option value="10">10+</option>
              <option value="20">20+</option>
              <option value="30">30+</option>
              <option value="50">50+</option>
            </Select>

            <Button onClick={handleReset}>Reset Filter</Button>
          </HStack>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((el) => {
                  return (
                    <Tr>
                      <Td>{el.age}</Td>
                      <Td>{el.picture}</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <HStack>
            <Button
              onClick={() => setPage((page) => page - 1)}
              isDisabled={page === 1}
            >
              Prev
            </Button>
            {array.map((el) => {
              return (
                <Button
                  onClick={() => setPage(el)}
                  bg={page === el ? "black" : "blue"}
                >
                  {el}
                </Button>
              );
            })}
            <Button
              onClick={() => setPage((page) => page + 1)}
              isDisabled={page === total}
            >
              Next
            </Button>
          </HStack>
        </Box>
      </>
    );
  }
};

export default Users;
