"use client"
import * as React from "react"
import { useState,useEffect } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { deletePlan, getAllPlan, getPlanById } from "@/redux/action/pricingAction"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { updatePlan } from "@/redux/action/pricingAction"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { deleteUser, getAllUser, updateUser } from "@/redux/action/userAction"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}


const formSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, "Role is required"),
});

export const UsersListColumns: ColumnDef<any>[] = [

  {
    id: "userName", // Define a unique ID for the column
    header: "User Name",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return `${firstName} ${lastName}`; // Concatenate firstName and lastName
    },
  },

  {
    accessorKey: "email",
    header: "Email",
 
  },
  // {
  //   accessorKey: "mobile",
  //   header: "Mobile Number",
  // },
  {
    id: 'role', // Explicitly define an ID for the column
    header:"Role" ,
    cell: ({ row }) => {
      return row?.original?.role?.name; // Access planName safely
    },
    
  },

  {
    accessorKey: "icon",
    header: "Icon",
  },
  {
    header:  () => (
      <div style={{ fontWeight: "bold", textAlign: "end", paddingRight: "40px" }}>
        Action
      </div>
    ),
    id: "actions",
    cell: ({ row }) => {
      const planRow = row.original
      const [deleteBox, setDeleteBox] = useState(false)
      const [updatedPlan,setUpdatedPlan] = useState(false)
      const [isHovered, setIsHovered] = useState(false);
      const dispatch = useDispatch<any>();
      const { toast } = useToast();
    
      const { roles, loading } = useSelector((state: any) => state.user);
      console.log(roles,'roles')
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: planRow?.firstName || "",
          lastName: planRow?.lastName || "",
          email: planRow?.email || "",
          role: planRow?.role?._id || "",
        },
      })


  // 2. Define a submit handler.
  async function onSubmit(values) {
console.log('values',values)
   
    const updatedUser = {
      id:planRow?._id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role:values.role,
     
    };
    try{
    
      const response = await dispatch(updateUser( updatedUser));
     if (response.success === true) {
      dispatch(getAllUser('', 1, 10))
      toast({
        description: response.message
      });
      handleClose()
    }
    }catch(e){
      console.log(e)
    }

  }

      const handleClose = () =>{
        setDeleteBox(false);
        setUpdatedPlan(false);
      } 
      
      const handleDelete = () => {
        console.log(planRow,'planRow')
        dispatch(deleteUser(planRow?._id)).then((response: any) => {
          if (response.success === true) {
            toast({
              description: response.message
            });

            setDeleteBox(false)
            dispatch(getAllUser('', 1, 10))
          }
          else {
            toast({
              description: response
            });

          }
        })
      }

      return (
        <>
          <div style={{ display: "flex" ,justifyContent:'right'}}>
            <Button
              variant="ghost"
      
              onClick={() =>{
                setUpdatedPlan(true);
              } }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.3a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z" />
              </svg>

            </Button>
            <Button
              variant="ghost"
              onClick={() => setDeleteBox(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#FF0000" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
              </svg>

            </Button>


          </div>

          <Dialog
        open={updatedPlan}
        onOpenChange={handleClose}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input  placeholder="Enter Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

<FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles?.map((item: any) => (
                    <SelectItem value={item._id}>{item.name}</SelectItem>
                  ))} 
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
                <Button type="submit">Update Plan</Button>
              </form>
            </Form>
        {/* <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button> */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

          <Dialog open={deleteBox} onOpenChange={handleClose}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  Delete Confirmation
                </DialogTitle>
              </DialogHeader>

              <DialogDescription style={{ textAlign: "center", fontSize: "1rem", color: "#555", marginBottom: "1rem" }}>
                Are you sure you want to delete this User?
              </DialogDescription>

              <hr style={{ margin: "1rem 0", border: "0.5px solid #ddd" }} />

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
                <Button
                  onClick={handleDelete}
                  style={{ padding: "0.5rem 1.5rem", fontWeight: "bold",  backgroundColor: isHovered ? '#d81c4a' : '#f8285a',color:'white' }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}  
                >
                  Delete
                </Button>
                <Button
                  onClick={handleClose}
                  variant="secondary"
                  style={{ padding: "0.5rem 1.5rem", fontWeight: "bold",backgroundColor:'lightgray' }}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>

        </>

      )
    },
  },

]
