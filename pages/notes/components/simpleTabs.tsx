import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Make sure these are from the correct package
import { Button } from '@/components/ui/button'; // Optional button component if needed

const SimpleTabs = () => {
  const [activeTabId, setActiveTabId] = useState('tab1'); // State to track the active tab

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTabId(tabId); // Set active tab on tab click
  };

  return (
    <div className="w-full">
      <Tabs
        value={activeTabId} // Controlled value for active tab
        onValueChange={handleTabChange} // Correct prop to handle tab change in ShadCN Tabs
        aria-label="Tabs Example"
        className="flex space-x-4"
      >
        <TabsList className="flex space-x-4">
          <TabsTrigger
            value="tab1" // The unique identifier for this tab
            className={`cursor-pointer rounded-none px-4 py-2 text-sm font-medium
              ${activeTabId === 'tab1' ? 'border-b-2 border-[#6C63FF] text-[#6C63FF]' : 'hover:bg-[#F4F4F9] hover:text-[#6C63FF]'}`}
          >
            Tab 1
          </TabsTrigger>
          <TabsTrigger
            value="tab2" // The unique identifier for this tab
            className={`cursor-pointer rounded-none px-4 py-2 text-sm font-medium
              ${activeTabId === 'tab2' ? 'border-b-2 border-[#6C63FF] text-[#6C63FF]' : 'hover:bg-[#F4F4F9] hover:text-[#6C63FF]'}`}
          >
            Tab 2
          </TabsTrigger>
          <TabsTrigger
            value="tab3" // The unique identifier for this tab
            className={`cursor-pointer rounded-none px-4 py-2 text-sm font-medium
              ${activeTabId === 'tab3' ? 'border-b-2 border-[#6C63FF] text-[#6C63FF]' : 'hover:bg-[#F4F4F9] hover:text-[#6C63FF]'}`}
          >
            Tab 3
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content for each tab */}
      <div className="mt-4">
        {activeTabId === 'tab1' && <div>Content for Tab 1</div>}
        {activeTabId === 'tab2' && <div>Content for Tab 2</div>}
        {activeTabId === 'tab3' && <div>Content for Tab 3</div>}
      </div>
    </div>
  );
};

export default SimpleTabs;
