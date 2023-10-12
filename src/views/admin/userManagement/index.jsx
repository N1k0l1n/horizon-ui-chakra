/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import UserTable from "views/admin/userManagement/components/UserTable";
import {
  usersDataTable,
} from "views/admin/userManagement/variables/usersColumnData";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../features/users/usersSlice";


export default function UserReports() {
 
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.usersList);

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <UserTable columnsData={usersDataTable} tableData={userList || []} />
      </SimpleGrid>
    </Box>
  );
}
