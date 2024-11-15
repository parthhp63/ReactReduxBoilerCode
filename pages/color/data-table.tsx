import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  createPlanPricing,
  getAllPlan
} from '../../redux/action/pricingAction';
import { useDispatch } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { createColor, getAllcolor } from '@/redux/action/colorAction';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import PaginationSection from '@/components/shared/pagination-section';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
}

// Define validation schema using zod
const formSchema = z.object({
  colorName: z.string().nonempty('Color Name is required'),
  colorValue: z
    .string()
    .regex(
      /^#([0-9A-F]{3}){1,2}$/i,
      'Invalid color code. Must be a valid hex color like #FFFFFF or #FFF'
    )
    .nonempty('Color is required')
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
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [createdColor, setCreatedColor] = useState(false);
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
  });

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex); // Update page index
    // fetchData(newPageIndex, pageSize); // Fetch new data based on the new page index
  };

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
    setCreatedColor(false);
  };
  const status = ['active', 'inactive']
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colorName: '',
      colorValue: '#ffffff' // default color
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values);
    const color = {
      colorName: values.colorName,
      colorCode: values.colorValue
    };
    try {
      const response = await dispatch(createColor(color));
      if (response.success === true) {
        dispatch(getAllcolor('', pageIndex+1, 10, status));
        toast({
          description: response.message
        });
        form.reset();
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Colors..."
          value={
            (table.getColumn('colorName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('colorName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          aria-label="Go to first page"
          variant="outline"
          className="ml-auto bg-[#7367F0] text-white hover:border-[#7367F0] hover:bg-white hover:text-[#7367F0] focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
          onClick={() => setCreatedColor(true)}
          // disabled={!table.getCanPreviousPage()}
        >
          Create New
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader style={{
            backgroundColor:' #EAE8FD',
            fontSize:'15px',
            color:'grey',
            fontWeight:'bolder',
            height:'54px'
          }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} > 
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{fontWeight:'bold'}}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody style={{color:'grey', fontWeight:'bold'}}>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results.</TableCell>
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
   

      <Dialog open={createdColor} onOpenChange={() => setCreatedColor(false)}>
        <DialogContent className="max-w-md rounded-lg bg-white p-8 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Create Color
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Add a new color with a name and hex code.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="colorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Color Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter color name"
                        {...field}
                        className="border-gray-300 focus:border-[#7367F0] focus:ring-[#7367F0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="colorValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">
                        Color Value
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter color value"
                          {...field}
                          className="border-gray-300 transition focus:border-[#7367F0]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-8 flex h-10 w-14 items-center justify-center overflow-hidden">
                  <input
                    type="color"
                    {...form.register('colorValue')}
                    value={form.watch('colorValue')}
                    onChange={(e) =>
                      form.setValue('colorValue', e.target.value)
                    }
                    className="h-full w-full cursor-pointer border-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="mt-4 border-2 border-[#7367F0] bg-[#7367F0] text-white transition-all duration-300 hover:border-2 hover:border-[#5a4fe7] hover:bg-white hover:text-[#7367F0] focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
