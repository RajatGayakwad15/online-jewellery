import  { useState } from "react";
// import { IconEdit } from "@tabler/icons-react";
import { LoaderCircle,  Trash2, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";

const ViewUser = () => {
  // Dummy User Data
  const user= {
    id: 1,
    username: "john_doe",
    first_name: "John",
    last_name: "Doe",
    phone_number: "+91 9876543210",
    email: "john.doe@example.com",
    role_id: "2", // Default role Client
    address: "123 MG Road, Pune, Maharashtra",
    country_name: "India",
  };

  const [userDeleted, setUserDeleted] = useState(false);

  // const handleRoleChange = (e:any) => {
  //   const newRole = e.target.value;
  //   console.log("Role changed to:", newRole);
  //   setUser((prev) => ({ ...prev, role_id: newRole }));
  // };

  const handleDelete = () => {
    console.log("User deleted:", user.id);
    setUserDeleted(true);
  };

  if (userDeleted) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        User has been deleted.
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* Action Buttons */}
      <div className="mt-15 flex justify-end space-x-2 p-4">
        {/* <Button
          variant="outline"
          onClick={() => alert("Edit User clicked (dummy action)")}
        >
          <IconEdit size={16} />
          Edit
        </Button> */}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <Trash2 size={16} />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                User.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                className="flex items-center gap-1 px-3 py-1.5 text-sm transition"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                Delete
                <LoaderCircle className="animate-spin hidden" />
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* User Info */}
      {/* <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[60%_39%]"> */}
      <div className="grid grid-cols-1 gap-4 p-4 ">

        {/* User Information Card */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <User className="text-yellow-700" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-1 lg:grid-cols-2">
            <div>
              <span className="font-medium">User Name:</span> {user.username}
            </div>
            {/* <div className="mt-1">
              <span className="font-medium">Full Name:</span>{" "}
              {user.first_name} {user.last_name}
            </div> */}
            <div className="mt-1">
              <span className="font-medium">Phone:</span> {user.phone_number}
            </div>
            <div className="mt-1">
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div className="mt-1">
              <span className="mr-2 font-medium">Role: </span> Client
              {/* <select
                value={user.role_id}
                onChange={handleRoleChange}
                className="rounded border px-2 py-1 text-center"
              >
                <option value="1" className="bg-accent">
                  Admin
                </option>
                <option value="2" className="bg-accent">
                  Client
                </option>
              </select> */}
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        {/* <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <MapPinHouse className="text-yellow-700" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">
              Address:{" "}
              <span className="text-muted-foreground">{user.address}</span>
            </p>
            <p className="text-muted-foreground">{user.country_name}</p>
          </CardContent>
        </Card> */}
      </div>
    </>
  );
};

export default ViewUser;
