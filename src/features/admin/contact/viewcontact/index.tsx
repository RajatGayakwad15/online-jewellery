// import React from "react";
import { Contact, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { LoaderCircle,  Trash2 } from "lucide-react";
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
import { useState } from "react";

const ViewContact = () => {
  // Dummy Contact Data
  const dummyContact = {
    name: "John Doe",
    phone_number: "+91 9876543210",
    email: "johndoe@example.com",
    contact_reason: "General Inquiry",
    message:
      "Hello, I would like to know more about your glossary website services.",
  };
  
  const [contactDeleted, setContactDeleted] = useState(false);
  const handleDelete = () => {
   
    setContactDeleted(true);
  };

  if (contactDeleted) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        Contact has been deleted.
      </div>
    );
  }

  return (
    <>
      {/* Header with theme + profile */}
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* Contact Info Section */}
      <div className="mt-15 space-x-2 p-4">
      <div className=" flex justify-end space-x-2 p-4">
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
                Contact.
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[60%_39%]">
          {/* Contact Information */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <Contact className="text-yellow-700" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-1 lg:grid-cols-2">
              <div className="mt-1">
                <span className="font-medium">Name:</span> {dummyContact.name}
              </div>
              <div className="mt-1">
                <span className="font-medium">Phone:</span>{" "}
                {dummyContact.phone_number}
              </div>
              <div className="mt-1">
                <span className="font-medium">Email:</span>{" "}
                {dummyContact.email}
              </div>
              <div className="mt-1">
                <span className="mr-2 font-medium">Reason: </span>
                {dummyContact.contact_reason}
              </div>
            </CardContent>
          </Card>

          {/* Contact Message */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <MessageCircle className="text-yellow-700" />
                Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">
                Message:{" "}
                <span className="text-muted-foreground">
                  {dummyContact.message}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ViewContact;
