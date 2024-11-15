
import { useEffect, useState } from "react"
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { createFontSize, getAllFontSize } from "@/redux/action/fontSizeAction";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAllFontFamily } from "@/redux/action/fontFamilyAction";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// Define validation schema using zod
const formSchema = z.object({
  fontName: z.string().min(1, "Font Name is required"),
  fontSize: z.string().min(1, "Font  Size is required"),
  plan: z.string().min(1, "Plan Name is required"),

});



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
  const [updateValue, setUpdateValue] = useState(false);
  const dispatch = useDispatch<any>();
  const { allPlans } = useSelector((state: any) => state.plan);
  const { allFontSize } = useSelector((state: any) => state.fontSize);

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


  const handleCreateClick = () => {
    setUpdateValue(true);
    setCreatePlan(true);
  };


  const handleClose = () => {
    setCreatePlan(false);
    form.reset();
  };
  useEffect(() => {
    if (updateValue) {
      dispatch(getAllFontSize('', 1, 1000))
      setUpdateValue(false);
    }
  }, [dispatch, updateValue]);



  const availableFontSizes = Array.from({ length: 24 }, (_, i) => (i + 1) * 4);

  // Extract existing font sizes from the API data
  const existingFontSizes = allFontSize?.fontSizes.map(font => parseInt(font.fontSize, 10)) || [];

  // Filter out existing font sizes from available options
  const fontSize = availableFontSizes.filter(size => !existingFontSizes.includes(size));




  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fontName: '',
      fontSize: '',
      plan: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const createdFont = {
      fontName: values.fontName,
      fontSize: values.fontSize,
      planId: values.plan,
    }
    try {
      const response = await dispatch(createFontSize(createdFont));
      if (response.success === true) {

        dispatch(getAllFontSize('', pageIndex+1, 10))
        toast({
          description: response.message
        });
        form.reset()
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
          placeholder="Filter Font Size..."
          value={(table.getColumn("fontName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fontName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          aria-label="Go to first page"
          variant="outline"
          style={{ marginLeft: "auto", backgroundColor: "#7367F0", color: "white", width: '120px', fontWeight: 'bold' }}
          // onClick={() => {
          //   setUpdateValue(true)
          //   setCreatePlan(true);
          // }}
          onClick={handleCreateClick}
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
              <TableRow key={headerGroup.id}  >
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
                  No results.
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Font Size</DialogTitle>
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

                  {/* <FormField
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
                  /> */}

                  <FormField
                    control={form.control}
                    name="fontSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Size</FormLabel>
                        <Select
                          value={field.value || fontSize[0].toString()} // Ensure field.value is correctly synced with the form state
                          onValueChange={(value) => {
                            field.onChange(value);  // Ensure the form state is updated on selection
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select Font Size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fontSize?.map((item: number) => (
                              <SelectItem key={item} value={item.toString()}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

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
