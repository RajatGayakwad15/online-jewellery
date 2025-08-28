import { useState } from 'react'
import {
  MapPinHouse,
  ShoppingCart,
  User,
  FileText,
  Trash2,
  LoaderCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

type Product = {
  product_name: string;
  product_image: string;
  product_qua: number;
  product_price: number;
};

type Order = {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  invoice_no: string;
  total_amount: number;
  products: Product[];
};


const ViewOrder = () => {
  // Dummy order data
  const [order, setOrder] = useState<Order | null>({
    id: 1,
    name: "Rahul Sharma",
    phone_number: "9876543210",
    email: "rahul@example.com",
    address: "123 MG Road",
    city: "Pune",
    pincode: "411001",
    invoice_no: "INV-2025-001",
    total_amount: 8999,
    products: [
      {
        product_name: "Stylish Glossary Book",
        product_image:
          "https://via.placeholder.com/100x100.png?text=Glossary",
        product_qua: 2,
        product_price: 2999,
      },
      {
        product_name: "Glossary Tote Bag",
        product_image:
          "https://via.placeholder.com/100x100.png?text=Tote+Bag",
        product_qua: 1,
        product_price: 3001,
      },
    ],
  });

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      toast.success('Order deleted successfully!', {
        style: { background: 'black', color: 'white', border: '1px solid #333' },
      })
      setOrder(null) // remove order
      setIsDeleting(false)
    }, 1500)
  }

  const handleCopy = () => {
    if (order?.invoice_no) {
      navigator.clipboard
        .writeText(order.invoice_no)
        .then(() => toast.success('Copied to clipboard'))
        .catch(() => toast.error('Failed to copy'))
    }
  }

  if (!order) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Order not found or deleted.
      </div>
    )
  }

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <div className="mt-20 space-y-6 p-4">
        {/* Delete button */}
        <div className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Trash2 size={16} /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  order.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  {isDeleting ? (
                    <>
                      Deleting...
                      <LoaderCircle className="animate-spin" size={16} />
                    </>
                  ) : (
                    'Delete'
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Client Info + Address */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[60%_39%]">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <User className="text-yellow-700" /> Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-1 lg:grid-cols-2">
              <div>
                <span className="font-medium">Name:</span> {order.name}
              </div>
              <div>
                <span className="font-medium">Phone:</span>{' '}
                {order.phone_number}
              </div>
              <div>
                <span className="font-medium">Email:</span> {order.email}
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <MapPinHouse className="text-yellow-700" /> Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {order.address}, {order.city} - {order.pincode}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Invoice + Products */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[39%_60%]">
          <Card className="border shadow-sm">
            <CardContent className="space-y-4">
              <div
                className="mt-4 flex cursor-pointer items-center gap-2"
                onClick={handleCopy}
              >
                <FileText /> <span>Invoice No:</span>
                <span className="font-semibold">{order.invoice_no}</span>
              </div>
              <Button variant="outline">
                <FileText className="mr-2" /> Download Invoice
              </Button>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <ShoppingCart className="text-yellow-700" /> Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, i) => (
                    <tr key={i} className="border-b border-gray-700">
                      <td className="flex items-center gap-2 p-2">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="h-10 w-10 rounded-full object-contain"
                        />
                        {item.product_name}
                      </td>
                      <td className="p-2 text-center">{item.product_qua}</td>
                      <td className="p-2 text-right">
                        ₹{item.product_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right font-semibold">
                Total Amount: ₹{Number(order.total_amount).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ViewOrder
