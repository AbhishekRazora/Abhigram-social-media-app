import { useGetUsers } from '@/lib/react-query/queriesAndMutations'

import UserCard from './UserCard'
import Loader from './Loader'

const RightSidebar = () => {
    const{data:creators,isPending}=useGetUsers(10)
  return (
    <div className='home-creators'>
      <h2 className='h3-bold text-left w-full'>Top Creators</h2>
      {isPending && !creators ? (
          <Loader />
        ) : (
          <ul className='flex flex-col'>
            <div className='w-1/2'>
            {creators?.documents.map((creator) => (
            //   <li key={creator?.$id} className='flex-1 min-w-[100px] w-1/2 gap-2 mt-3 '>
              <li key={creator?.$id} className=' flex-1 mt-3'>
                

                <UserCard user={creator} />
                
              </li>
            ))}
            </div>
          </ul>
        )}
    </div>
  )
}

export default RightSidebar
