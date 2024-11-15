
import { FontSizecolumns } from "./FontSizecolumns"
import { DataTable } from "./data-table"
import { getAllPlan } from '../../redux/action/pricingAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader';
import { getAllFontSize } from '@/redux/action/fontSizeAction';


export default function FontSize() {
  const dispatch = useDispatch<any>();
  const [pageIndex, setPageIndex] = useState(0); // Page index state
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    dispatch(getAllFontSize('', pageIndex + 1, pageSize,));
    dispatch(getAllPlan('', 1, 10));

  }, [dispatch, pageIndex, pageSize]);

  const { allFontSize, loading } = useSelector((state: any) => state.fontSize);
  const totalRecords = allFontSize?.total || 0;
  const totalPages = Math.ceil(totalRecords / pageSize);
  return (
    <div >
      <div className="container mx-auto py-10" style={{ backgroundColor: 'white', marginTop: '3%', borderRadius: '14px' }}>
        {/* {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          
          </div>
        ) : ( */}
          <DataTable 
          columns={FontSizecolumns({ pageIndex })} 
          data={allFontSize?.fontSizes || []} 
          pageIndex={pageIndex} // Pass pageIndex to DataTable
            pageSize={pageSize} // Pass pageSize to DataTable
            setPageIndex={setPageIndex} // Provide setter for pageIndex
            setPageSize={setPageSize}
            totalPages={totalPages} // Pass totalPages to DataTable
            totalRecords={totalRecords} 
            />
        {/* )} */}
      </div>

    </div>
  );
}
