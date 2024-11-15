
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button.js';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ModeToggle } from '@/components/shared/theme-toggle';
import { getAllcolor } from '@/redux/action/colorAction';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getAllFontSize } from '@/redux/action/fontSizeAction';
import { Badge } from '@/components/ui/badge';
import { getUserAsync } from '@/redux/action/authAction';
import { Loader } from '@/components/ui/loader';
import { useRouter } from '@/routes/hooks';
import { getAllFontFamily } from '@/redux/action/fontFamilyAction';
import { HexColorPicker } from 'react-colorful';
import './Note.css';
import RichTextEditor from './Editor';
import { createNewNote } from '@/redux/action/dashboardActions/noteAction';
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface NoteHeaderProps {
  activeTabId: string;
}

export const NoteHeader: React.FC<NoteHeaderProps> = ({ activeTabId}) => {

  // Disable the save button if any of the required fields is empty
  const [noteTitle, setNoteTitle] = useState('');
  const [noteColor, setNoteColor] = useState('#000000');
  const [titleColor, setTitleColor] = useState('#000000');

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(false);
  const [isFamilyDialogOpen, setIsFamilyDialogOpen] = useState(false);
  const { allColors } = useSelector((state: any) => state.color);
  const { allFontSize } = useSelector((state: any) => state.fontSize);
  const { allFontFamily } = useSelector((state: any) => state.fontFamily);
  const dispatch = useDispatch<any>();
  const [isPlan, setIsPlan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteData, setNoteData] = useState(null);
  const router = useRouter();
  const isSaveDisabled = !noteTitle || !noteColor || !noteData;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
    // setNoteColor(e.target.value);
  };

  const handleOpenDialog = () => {
    setIsPopupOpen(true);
  };
  const handleSizeDialog = () => {
    setIsSizeDialogOpen(true);
  };

  const handleFamilyDialog = () => {
    setIsFamilyDialogOpen(true);
  };

  const handleCloseFontSizeDialog = () => {
    setIsSizeDialogOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  useEffect(() => {
    // Fetch initial 10 colors
    dispatch(getAllcolor('', 1, 1000)).then((response: any) => {
      if (response.success === true) {
        // Fetch all colors if needed
      }
    });
  }, [dispatch]);

  console.log('allColors', allColors);

  useEffect(() => {
    dispatch(getAllFontSize('', 1, 1000)).then((response: any) => {
      // if (response.success === true) {
      //   // Fetch all font sizes if needed
      // }
    });
  }, [dispatch]);

  console.log('allFontSize', allFontSize);

  useEffect(() => {
    dispatch(getAllFontFamily('', 1, 1000)).then((response: any) => {
      // if (response.success === true) {
      //   // Fetch all font sizes if needed
      // }
    });
  }, [dispatch]);

  console.log('allFontFamily', allFontFamily);

  const fontFamilies = allFontFamily?.fontFamilies
    .map((font: any) => font.fontFamily)
    .join('&family=');

  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;

  const handleFontSizeClick = (fontSize: any) => {
    // check according to Plan
    if (fontSize?.planId?._id === user?.plan?.planId?._id) {
      console.log('fontSize', fontSize);
    } else {
      console.log('User does not have the required plan');
      setIsPlan(true);
    }
  };

  const handleFontFamilyClick = (fontFamily: any) => {
    // check according to Plan
    if (fontFamily?.planId?._id === user?.plan?.planId?._id) {
      console.log('fontFamily', fontFamily);
    } else {
      console.log('User does not have the required plan');
      setIsPlan(true);
    }
  };

  const handleCloseFontFamilyDialog = () => {
    setIsFamilyDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);

  console.log('user?.plan?.planId?._id', user?.plan?.planId?._id);

  const handleUpdatePlan = () => {
    // Redirect to plan upgrade page
    // setIsPlan(false);
    console.log('Redirect to plan upgrade page');
    setLoading(true);
    router.push('/subscription');
  };

  console.log('dataaa', noteData);
  return (
    <>
      <link href={googleFontsUrl} rel="stylesheet" />
      <div
        className="tabs-header rounded-md p-4 opacity-100"
        style={{
          width: '100%',
          borderRadius: '10px',
          backgroundColor: 'var(--bg-color)' // Dynamic background color for light/dark mode
        }}
      >
        <div className="flex items-center space-x-4">
          {/* Tooltip Button for Adding Notes */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  style={{ cursor: 'pointer' }}
                  onClick={handleOpenDialog}
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"
                    fill="#7367F0" // Dynamic fill color for light/dark mode
                  />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Notes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Tooltip Button for Adding Size */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  style={{ cursor: 'pointer' }}
                  onClick={handleSizeDialog}
                >
                  <path
                    d="M.99 19h2.42l1.27-3.58h5.65L11.59 19h2.42L8.75 5h-2.5zm4.42-5.61L7.44 7.6h.12l2.03 5.79zM20 11h3v2h-3v3h-2v-3h-3v-2h3V8h2z"
                    fill="#7367F0" // Dynamic fill color for light/dark mode
                  />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Tooltip Button for Adding Family */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  style={{ cursor: 'pointer' }}
                  onClick={handleFamilyDialog}
                >
                  <path
                    d="M9 4v3h5v12h3V7h5V4zm-6 8h3v7h3v-7h3V9H3z"
                    fill="#7367F0" // Dynamic fill color for light/dark mode
                  />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Family</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Dialog for Adding a New Note */}
          <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogContent className="w-full max-w-[600px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <DialogTitle>Add New Note</DialogTitle>
              <DialogDescription>
                Please enter the note for your tab.
              </DialogDescription>

              <div>
                <Label htmlFor="noteTitle">Note Title</Label>
                <Input
                  type="text"
                  value={noteTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Note title"
                  className="h-12 w-full rounded-md border border-gray-300 p-2 pr-10 focus:border-[#675CD8] focus:ring-2 focus:ring-[#5a53b1] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                {/* Note Color Selector */}
                <Label
                  htmlFor="noteColor"
                  className="mb-2 text-lg font-semibold text-gray-700 dark:text-white"
                >
                  Color
                </Label>
                <div>
                  <HexColorPicker color={noteColor} onChange={setNoteColor} />
                </div>

                {/* RichTextEditor for note content */}
                <RichTextEditor setNoteData={setNoteData} />

                {/* Dialog Footer with Cancel and Create Buttons */}
                <DialogFooter className="space-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => setIsPopupOpen(false)}
                    className="rounded-md bg-[#f44336] p-2 text-white hover:bg-[#e53935]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setIsPopupOpen(false);
                      const userData = {
                        title: noteTitle,
                        tabId: activeTabId,
                        description: noteData,
                        titleColor:titleColor,
                         noteColor:noteColor
                      };
                      
                      dispatch(createNewNote(userData));
                    }}
                    disabled={isSaveDisabled} // Disable button if conditions are not met
                    className={`rounded-md p-2 text-white ${isSaveDisabled ? 'bg-gray-400' : 'bg-[#7367F0] hover:bg-[#675CD8]'}`}
                  >
                    Create Note
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog for  Fetch FontSize */}
          <Dialog open={isSizeDialogOpen} onOpenChange={setIsSizeDialogOpen}>
            <DialogContent className="w-full max-w-[900px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <DialogTitle className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Choose Your Text Size
              </DialogTitle>
              <DialogDescription className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Select a font size that suits your preference. Sizes are based
                on your plan.
              </DialogDescription>

              {/* Font Sizes List */}
              <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {allFontSize?.fontSizes?.length > 0 &&
                  allFontSize.fontSizes.map((fontSize, index) => (
                    <div
                      key={index}
                      // className={`relative flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-4 transition duration-200 opacity-100 hover:scale-105  hover:border-gray-300 hover:bg-gray-100 ${
                      //   fontSize?.planId?._id === user?.plan?.planId?._id
                      //     ? ' opacity-100 hover:scale-105  hover:border-gray-300 hover:bg-gray-100'
                      //     : 'cursor-not-allowed opacity-50'
                      // }`}
                      className={`relative flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-4 opacity-100 transition duration-200 hover:scale-105  hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-gray-300 dark:hover:bg-gray-700 
                     `}
                      onClick={() =>
                        // fontSize?.planId?._id === user?.plan?.planId?._id &&
                        handleFontSizeClick(fontSize)
                      }
                    >
                      {/* Font Name with Size Preview */}
                      <p
                        className="text-gray-800 dark:text-gray-200"
                        style={{
                          fontSize: `${Math.min(fontSize?.fontSize, 28)}px`,
                          lineHeight: '1.2em',
                          maxHeight: '2.4em',
                          overflow: 'hidden'
                        }}
                      >
                        {capitalizeFirstLetter(fontSize?.fontName)}
                      </p>

                      {/* Plan Badge */}
                      <span
                        className="absolute right-2 top-2 rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        style={{
                          backgroundColor:
                            fontSize?.planId?.planName?.toLowerCase() ===
                              'basic'
                              ? '#6d747a'
                              : fontSize?.planId?.planName?.toLowerCase() ===
                                'standard'
                                ? '#00c2e0'
                                : fontSize?.planId?.planName?.toLowerCase() ===
                                  'enterprise'
                                  ? '#52a028'
                                  : '#f5a623',
                          color: 'white'
                        }}
                      >
                        {capitalizeFirstLetter(fontSize?.planId?.planName)}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Footer with Close Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleCloseFontSizeDialog}
                  className="rounded bg-[#7367F0] px-5 py-2 text-sm text-white hover:border-[#7367F0] hover:bg-white hover:text-[#7367F0] focus:outline-none focus:ring-2  focus:ring-[#7367F0] dark:bg-gray-800 dark:text-white dark:hover:border-gray-800 dark:hover:bg-white dark:hover:text-gray-800 dark:focus:ring-gray-800" // Dynamic colors for light/dark mode
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog for  Fetch Font Family */}

          <Dialog
            open={isFamilyDialogOpen}
            onOpenChange={setIsFamilyDialogOpen}
          >
            <DialogContent className="h-auto w-full max-w-[1000px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <DialogTitle className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Choose Your Text Style
              </DialogTitle>
              <DialogDescription className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Select a font family that suits your preference. Sizes are based
                on your plan.
              </DialogDescription>

              {/* Font Family List */}
              <div className="noteScroll grid h-full max-h-[600px] grid-cols-1 gap-6 overflow-y-scroll p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                {allFontFamily?.fontFamilies?.length > 0 &&
                  allFontFamily.fontFamilies.map((fontfamily, index) => (
                    <div
                      key={index}
                      className={`relative flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-4 opacity-100 transition duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-gray-300 dark:hover:bg-gray-700`}
                      onClick={() => handleFontFamilyClick(fontfamily)}
                    >
                      {/* Font Name with Size Preview */}
                      <p
                        className="text-gray-800 dark:text-gray-200" // Dynamic text color for light/dark mode
                        style={{
                          fontFamily: `${fontfamily?.fontFamily}, sans-serif`,
                          color: 'gray'
                        }}
                      >
                        {capitalizeFirstLetter(fontfamily?.fontFamily)}
                      </p>

                      {/* Plan Badge */}
                      <span
                        className="absolute right-2 top-2 rounded-full px-3 py-1 text-xs text-white"
                        style={{
                          backgroundColor:
                            fontfamily?.planId?.planName?.toLowerCase() ===
                              'basic'
                              ? '#6d747a'
                              : fontfamily?.planId?.planName?.toLowerCase() ===
                                'standard'
                                ? '#00c2e0'
                                : fontfamily?.planId?.planName?.toLowerCase() ===
                                  'enterprise'
                                  ? '#52a028'
                                  : '#f5a623'
                        }}
                      >
                        {capitalizeFirstLetter(fontfamily?.planId?.planName)}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Footer with Close Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleCloseFontFamilyDialog}
                  className="rounded bg-[#7367F0] px-5 py-2 text-sm text-white hover:border-[#7367F0] hover:bg-white hover:text-[#7367F0] focus:outline-none focus:ring-2 focus:ring-[#7367F0] dark:bg-gray-800 dark:text-white dark:hover:border-gray-800 dark:hover:bg-white dark:hover:text-gray-800 dark:focus:ring-gray-800"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog for Plan Upgrade */}
          <Dialog open={isPlan} onOpenChange={setIsPlan}>
            <DialogContent className="w-full max-w-[600px] rounded-lg bg-white p-8 shadow-xl dark:bg-gray-900">
              <DialogTitle className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                Upgrade Your Plan
              </DialogTitle>
              <DialogDescription className="text-md mb-4 text-gray-600 dark:text-gray-400">
                To access additional features and advanced options, please
                select an upgraded plan that best suits your needs.
              </DialogDescription>

              {/* Dialog Footer */}
              <DialogFooter className=" flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => setIsPlan(false)}
                  className="rounded-lg bg-gray-300 p-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleUpdatePlan}
                  className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-2 text-white hover:opacity-90 focus:ring-4 focus:ring-purple-300 dark:focus:ring-indigo-700"
                >
                  Upgrade
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Mode Toggle Button */}
          <div className="flex w-full justify-end">
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}