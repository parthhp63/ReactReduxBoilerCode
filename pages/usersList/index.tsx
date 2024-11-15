
import { UsersListColumns } from "./UsersListColumns"
import { DataTable } from "./data-table"
import { getAllPlan } from '../../redux/action/pricingAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader';
import { getAllRoles, getAllUser } from "@/redux/action/userAction";


export default function UsersList() {
  const dispatch = useDispatch<any>();
  const [pageIndex, setPageIndex] = useState(0); // Page index state
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
      dispatch(getAllUser('', pageIndex + 1, pageSize));
      dispatch(getAllRoles())
  }, [dispatch, pageIndex + 1, pageSize]);

  const { allPlans,loading } = useSelector((state: any) => state.plan);
  const { allUsers } = useSelector((state: any) => state.user);
console.log(allUsers,'allUser');
  const totalRecords = allUsers?.total || 0;
  const totalPages = Math.ceil(totalRecords / pageSize);
  return (
    <div >
    <div className="container mx-auto py-10"  style={{backgroundColor:'white',marginTop:'3%',borderRadius:'14px'}}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* <Loader/> */}
            {/* Alternatively, you could use a spinner component here */}
          </div>
        ) : (
          <DataTable 
          columns={UsersListColumns} 
          data={allUsers?.users || []} 
          pageIndex={pageIndex} // Pass pageIndex to DataTable
          pageSize={pageSize} // Pass pageSize to DataTable
          setPageIndex={setPageIndex} // Provide setter for pageIndex
          setPageSize={setPageSize}
          totalPages={totalPages} // Pass totalPages to DataTable
          totalRecords={totalRecords}
          />
        )}
      </div>
      
    </div>
  );
}
