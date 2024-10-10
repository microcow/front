'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';


let redirect = "";

export function ResultMessage({resultmessage}: any)  {
  
 if (!resultmessage) 
    return null;
 else
    if(resultmessage == "회원가입을 축하드립니다."){
        redirect = "/"
    }
    else redirect = "/signin"

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white text-center py-4 z-50">
      <div className="max-w-md mx-auto">
        <p className="mb-4">{resultmessage}</p>
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