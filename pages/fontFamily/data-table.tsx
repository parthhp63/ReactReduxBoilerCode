
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { createFontFamily, getAllFontFamily } from "@/redux/action/fontFamilyAction";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// Define validation schema using zod
const formSchema = z.object({
  fontFamilyName: z.string().nonempty("Plan Name is required"),
  plan: z.string().min(1, "Plan Name is required"),

});



// type FormData = z.infer<typeof schema>;



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
  const { allPlans, loading } = useSelector((state: any) => state.plan);

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
      fontFamilyName: '',
      plan: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values, 'values')
    const createdFontFamily = {
      fontFamily: values.fontFamilyName,
      planId: values.plan,
    }
    try {
      const response = await dispatch(createFontFamily(createdFontFamily));
      if (response.success === true) {
        console.log(pageIndex, 'pageIndex after submitt')
        dispatch(getAllFontFamily('', pageIndex+1, 10))
        toast({
          description: response.message
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
          placeholder="Filter Font Family..."
          value={(table.getColumn('fontFamilyName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('fontFamilyName')?.setFilterValue(event.target.value)
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
        <div className="flex  justify-end space-x-2 py-4">
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
    
      </div>
      {/* flex items-center justify-end space-x-2 py-4 */}


      <Dialog
        open={createPlan}

        onOpenChange={handleClose}

      >

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Font Family</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="fontFamilyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Family Name</FormLabel>
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

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
