import { useRouter } from '@/routes/hooks';
import { Button } from '@/components/ui/button';
import { Payment, ColorColumns } from './ColorColumns';
import { DataTable } from './data-table';
import { getAllPlan } from '../../redux/action/pricingAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader';
import { getAllcolor } from '@/redux/action/colorAction';


export default function Color() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0); // Page index state
  const [pageSize, setPageSize] = useState(10);
const status=['active','inactive']
  useEffect(() => {
    // Fetch data when pageIndex or pageSize changes
    dispatch(getAllcolor('', pageIndex + 1, pageSize, status)); // Adjust API call for correct page
  }, [dispatch, pageIndex, pageSize]);

  const { allColors, loading } = useSelector((state: any) => state.color);

  const totalRecords = allColors?.total || 0;
  const totalPages = Math.ceil(totalRecords / pageSize);
  return (
    <div>
      <div className="container mx-auto py-10" style={{backgroundColor:'white',marginTop:'3%',borderRadius:'14px'}}>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader />
            {/* Alternatively, you could use a spinner component here */}
          </div>
        ) : (
          <DataTable
            columns={ColorColumns({ pageIndex })}
            data={allColors?.notesBgColors || []}
            pageIndex={pageIndex} // Pass pageIndex to DataTable
            pageSize={pageSize} // Pass pageSize to DataTable
            setPageIndex={setPageIndex} // Provide setter for pageIndex
            setPageSize={setPageSize}
            totalPages={totalPages} // Pass totalPages to DataTable
            totalRecords={totalRecords} // Pass totalRecords
          />
        )}
      </div>
    </div>
  );
}
