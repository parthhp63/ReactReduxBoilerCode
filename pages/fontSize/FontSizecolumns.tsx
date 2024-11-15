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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
import { deleteFontSize, getAllFontSize, updateFontSize } from "@/redux/action/fontSizeAction"
export type Payment = {
  fontName: string
  fontSize: number
  Action:any
  planName: string
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formSchema = z.object({
  fontName: z.string().min(1, "Font Size Name is required"),
  fontSize: z.string().min(1, "Font Size is required"),
  plan: z.string().min(1, "Plan Name is required"),

});

// const validationSchema = Yup.object<FormValues>({
//   FontSizeName: Yup.string().required('Font size  Name is required'),
//   FontSizeValue: Yup.number().required('Font SIze is required').positive('Must be a positive number'),
//   planName: Yup.string().required('Plan Name is required'),
// });

interface FontSizeColumnProps {
  pageIndex?: number;  // Make pageIndex optional
}



// export const FontSizecolumns: ColumnDef<Payment>[] = [
  export const FontSizecolumns = ({ pageIndex }: FontSizeColumnProps): ColumnDef<any>[] => [


  {
    accessorKey: "fontName",
    header: "Font Size Name",
  },

  {
    accessorKey: "fontSize",
    header: "Font Size",
  },

  {
    id: 'planName', // Explicitly define an ID for the column
    header:"Plan Name" ,
    cell: ({ row }) => {
      return row?.original?.planId?.planName; // Access planName safely
    },
    
  },


  {
    header: () => (
      <div style={{ fontWeight: "bold", textAlign: "end", paddingRight: "40px" }}>
        Action
      </div>
    ),
    id: "actions",
    cell: ({ row }) => {
      const planRow = row.original
      const [deleteBox, setDeleteBox] = useState(false)
      const [updatedPlan,setUpdatedPlan] = useState(false)
      // const [loading, setLoading] = useState(false);
      const [isHovered, setIsHovered] = useState(false);
      const dispatch = useDispatch<any>();
      const { toast } = useToast();
      const { allPlans, loading } = useSelector((state: any) => state.plan);
console.log(row,'rowwwww')
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fontName: planRow?.fontName,
          fontSize: planRow?.fontSize ,
          plan: planRow?.planId?._id,
        },
      })


  // 2. Define a submit handler.
  async function onSubmit(values) {

   
    const updatedFonts = {
      id:planRow?._id,
      fontName: values.fontName,
      fontSize: planRow?.fontSize ,
      planId:values.plan,
    };
    try{
      const currentPage = pageIndex? pageIndex+1 : 1;
    
      const response = await dispatch(updateFontSize( updatedFonts));
     if (response.success === true) {
      dispatch(getAllFontSize('',currentPage, 10))
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

        dispatch(deleteFontSize(planRow?._id)).then((response: any) => {
          if (response.success === true) {
            toast({
              description: response.message
            });

            setDeleteBox(false)
            dispatch(getAllFontSize('', currentPage, 10))
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
          <div style={{ display: "flex" ,justifyContent:'right'}} >
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
                    name="fontName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Name</FormLabel>
                        <FormControl>
                          <Input placeholder="xxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fontSize"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Size</FormLabel>
                        <FormControl>
                          <Input placeholder="xxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


<FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allPlans?.plans?.map((item: any) => (
                    <SelectItem value={item._id}>{item.planName}</SelectItem>
                  ))} 
                  
                </SelectContent>
              </Select>
          
              <FormMessage />
            </FormItem>
          )}
        />

                
                  <Button type="submit">Submit</Button>
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
                Are you sure you want to delete this Font Size?
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
