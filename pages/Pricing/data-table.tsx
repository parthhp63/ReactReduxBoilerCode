"use client"
import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from "@/components/ui/checkbox"
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
import { createPlanPricing, getAllPlan } from "../../redux/action/pricingAction";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// Define validation schema using zod
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



type FormData = z.infer<typeof schema>;



export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageSize,
  totalPages,
  totalRecords,
  setPageIndex,
  setPageSize
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [createPlan, setCreatePlan] = useState(false);

  const dispatch = useDispatch<any>();
  const { toast } = useToast();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, pagination: { pageIndex, pageSize } },
    manualPagination: true,
    pageCount: Math.ceil(totalRecords / pageSize)
  })

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleClose = () => {
    setCreatePlan(false);
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {

    const createdPlan = {
      planName: values.planName,
      price: values.price,
      yearlyPrice: values.yearlyPrice,
      tabsLimit: values.tabsLimit,
      notesLimit: values.notesLimit,
      defaultColor: values.defaultColor,
      customization: values.customization,
      prioritySupport: values.prioritySupport,
    }
    try {
      const response = await dispatch(createPlanPricing(createdPlan));
      if (response.success === true) {

        dispatch(getAllPlan('', pageIndex + 1, 10))
        toast({
          description: res.message
        });
        handleClose()
      }
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Plans..."
          value={(table.getColumn("planName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("planName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          aria-label="Go to first page"
          variant="outline"
          style={{ marginLeft: "auto", backgroundColor: "#7367F0", color: "white", width: '120px', fontWeight: 'bold' }}
          onClick={() => setCreatePlan(true)}
        // disabled={!table.getCanPreviousPage()}
        >
          Create New
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader style={{
            backgroundColor: ' #EAE8FD',
            fontSize: '15px',
            color: 'grey',
            fontWeight: 'bolder',
            height: '54px'
          }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ fontWeight: 'bold' }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody style={{ color: 'grey', fontWeight: 'bold' }}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>


      <Dialog
        open={createPlan}

        onOpenChange={handleClose}

      >

        <DialogContent className="max-w-md rounded-lg bg-white p-8 shadow-lg" >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Create Plan</DialogTitle>
            <DialogDescription>
            <div  className="max-h-[80vh] overflow-y-auto p-8"
          style={{
            scrollbarWidth: 'thin', 
          }}> 
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="planName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800">Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="xxx" {...field} className="border-gray-300 focus:border-[#7367F0] focus:ring-[#7367F0]" />
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
                          <Input type="number" placeholder="xxx" className="border-gray-300 focus:border-[#7367F0] focus:ring-[#7367F0]" {...field} />
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
                          <Input type="number" placeholder="xxx" className="border-gray-300 focus:border-[#7367F0] focus:ring-[#7367F0]" {...field} />
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
                          <Input type="number" placeholder="xxx" className="border-gray-300 focus:border-[#7367F0] focus:ring-[#7367F0]" {...field} />
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
                          <Input type="number" placeholder="xxx" className="border-gray-300 focus:border-[#7367F0] focus:ring-[#7367F0]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="defaultColor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="form-checkbox h-5 w-5 text-[#7367F0] border-gray-300 focus:ring-0"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Default Color
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
<FormField
  control={form.control}
  name="customization"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          className="form-checkbox h-5 w-5 accent-[#7367F0] border-gray-300 focus:ring-0" // Adjusts the size, color, and removes focus ring
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>
          Customization
        </FormLabel>
      </div>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="prioritySupport"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          className="form-checkbox h-5 w-5 text-[#7367F0] border-gray-300 focus:ring-0 checked:bg-[#7367F0]"
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>
          Priority Support
        </FormLabel>
      </div>
    </FormItem>
  )}
/>
                  <Button type="submit"  className="mt-4 border-2 border-[#7367F0] bg-[#7367F0] text-white transition-all duration-300 hover:border-2 hover:border-[#5a4fe7] hover:bg-white hover:text-[#7367F0] focus:outline-none focus:ring-2 focus:ring-[#7367F0]">Submit</Button>
                </form>
              </Form>
              {/* <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px' }}>
      <TextFields label="Plan Name" name="planName" register={register} error={errors.planName?.message} />
      <TextFields label="Monthly Price" name="price" type="number" register={register} error={errors.price?.message} />
      <TextFields label="Yearly Price" name="yearlyPrice" type="number" register={register} error={errors.yearlyPrice?.message} />

   
      <fieldset style={{ margin: '1em 0' }}>
        <legend>Tabs Limit</legend>
        <label>
          <input type="radio" value="limited" {...register("tabsOption")} />
          Limited
        </label>
        <label>
          <input type="radio" value="infinite" {...register("tabsOption")} />
          Infinite
        </label>
        {tabsOption === "limited" && (
          <TextFields label="Tabs Limit" name="tabsLimit" type="number" register={register} error={errors.tabsLimit?.message} />
        )}
      </fieldset>

      <fieldset style={{ margin: '1em 0' }}>
        <legend>Notes Per Tab</legend>
        <label>
          <input type="radio" value="limited" {...register("notesOption")} />
          Limited
        </label>
        <label>
          <input type="radio" value="infinite" {...register("notesOption")} />
          Infinite
        </label>
        {notesOption === "limited" && (
          <TextField label="Notes Limit" name="notesLimit" type="number" register={register} error={errors.notesLimit?.message} />
        )}
      </fieldset>

      
      <div className="form-group mb-5">
        <Checkbox label="Default Color" name="defaultColor" register={register} />
        <Checkbox label="Customization" name="customization" register={register} />
        <Checkbox label="Priority Support" name="prioritySupport" register={register} />
      </div>

      
      <Button type="submit" style={{ marginTop: '20px', width: '100%' }}>
        Create Plan
      </Button>
    </form> */}
    </div>
            </DialogDescription>
            
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
