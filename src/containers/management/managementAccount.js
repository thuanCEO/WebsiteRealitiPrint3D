import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Row, Col } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/api/api";
import { MdCheck, MdClose } from "react-icons/md";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  {
    name: "Dashboard",
    path: "/reality3d/management/management-dashboard-page",
    current: false,
  },
  {
    name: "Accounts",
    path: "/reality3d/management/management-accounts-page",
    current: false,
  },
  {
    name: "Products",
    path: "/reality3d/management/management-products-page",
    current: false,
  },
  {
    name: "Service",
    path: "/reality3d/management/management-services-page",
    current: false,
  },
  {
    name: "Blogs",
    path: "/reality3d/management/management-blogs-page",
    current: false,
  },
  {
    name: "Orders",
    path: "/reality3d/management/management-orders-page",
    current: false,
  },
  {
    name: "Vouchers",
    path: "/reality3d/management/management-vouchers-page",
    current: false,
  },
  {
    name: "Feedbacks",
    path: "/reality3d/management/management-feedbacks-page",
    current: false,
  },
  {
    name: "Categories",
    path: "/reality3d/management/management-categories-page",
    current: false,
  },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ManagementAccount() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [users, setUser] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleOpenEditModal = (row) => {
    setCurrentRow(row);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentRow(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 70,
    },
    { field: "fullName", headerName: "Full Name", width: 140 },
    { field: "phoneNumber", headerName: "Phone", width: 80 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "userName", headerName: "UserName", width: 160 },
    {
      field: "roleId",
      headerName: "Role",
      width: 100,
    },
    { field: "address", headerName: "Address", width: 100 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          width="100"
          height="100"
          className="h-12 w-12 rounded-full"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 30,
      renderCell: (params) => {
        if (params.value === 1) {
          return (
            <MdCheck
              style={{
                color: "green",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 20,
              }}
            />
          );
        } else if (params.value === 2) {
          return (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdClose style={{ fontSize: 16, color: "red" }} />
            </span>
          );
        }
        return null;
      },
    },
    {
      field: "detail",
      headerName: "Detail",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          handleDetailsClick(params.row.id);
        };

        return (
          <Button variant="contained" color="primary" onClick={onClick}>
            <BiSolidDetail className="icon-table" />
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenEditModal(params.row)}
        >
          <FaRegEdit className="icon-table" />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onDelete = () => {
          deleteUsers(params.row.Id);
        };

        return (
          <Button variant="contained" color="error" onClick={onDelete}>
            <MdDeleteOutline className="icon-table" />
          </Button>
        );
      },
    },
  ].map((column) => ({
    ...column,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  function toggleOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    const url = location.pathname;
    navigation.forEach((item) => {
      if (url === item.path) {
        item.current = true;
      } else {
        item.current = false;
      }
    });
    fetchUsers();
  }, [location]);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get("/api/User/GetAllUsers");
      console.log("All users:", response.data);
      // Log roleId values
      const roleIds = response.data.map((user) => user.roleId);
      console.log("Role IDs:", roleIds);
      // Filter out users with roleId equal to 1 or 2
      const filteredData = response.data.filter(
        (user) => user.roleId === 3 || user.roleId === 4 || user.roleId === 2
      );
      console.log("Filtered users:", filteredData);
      // Map through the filtered data to add an id field to each user
      const usersWithId = filteredData.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setUser(usersWithId);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDetailsClick = (id) => {
    navigate(`/reality3d/management/management-account-details-page/${id}`);
  };
  // Delete Users -> delete from database
  const deleteUsers = async (Id) => {
    try {
      await axiosClient.delete(`/api/User/GetUserById/${Id}`);
      const updatedUsers = users.filter((user) => user.Id !== Id);
      setUser(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentRow((prev) => ({
      ...prev,
      [name]: name === "status" ? parseInt(value, 10) : value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      if (!currentRow || !currentRow.id) {
        console.error("Invalid category data.");
        return;
      }

      const dataToUpdate = {
        fullName: currentRow.fullName,
        phoneNumber: currentRow.phoneNumber,
        email: currentRow.email,
        userName: currentRow.userName,
        password: currentRow.password,
        address: currentRow.address,
        avatar: currentRow.avatar,
        roleId: currentRow.roleId,
        status: parseInt(currentRow.status, 10),
      };

      await axiosClient.put(
        `/api/User/UpdateUser/${currentRow.id}`,
        dataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchUsers();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error saving edited data:", error);
    }
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <Fragment>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.path}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </MenuButton>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-[4px] py-[2px] text-sm font-medium leading-none text-gray-streamer"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton
                      type="button"
                      onClick={toggleOpen}
                      className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-blue focus-ring-offset-blue"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-auto w-auto"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-auto w-auto"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel
                className="md:hidden"
                style={{ maxHeight: "calc(100vh - 16rem)" }}
              >
                <div className="space-y-1 px-[4px] pb-[3px] pt-[2px] sm:px-[6px]">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.path}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-[4px] py-[2px] text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
                <div className="border-t border-gray-streamer pb-[3px] pt-[4px]">
                  <div className="flex items-center px-[4px]">
                    <div className="flex-shrink-0">
                      <img
                        className="h-auto w-auto rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-[3px]">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-streamer">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-streamer p-[1px] text-gray-streamer hover:text-white focus:outline-none focus-ring-blue focus-ring-offset-blue"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-auto w-auto" aria-hidden="true" />
                    </button>
                  </div>
                  <Menu as={Fragment} className="">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-streamer" : "",
                              "block px-[4px] py-[2px] text-sm font-medium leading-none text-gray-streamer"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </DisclosurePanel>
            </Fragment>
          )}
        </Disclosure>

        <header className="bg-white shadow h-16 w-full">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Management Accounts
            </h1>
          </div>
        </header>
        {/* Main  */}
        <div>
          <main>
            <div className="flex flex-wrap justify-center mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 h-screen w-full">
              <div className="w-full h-full">
                {" "}
                <Row className="justify-content-center">
                  <Col>
                    <DataGrid
                      rows={users}
                      columns={columns}
                      pageSize={10}
                      pagination
                    >
                      <div style={{ textAlign: "center" }}>
                        <button onClick={() => {}}>Previous</button>
                        <button onClick={() => {}}>Next</button>
                      </div>
                    </DataGrid>
                  </Col>
                </Row>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-category-modal-title"
        aria-describedby="edit-category-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography
            id="edit-category-modal-title"
            variant="h6"
            component="h2"
          >
            Edit Category
          </Typography>
          {currentRow && (
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { mt: 2 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={currentRow.fullName}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={currentRow.phoneNumber}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={currentRow.email}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                value={currentRow.userName}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={currentRow.password}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Avatar"
                name="avatar"
                value={currentRow.avatar}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={currentRow.address}
                onChange={handleEditChange}
              />{" "}
              <TextField
                fullWidth
                select
                label="Role"
                name="roleId"
                value={currentRow.roleId}
                onChange={handleEditChange}
              >
                <MenuItem value={2}>Quản Lí</MenuItem>
                <MenuItem value={3}>Nhân Viên</MenuItem>
                <MenuItem value={4}>Khách Hàng</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={currentRow.status}
                onChange={handleEditChange}
              >
                <MenuItem value={1}>Hoạt động</MenuItem>
                <MenuItem value={2}>Dừng hoạt động</MenuItem>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveEdit}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
