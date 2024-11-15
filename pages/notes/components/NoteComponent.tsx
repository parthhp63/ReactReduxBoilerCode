// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllNotes, updateNote } from '@/redux/action/dashboardActions/noteAction';
// import Draggable from 'react-draggable';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// import { SketchPicker } from 'react-color';

// interface Note {
//   notePosition: { x: number; y: number };
//   _id: string;
//   title: string;
//   description: { blocks: { text: string }[] };
//   titleColor: string;
//   noteColor: string;
// }

// interface NotesProps {
//   activeTabId: string;
// }

// export const Notes: React.FC<NotesProps> = ({ activeTabId }) => {
//   const dispatch = useDispatch<any>();
//   const { allNotes } = useSelector((state: any) => state.note);
//   const [selectedNote, setSelectedNote] = useState<Note | null>(null);
//   const [notePositions, setNotePositions] = useState<{ [key: string]: { x: number; y: number } }>({});
//   useEffect(() => {
//     dispatch(getAllNotes(activeTabId, 1, 1000));
//   }, [dispatch, activeTabId]);

//   const handleDragStop = (e: any, data: any, noteId: string) => {
//     // Update the position state
//     setNotePositions((prev) => ({
//       ...prev,
//       [noteId]: { x: data.x, y: data.y },
//     }));
//     const bodyData = {
//       notePosition: { x: data.x, y: data.y },
//     };

//     // Optional: Dispatch an action to save the new position in the Redux store or API
//     dispatch(updateNote(noteId, bodyData));
//   };
//   useEffect(() => {
//     if (allNotes?.notes) {
//       const initialPositions = allNotes.notes.reduce((acc: any, note: Note) => {
//         acc[note._id] = note.notePosition;
//         return acc;
//       }, {});
//       setNotePositions(initialPositions);
//     }
//   }, [allNotes]);
//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//   {/* {allNotes?.notes?.map((note: Note) => (
//   <Draggable 
//     key={note._id} 
//     defaultPosition={note.notePosition}  
//     onStop={(e, data) => handleDragStop(e, data, note._id)}
//   >
//     <div className='w-4/5 '> 
    
//     <Dialog>
//         <DialogTrigger asChild>
//           <Card
//             className="cursor-pointer w-full "
//             onClick={() => setSelectedNote(note)}
            
        
//           >
//             <CardHeader className="flex justify-between  ">
//               <CardTitle  style={{ color: note.titleColor }}>
             
//                 <div className='justify-between flex'>
//                 {note.title}
                 
//                   <div className='  flex text-right'>
//                   <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="black">
//   <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/>
// </svg>
// <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="black">
//   <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"/>
// </svg>
// </div>

                 
//                     </div></CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm">
//                 {note.description.blocks[0].text.slice(0, 50)}...
//               </p>
//             </CardContent>
//           </Card>
//         </DialogTrigger>
//         {selectedNote && selectedNote._id === note._id && (
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>{selectedNote.title}</DialogTitle>
//               <DialogDescription>{selectedNote.description.blocks[0].text}</DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         )}
//       </Dialog>
//     </div>
    
 
//   </Draggable>
// ))} */}

// {allNotes?.notes?.map((note: Note) => {
//   // Format createdAt timestamp
//   const formattedTime = new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

//   return (
//     <Draggable 
//       key={note._id} 
//       defaultPosition={note.notePosition}  
//       onStop={(e, data) => handleDragStop(e, data, note._id)}
//     >
//       <div className="w-4/5">
//         <Dialog>
//           <DialogTrigger asChild>
//             <Card
//               className="cursor-pointer w-full"
//               onClick={() => setSelectedNote(note)}
//             >
//               <CardHeader className="flex justify-between">
//                 <CardTitle style={{ color: note.titleColor }}>
//                   <div className="flex justify-between">
//                     {note.title}
//                     <div className="flex items-center text-right -mt-1 space-x-2">
//                       <span className="text-sm text-black-500">{formattedTime}</span> {/* Display the formatted time here */}
//                       <Dialog>
//                     <DialogTrigger asChild>
//                       <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="black">
//                         <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/>
//                       </svg>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>SVG Dialog</DialogTitle>
//                         <DialogDescription>Content specific to the SVG click action.</DialogDescription>
//                       </DialogHeader>
//                     </DialogContent>
//                   </Dialog>
//                       <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="black">
//                         <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"/>
//                       </svg>
//                     </div>
//                   </div>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm">
//                   {note.description.blocks[0].text.slice(0, 50)}...
//                 </p>
//               </CardContent>
//             </Card>
//           </DialogTrigger>
//           {selectedNote && selectedNote._id === note._id && (
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>{selectedNote.title}</DialogTitle>
//                 <DialogDescription>{selectedNote.description.blocks[0].text}</DialogDescription>
//               </DialogHeader>
//             </DialogContent>
//           )}
//         </Dialog>
//       </div>
//     </Draggable>
//   );
// })}


//     </div>
//   );
// };



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getAllNotes, updateNote } from '@/redux/action/dashboardActions/noteAction';
import Draggable from 'react-draggable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Note {
  notePosition: { x: number; y: number };
  _id: string;
  title: string;
  description: { blocks: { text: string }[] };
  titleColor: string;
  noteColor: string;
  createdAt: string;
}

interface NotesProps {
  activeTabId: string;
}

export const Notes: React.FC<NotesProps> = ({ activeTabId }) => {
  const dispatch = useDispatch<any>();
  const { allNotes } = useSelector((state: any) => state.note);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notePositions, setNotePositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null); // State to control delete dialog visibility
  const [shareDialogOpen, setShareDialogOpen] = useState<string | null>(null); // State to control share dialog visibility
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    dispatch(getAllNotes(activeTabId, 1, 1000));
  }, [dispatch, activeTabId]);

  const handleDragStop = (e: any, data: any, noteId: string) => {
    setNotePositions((prev) => ({
      ...prev,
      [noteId]: { x: data.x, y: data.y },
    }));
    const bodyData = { notePosition: { x: data.x, y: data.y } };
    dispatch(updateNote(noteId, bodyData));
  };

  useEffect(() => {
    if (allNotes?.notes) {
      const initialPositions = allNotes.notes.reduce((acc: any, note: Note) => {
        acc[note._id] = note.notePosition;
        return acc;
      }, {});
      setNotePositions(initialPositions);
    }
  }, [allNotes]);

  const handleClose = () =>{
    // setDeleteBox(false);
    setDeleteDialogOpen(null);
    // setUpdatedPlan(false);
  } 

  const handleDeleteNote = (id) => {
    console.log('id', id);  
    console.log('deleteDialogOpen', deleteDialogOpen);
      dispatch(deleteNote(id)).then((response: any) => {
        if (response.success === true) {
          toast({
            description: response.message
          });

          setDeleteDialogOpen(null)
         
        }
        else {
          toast({
            description: response
          });

        }
      })
    }


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {allNotes?.notes?.map((note: Note) => {
        // const formattedTime = new Date(note?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const formattedDateTime = new Date(note?.createdAt).toLocaleString('en-GB', {
         
          day: '2-digit', // Day in two digits (e.g., "07")
          month: 'short', // Abbreviated month (e.g., "Nov")
          hour: '2-digit', // 2-digit hour (e.g., "05")
          minute: '2-digit', // 2-digit minute (e.g., "52")
          hour12: true, // 12-hour format (AM/PM)
        });
        return (
          <Draggable 
            key={note._id} 
            defaultPosition={note.notePosition}  
            onStop={(e, data) => handleDragStop(e, data, note._id)}
          >
            <div className="w-4/5">
              <Card
                className="cursor-pointer w-full"
                onClick={() => setSelectedNote(note)}
              >
                <CardHeader className="flex justify-between">
                  <CardTitle style={{ color: note.titleColor }}>
                    <div className="flex justify-between">
                      {note.title}
                      <div className="flex items-center text-right -mt-1 space-x-2">
                        <span className="text-sm text-black-500">{formattedDateTime}</span>

                        {/* Delete Icon - Opens delete dialog */}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="black"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteDialogOpen(note._id); // Open delete dialog
                          }}
                        >
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/>
                        </svg>

                        {/* Share Icon - Opens share dialog */}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="black"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShareDialogOpen(note._id); // Open share dialog
                          }}
                        >
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"/>
                        </svg>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {note.description.blocks[0].text.slice(0, 50)}...
                  </p>
                </CardContent>
              </Card>

              {/* Note Dialog */}
              {selectedNote && selectedNote._id === note._id && (
                <Dialog open={true} onOpenChange={() => setSelectedNote(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedNote.title}</DialogTitle>
                      <DialogDescription>{selectedNote.description.blocks[0].text}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}

              {/* Delete Dialog */}
              {deleteDialogOpen === note._id && (
                <Dialog open={true} onOpenChange={() => setDeleteDialogOpen(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Note</DialogTitle>
                      <DialogDescription>Are you sure you want to delete this note?</DialogDescription>
                      {/* Add the delete action button here */}
                      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
                <Button
                  onClick={() => handleDeleteNote(note._id)}
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
              )}

              {/* Share Dialog */}
              {shareDialogOpen === note._id && (
                <Dialog open={true} onOpenChange={() => setShareDialogOpen(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share Note</DialogTitle>
                      <DialogDescription>Share this note with others.</DialogDescription>
                      {/* Add the share action buttons here */}
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};
