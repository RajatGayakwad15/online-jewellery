import  { useEffect, useState } from "react"
// import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
// import { GetOrderDetails, OrderUpdate } from "@/api/admin/order/orderapi.jsx"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/layout/header"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { ThemeSwitch } from "@/components/theme-switch"
import toast from "react-hot-toast"
import { LoaderCircle } from "lucide-react"

const UpdateOrder = () => {
//   const { id } = useParams({ from: "/admin/order/update/$id/" })

  // 🔹 Dummy data instead of API
  const dummyOrder = {
    id: 1,
    address: "123 MG Road",
    city: "Pune",
    pincode: "411001",
  }

  // const { data: getOrder, isPending: getOrderispending } = useQuery({
  //   queryKey: ["get-order-id", id],
  //   queryFn: () => GetOrderDetails({ id }),
  // })

  const [initialValues, setInitialValues] = useState({
    address: "",
    city: "",
    pincode: "",
  })

  useEffect(() => {
    if (dummyOrder?.id) {
      // if (getOrder?.data) {
      //   setInitialValues({
      //     id: id,
      //     address: getOrder?.data?.orders[0]?.address,
      //     city: getOrder?.data?.orders[0]?.city,
      //     pincode: getOrder?.data?.orders[0]?.pincode,
      //   })
      // }

      // 🔹 Using dummy order
      setInitialValues({
        
        address: dummyOrder.address,
        city: dummyOrder.city,
        pincode: dummyOrder.pincode,
      })
    }
  }, [dummyOrder?.id])

  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
  })

  const navigate = useNavigate()

  // const { mutate: updatedorder, isPending: updatedorderispending } =
  //   useMutation({
  //     mutationKey: ["update-order"],
  //     mutationFn: OrderUpdate,
  //     onSuccess: (data) => {
  //       if (data?.status) {
  //         toast.success("Order Address Updated successfully!", { ... })
  //         navigate({ to: "/admin/order" })
  //       } else {
  //         toast.error(data?.message || "Something went wrong!", { ... })
  //       }
  //     },
  //     onError: (error) => {
  //       toast.error("An unexpected error occurred.", { ... })
  //     },
  //   })

  const [updatedorderispending, setUpdatedOrderPending] = useState(false)

  const handleSubmit = (values: any) => {
    console.log("Form Data:", values)
    setUpdatedOrderPending(true)

    setTimeout(() => {
      setUpdatedOrderPending(false)
      toast.success("Order Address Updated successfully!", {
        duration: 4000,
        style: { background: "#111", color: "#fff", border: "1px solid #333" },
      })
      navigate({ to: "/admin/order" })
    }, 2000)
    // updatedorder(values, id)
  }

  return (
    <>
      <Header>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <div className="p-6">
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            {/* {getOrderispending ? (
              <Skeleton className="h-10 w-full md:w-1/2" />
            ) : ( */}
            <h1 className="text-2xl font-bold">Update Order Address</h1>
            {/* )} */}
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Address */}
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Address
                      </label>
                      <Field
                        as="textarea"
                        name="address"
                        rows={4}
                        placeholder="Address"
                        className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {errors.address && touched.address && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* City + Pincode */}
                    <div className="grid grid-rows-1">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          City
                        </label>
                        <Field
                          type="text"
                          name="city"
                          placeholder="City"
                          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.city && touched.city && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Pincode
                        </label>
                        <Field
                          type="number"
                          name="pincode"
                          placeholder="Pincode"
                          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.pincode && touched.pincode && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.pincode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end">
                    <Button type="submit" disabled={updatedorderispending}>
                      Update Delivery Address{" "}
                      {updatedorderispending && (
                        <LoaderCircle className="animate-spin" />
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UpdateOrder
