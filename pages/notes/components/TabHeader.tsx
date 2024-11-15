import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  createNewTab,
  deleteTab,
  getAllTab,
  getTabById,
  updateTab
} from '@/redux/action/dashboardActions/tabAction';
import { getAllNotesList } from '@/redux/action/dashboardActions/noteAction';

import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import './Tab.css';

interface TabHeaderProps {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
}

 export const TabHeader: React.FC<TabHeaderProps> = ({ activeTabId, setActiveTabId }) => {
  const [tabTitle, setTabTitle] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tabLoading, setTabLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showNewTabDialog, setShowNewTabDialog] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [tabToDelete, setTabToDelete] = useState<any>(null);

  const [newTabLabel, setNewTabLabel] = useState('');
  const [tabToRename, setTabToRename] = useState(null); // ID of the tab to rename
  const [newTabName, setNewTabName] = useState(''); // New name for the tab
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const dispatch = useDispatch<any>();
  const [noteLoading, setNoteLoading] = useState(true);

  const { allTabs, loading } = useSelector((state) => state.tab);

  const formSchema = z.object({
    tabTitle: z.string().min(3, 'Tab Name is required')
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tabTitle: ''
    }
  });

  const handleTabChange = (tabId) => {
    console.log('New tab index:', tabId);
    // setActiveTab(newValue);
    // setActiveTabId(allTabs?.tabs[newValue]?._id);
    setActiveTabId(tabId);
  };
  // Fetch tabs on component mount
  useEffect(() => {
    fetchTabs();
  }, []);

  const fetchTabs = async () => {
    await dispatch(getAllTab(1, '')).then((response) => {
      if (response.success) {
        dispatch(getAllTab(1, response?.total));
      }
    });
  };

  const handleCreateTab = async (data) => {
    const bodyData = { tabName: data.tabTitle };
    try {
      await dispatch(createNewTab(bodyData)).then((response) => {
        if (response.success) {
          toast({ description: response.message });
          // when tab is created this is active tab set
          setActiveTab(allTabs?.tabs.length);
          setActiveTabId(response?.data?._id);
          
          fetchTabs();
           // Refresh tabs after creation
          setIsPopupOpen(false);
          form.reset();
        } else {
          toast({
            variant: 'destructive',
            description: response.message || 'Tab  create failed'
          });
        }
      });
    } catch (error) {
      console.error('Error creating tab:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to create tab'
      });
    }
  };

  const handleDeleteTab = async () => {
    if (tabToDelete) {
      await dispatch(deleteTab(tabToDelete)).then((response) => {
        if (response.success) {
          toast({ description: response.message, variant: 'success' });
          fetchTabs(); // Refresh tabs after deletion
          setActiveTab(0);
        } else {
          toast({ description: response.message, variant: 'destructive' });
        }
        setShowDeleteConfirmDialog(false);
        setTabToDelete(null);
      });
    }
  };

  const handleRenameTab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTabName.trim() === '') {
      toast({ description: 'New tab name is required', color: 'error' });
      return;
    }

    if (tabToRename) {
      const bodyData = { tabName: newTabName };
      await dispatch(updateTab(tabToRename, bodyData)).then((response) => {
        if (response.success) {
          fetchTabs(); // Refresh tabs after renaming
          toast({ description: response.message });

          setShowRenameDialog(false);
        } else {
          toast({ description: response.message, color: 'error' });
        }
      });
    }
  };

  /* when Popup closes tab changes then from reset tab  */
  useEffect(() => {
    if (!isPopupOpen) {
      form.reset();
    }
  }, [isPopupOpen]);

  useEffect(() => {
    console.log('Active tab ID:', activeTabId);
    if (activeTabId) {
      dispatch(getTabById(activeTabId));
    }
  }, [activeTabId]);

  //set active tab
  useEffect(() => {
    if (allTabs?.tabs?.length > 0) {
      setActiveTabId(
        allTabs?.tabs[activeTab]?._id
          ? allTabs?.tabs[activeTab]?._id
          : allTabs?.tabs[0]?._id
      );
    } else {
      setActiveTabId('');
    }
  }, [allTabs, activeTab]);

  const onSubmit = (data: any) => {
    handleCreateTab(data);
  };
  console.log('activeTab', activeTabId);

  return (
    <>
      {/* Tabs Display */}
      {/* <div
        className="tabs-footer fixed rounded-md bg-white p-3 opacity-100"
        style={{
          width: '75%',
          position: 'fixed',
          bottom: '25px',
          borderRadius: '10px',
          zIndex: '9'
        }}
      > */}

      <div className="fixed bottom-6 z-10 w-3/4 rounded-md bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="TabScroll flex w-full overflow-auto ">
            <Tabs
              value={activeTabId}
              aria-label="Tabs Example"
              className="flex space-x-4 "
              onValueChange={handleTabChange}
            >
              {allTabs?.tabs.map((tab, index) => (
                <TabsList
                  key={tab._id}
                  className={`flex cursor-pointer items-center space-x-2 rounded-none bg-white text-black shadow-none 
                 ${
                   activeTabId === tab._id
                     ? 'border-b-2 border-[#6C63FF] font-extrabold text-[#6C63FF] shadow-none' // Active tab styles
                     : 'font-normal text-black hover:bg-[#F4F4F9] hover:text-[#6C63FF]' // Non-active tab styles
                 }`}
                >
                  <TabsTrigger
                    value={tab._id}
                    onDoubleClick={() => {
                      setTabToRename(tab._id);
                      setNewTabName(tab.tabName);
                      setShowRenameDialog(true);
                    }}
                    className="rounded-none text-sm shadow-none data-[state=active]:shadow-none"
                  >
                    <span
                      className={`rounded-none text-sm shadow-none
                      ${
                        activeTabId === tab._id
                          ? ' font-semibold text-[#6C63FF] shadow-none' // Active tab styles
                          : 'font-normal text-black' // Non-active tab styles
                      }
                      `}
                    >
                      {tab.tabName}
                    </span>
                  </TabsTrigger>

                  {/* Delete Button */}
                  <Button
                    onClick={() => {
                      setTabToDelete(tab?._id);
                      setShowDeleteConfirmDialog(true);
                    }}
                    className="ml-2  size-6 bg-white p-1 text-[#6C63FF]  shadow-none hover:bg-gray-200 hover:text-black"
                  >
                    <X />
                  </Button>
                </TabsList>
              ))}
            </Tabs>
          </div>

          {/* New Tab Button */}
          <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogTrigger>
              <Button className="text-md hover:bg-[#6C63FF} transform rounded-lg border-r-8 border-[#6C63FF] bg-[#6C63FF] p-5 text-white hover:border-[#6C63FF] hover:text-white">
                + New Tab
              </Button>
            </DialogTrigger>

            {/* Dialog content (modal) */}
            <DialogContent className="w-full max-w-[500px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <DialogTitle>Add New Tab</DialogTitle>
              <DialogDescription>
                Please enter the title for your new tab.
              </DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="tabTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tab Title</FormLabel>
                        <Input
                          {...field}
                          placeholder="Enter tab title"
                          className="h-12 w-full rounded-md border border-gray-300 p-2 pr-10 transition focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                          style={{
                            marginBottom: '20px',
                            padding: '12px 16px',
                            fontSize: '16px'
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: '#7367F0',
                        color: '#fff',
                        padding: '8px 16px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        transition: 'background-color 0.3s ease'
                      }}
                      className="hover:bg-[#675CD8]"
                    >
                      Create Tab
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmDialog && (
        <Dialog
          open={showDeleteConfirmDialog}
          onOpenChange={setShowDeleteConfirmDialog}
        >
          <DialogContent>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tab?
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteTab}
                className="bg-red-600 text-white  hover:border-red-600 hover:bg-white hover:text-red-600"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rename Tab Dialog */}
      {showRenameDialog && (
        <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
          <DialogContent className="w-full max-w-[500px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <DialogTitle>Rename Tab</DialogTitle>
            <DialogDescription>
              Please rename the title for your tab.
            </DialogDescription>

            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="tabTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tab Title</FormLabel>
                      <Input
                        {...field}
                        value={newTabName} // Bind the input value to `newTabName`
                        onChange={(e) => setNewTabName(e.target.value)}
                        placeholder="Enter tab title"
                        className="h-12 w-full rounded-md border border-gray-300 p-2 pr-10 transition focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                        style={{
                          marginBottom: '20px',
                          padding: '12px 16px',
                          fontSize: '16px'
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleRenameTab}
                    style={{
                      backgroundColor: '#7367F0',
                      color: '#fff',
                      padding: '8px 16px',
                      fontSize: '14px',
                      borderRadius: '8px',
                      transition: 'background-color 0.3s ease'
                    }}
                    className="hover:bg-[#675CD8]"
                  >
                    Rename Tab
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
