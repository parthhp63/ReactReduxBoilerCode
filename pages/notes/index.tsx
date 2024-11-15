  import PageHead from '@/components/shared/page-head.jsx';
  import { NoteHeader } from './components/NoteHeader.js';

  import { Notes } from './components/NoteComponent.js';
  import { TabHeader } from './components/TabHeader.js';
  import { useState } from 'react';

  export default function NotesPage() {
    const [activeTabId, setActiveTabId] = useState<string>('');
    return (
      <>
        <PageHead title="Notes | App" />
        <div className="max-h-screen flex-1 space-y-4 p-4 pt-6 md:p-8">
        <NoteHeader activeTabId={activeTabId} />
        <Notes activeTabId={activeTabId} />
        <TabHeader  setActiveTabId={setActiveTabId} activeTabId={activeTabId}  />
        </div>
      </>
    );
  }
