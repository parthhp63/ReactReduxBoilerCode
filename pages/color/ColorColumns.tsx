
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  deleteColor,
  getAllcolor,
  updateColor
} from '@/redux/action/colorAction';
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

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

interface colorColumnProps {
  pageIndex?: number;  // Make pageIndex optional
}

// export const ColorColumns: ColumnDef<any>[] = [
  export const ColorColumns = ({ pageIndex }: colorColumnProps): ColumnDef<any>[] => [
  {
    accessorKey: 'colorName',
    header: 'Name'
  },

  {
    id: 'colorCode',
    header: 'Value',
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>{row?.original?.colorCode}</span>
        <span
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: row?.original?.colorCode,
            border: '1px solid #ccc'
          }}
        ></span>
      </div>
    )
  },

  {
    header: () => (
      <div style={{ fontWeight: "bold", textAlign: "end", paddingRight: "40px" }}>
        Action
      </div>
    ),
    id: 'actions',
    cell: ({ row }) => {
      const planRow = row.original;
      console.log(row,'row')
      const [deleteBox, setDeleteBox] = useState(false);
      const [updatedColor, setUpdatedColor] = useState(false);
      const [isHovered, setIsHovered] = useState(false);
      const dispatch = useDispatch<any>();
      const { toast } = useToast();
      const [enabled, setEnabled] = useState(false);
      const [isChecked, setIsChecked] = useState(row?.original?.status === "active");
      const status = ['active', 'inactive']
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          colorName: planRow?.colorName || '',
          colorValue: planRow?.colorCode || ''
        }
      });
      // 2. Define a submit handler.
      async function onSubmit(values) {
        const currentPage = pageIndex? pageIndex+1 : 1;

        const updatedColor = {
          id: planRow?._id,
          colorName: values?.colorName,
          colorCode: values?.colorValue
        };
        try {
          const response = await dispatch(updateColor(updatedColor));
          if (response.success === true) {
            dispatch(getAllcolor('', currentPage, 10, status));
            toast({
              description: response.message
            });
            handleClose();
          }
        } catch (e) {
          console.log(e);
        }
      }

      const handleClose = () => {
        setDeleteBox(false);
        setUpdatedColor(false);
      };

      const handleDelete = () => {
      const currentPage = pageIndex? pageIndex+1 : 1;

        dispatch(deleteColor(planRow?._id)).then((response: any) => {
          if (response.success === true) {
            toast({
              description: response.message
            });

            setDeleteBox(false);
            dispatch(getAllcolor('', currentPage, 10,status));
          } else {
            toast({
              description: response
            });
          }
        });
      };

      const handleToggle = () => {
        const currentPage = pageIndex? pageIndex+1 : 1;
        const newStatus = isChecked ? "inactive" : "active";
        setIsChecked(!isChecked);
    console.log('rowwwwww----',row)
        const updateStatus = {
          id: row?.original?._id,
          status: newStatus,
        };
    
        dispatch(updateColor(updateStatus)).then((response: any) => {
          if (response.success) {
            toast({
              description: response.message
            });
            dispatch(getAllcolor('', currentPage, 10,status));
          } else {
            // Revert the toggle if the API call fails
            setIsChecked(isChecked);
            toast({
              description: response.message
            })
          }
        });
      };

      return (
        <>
          <div style={{  display: "flex" ,justifyContent:'right' }}>
            <Button
              variant="ghost"
              onClick={() => {
                setUpdatedColor(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.3a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z" />
              </svg>
            </Button>
            <Button variant="ghost" onClick={() => setDeleteBox(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FF0000"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                />
              </svg>
            </Button>
            <div
      onClick={handleToggle}
      className={`relative inline-flex items-center h-6 w-12 cursor-pointer transition-colors rounded-full ${
        isChecked ? "bg-purple-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
          isChecked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
            {/* <div
      onClick={handleToggle}
      className={`relative inline-flex items-center h-6 w-12 cursor-pointer transition-colors rounded-full ${
        enabled ? "bg-purple-500" : "bg-purple-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div> */}
      {/* <div className="flex items-center space-x-2">
      <Switch id="airplane-mode"
                      onChange={onChange(row)} />
   
    </div> */}
          </div>

          <Dialog open={updatedColor} onOpenChange={handleClose}>
            <DialogContent className="max-w-md rounded-lg bg-white p-8 shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Update Color
                </DialogTitle>
                <DialogDescription>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="colorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter color name"
                                {...field}
                                className="border-gray-300 transition focus:border-[#7367F0]"
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
                              <FormLabel>Color Value</FormLabel>
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
                        Update
                      </Button>
                    </form>
                  </Form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteBox} onOpenChange={handleClose}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Delete Confirmation
                </DialogTitle>
              </DialogHeader>

              <DialogDescription className="text-center text-base text-gray-600">
                Are you sure you want to delete this Color?
              </DialogDescription>

              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={handleDelete}
                  className="bg-red-500 text-white hover:bg-red-900  "
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Delete
                </Button>
                <Button
                  onClick={handleClose}
                  variant="secondary"
                  style={{
                    padding: '0.5rem 1.5rem',
                    fontWeight: 'bold',
                    backgroundColor: 'lightgray'
                  }}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    }
  }
];
