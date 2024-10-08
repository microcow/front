'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';


let redirect = ""; // const로 변수 선언 시 재할당이 불가능

export function ResultMessage(resultmessage: any)  {
 if (!resultmessage.message) 
    return null;
 else
    if(resultmessage.message == ""){
        redirect = "/"
    }
    else redirect = "/signin"

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white text-center py-4 z-50">
      <div className="max-w-md mx-auto">
        <p className="mb-4">{resultmessage.message}</p>
        <Link href = {redirect}>
          <Button
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            확인
          </Button>
         </Link>
      </div>
    </div>
  );
}