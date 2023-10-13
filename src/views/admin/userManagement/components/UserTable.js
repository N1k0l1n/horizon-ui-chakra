import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  Modal,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useDispatch } from "react-redux";
import {
  deleteUserById,
  addUserAsync,
  editUserAsync,
} from "../../../../features/users/usersSlice";

// Custom components
import Card from "components/card/Card";
import CustomModal from "components/modal/CustomModal";

export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  //Actions
  const dispatch = useDispatch();

  const handleDelete = (userId) => {
    // Dispatch the deleteUser action with the user's ID
    dispatch(deleteUserById(userId));
  };

  const handleEdit = (user) => {
    dispatch(editUserAsync(user))
      .then(() => {
        setEditModalOpen(false); // Close the modal after editing the user
        window.location.reload(); // Reload the entire page
      })
      .catch((error) => {
        console.error("Error editing user:", error);
      });
  };

  const handleAdd = (user) => {
    dispatch(addUserAsync(user))
      .then(() => {
        setAddModalOpen(false); // Close the modal after adding the user
        window.location.reload(); // Reload the entire page
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  // Define modal state
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  //Open Edit modal
  const openEditModal = (rowData) => {
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };

  //Open Add Modal
  const openAddModal = (rowData) => {
    setAddModalOpen(true);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      minW="1500px"
      minH="200px" // Set a minimum height here
      px="0px"
      overflowX={{ sm: "scroll", lg: "auto" }}
    >
      <Flex px="25px" justify="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Users Table
        </Text>
        <Button colorScheme="blue" onClick={openAddModal}>
          +
        </Button>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "FIRST NAME") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "LAST NAME") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "USER NAME") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "EMAIL") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "ADDRESS") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "USER ROLE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PHONE NUMBER") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "ACTIONS") {
                    data = (
                      <Flex align="center">
                        <Button
                          colorScheme="teal"
                          mr="2"
                          onClick={() => openEditModal(row.original)}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(row.original.id)}
                        >
                          Delete
                        </Button>
                      </Flex>
                    );
                  }

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <CustomModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          selectedRowData={selectedRowData}
          onSave={handleEdit}
        />
      </Modal>
      {/* Add User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <CustomModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          selectedRowData={null}
          onSave={handleAdd}
        />
      </Modal>
    </Card>
  );
}
