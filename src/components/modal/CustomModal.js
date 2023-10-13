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
  Grid,
  Select,
} from "@chakra-ui/react";

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

const CustomModal = ({ isOpen, onClose, selectedRowData, onSave }) => {
  const [editedUserData, setEditedUserData] = useState(selectedRowData);

  const handleSave = () => {
    onSave(editedUserData);
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="6xl">
      <OverlayOne />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Please fill the above Fields</Text>
          <Grid gridTemplateColumns="1fr 1fr" gap="3">
            <Input
              value={editedUserData?.firstName || ""}
              onChange={(e) => {
                setEditedUserData({
                  ...editedUserData,
                  firstName: e.target.value,
                });
              }}
              placeholder="FIRST NAME"
              autoFocus
            />

            <Input
              value={editedUserData?.lastName || ""}
              onChange={(e) =>{
                setEditedUserData({
                  ...editedUserData,
                  lastName: e.target.value,
                })
              }}
              placeholder="LAST NAME"
            />

            <Input
              value={editedUserData?.username || ""}
              onChange={(e) => {
                setEditedUserData({
                  ...editedUserData,
                  username: e.target.value,
                })
              }}
              placeholder="USER NAME"
            />

            <Input
              value={editedUserData?.email || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  email: e.target.value,
                })
              }
              placeholder="EMAIL"
            />

            <Select
              value={editedUserData?.role || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  userRole: e.target.value,
                })
              }
            >
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
              <option value="Guest">Guest</option>
            </Select>

            <Input
              value={editedUserData?.address || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  address: e.target.value,
                })
              }
              placeholder="ADDRESS"
            />
            <Input
              value={editedUserData?.phoneNumber || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  phoneNumber: e.target.value,
                })
              }
              placeholder="PHONE NUMBER"
            />
          </Grid>
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
};

export default CustomModal;