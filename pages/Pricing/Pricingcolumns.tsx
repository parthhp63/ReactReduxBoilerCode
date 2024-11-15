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
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}


const formSchema = z.object({
  planName: z.string().min(1, "Plan Name is required"),
  price: z.preprocess(
    (val) => val === '' ? undefined : Number(val),
    z.number().positive("Monthly Price must be a positive number")
  ),
  yearlyPrice: z.preprocess(
    (val) => val === '' ? undefined : Number(val),
    z.number().positive("Yearly Price must be a positive number")
  ),
  tabsLimit: z.preprocess(
    (val) => val === '' ? undefined : Number(val),
    z.number().positive("Tabs Limit must be a positive number")
  ),
  notesLimit: z.preprocess(
    (val) => val === '' ? undefined : Number(val),
    z.number().positive("Notes Limit must be a positive number")
  ),
  defaultColor: z.boolean().default(false).optional(),
  customization: z.boolean().default(false).optional(),
  prioritySupport: z.boolean().default(false).optional(),
});

// export const Pricingcolumns: ColumnDef<Payment>[] = [
  interface pricingColumnProps {
    pageIndex?: number;  // Make pageIndex optional
  }
  
  
  
  // export const FontSizecolumns: ColumnDef<Payment>[] = [
    export const Pricingcolumns = ({ pageIndex }: pricingColumnProps): ColumnDef<any>[] => [
  {
    accessorKey: "planName",
    header: "Plan Name",
  },

  {
    accessorKey: "price",
    header: "Monthly Price"
  },
  {
    accessorKey: "yearlyPrice",
    header: "Yearly Price",
  },
  {
    accessorKey: "tabsLimit",
    header: "Tabs Limit",
  },
  {
    accessorKey: "notesLimit",
    header: "Notes Per Tab",
  },
  {
    accessorKey: "defaultColor",
    header: "Default Color",
  },
  {
    accessorKey: "customization",
    header: "Customization",
  },
  {
    accessorKey: "prioritySupport",
    header: "Priority Support",
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
      const [loading, setLoading] = useState(false);
      const [isHovered, setIsHovered] = useState(false);
      const dispatch = useDispatch<any>();
      const { toast } = useToast();
    

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          planName: planRow?.planName || "",
          price: planRow?.price || "",
          yearlyPrice: planRow?.yearlyPrice || "",
          tabsLimit: planRow?.tabsLimit || "",
          notesLimit: planRow?.notesLimit || "",
          defaultColor: planRow?.defaultColor || false,
          customization: planRow?.customization || false,
          prioritySupport: planRow?.prioritySupport || false,
        },
      })


  // 2. Define a submit handler.
  async function onSubmit(values) {
    const currentPage = pageIndex? pageIndex+1 : 1;

   
    const updatedPlans = {
      id:planRow?._id,
      planName: values.planName,
      price: values.price,
      yearlyPrice: values.yearlyPrice,
      tabsLimit: values.tabsLimit,
      notesLimit: values.notesLimit,
      defaultColor: values.defaultColor,
      customization: values.customization,
      prioritySupport: values.prioritySupport,
    };
    try{
    
      const response = await dispatch(updatePlan( updatedPlans));
     if (response.success === true) {
      dispatch(getAllPlan('', currentPage, 10))
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
      const currentPage = pageIndex? pageIndex+1 : 1;

        dispatch(deletePlan(planRow?._id)).then((response: any) => {
          if (response.success === true) {
            toast({
              description: response.message
            });

            setDeleteBox(false)
            dispatch(getAllPlan('', currentPage, 10))
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
            <DialogTitle>Update Plan</DialogTitle>
            <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="planName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter plan name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter monthly price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearlyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Yearly Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter yearly price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tabsLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tabs Limit</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter tabs limit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notesLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes Limit</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter notes limit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defaultColor"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Default Color</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customization"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Customization</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prioritySupport"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Priority Support</FormLabel>
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
        

              <DialogDescription style={{ textAlign: "center", fontSize: "1rem", color: "#555", marginBottom: "1rem" }}>
                Are you sure you want to delete this plan?
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
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </>

      )
    },
  },

]
