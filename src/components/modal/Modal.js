import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  Box, // Import Box from Chakra UI
} from "@chakra-ui/react";

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  )


const CustomModal = ({ isOpen, onClose, selectedRowData, onSave }) => {
  const [editedUserData, setEditedUserData] = useState(selectedRowData);

  const handleSave = () => {
    onSave(editedUserData);
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <OverlayOne />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Please fill the above Fields</Text>
          {/* Use Box component for styling */}
          <Box p="4">
            <Input
              value={selectedRowData?.firstName || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  firstName: e.target.value,
                })
              }
              placeholder="FIRST NAME"
              mb="3"
            />
            <Input
              value={selectedRowData?.userName || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  userName: e.target.value,
                })
              }
              placeholder="USER NAME"
              mb="3"
            />
            <Input
              value={selectedRowData?.email || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  email: e.target.value,
                })
              }
              placeholder="EMAIL"
              mb="3"
            />
            <Input
              value={selectedRowData?.userRole || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  userRole: e.target.value,
                })
              }
              placeholder="USER ROLE"
              mb="3"
            />
            <Input
              value={selectedRowData?.status || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  status: e.target.value,
                })
              }
              placeholder="STATUS"
              mb="3"
            />
            <Input
              value={selectedRowData?.address || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  address: e.target.value,
                })
              }
              placeholder="ADDRESS"
              mb="3"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal
