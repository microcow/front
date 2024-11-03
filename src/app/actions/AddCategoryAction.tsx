"use server";

import { AddCategoryService } from "../service/AddCategoryService";

/* 유저정보 업데이트 action */
export async function AddCategoryAction(prevState: any, formData: FormData) {

    // 등록 카테고리 불러오기
    const category: Category = {
        lgcategory: (formData.get("lgCategory") as string) || "null", 
      };

      if(category.lgcategory === "미선택" || category.lgcategory === "null"){
        category.level = "대분류"
      }
      else category.level = "소분류"

      if(category.level === "대분류"){
        category.lgcategory = (formData.get("categoryName") as string)
      }
      else category.smcategory = (formData.get("categoryName") as string)
    //

  const responseData = await AddCategoryService(category);
  
  // 서버응답 실패로직
  if (!responseData) {
    console.log('server error', '서버 응답 없음')
    return {
      ...prevState,
      message: "오류가 발생했습니다. 다시 시도해주세요.",
    };
  }

  // 서버작업 실패로직(서버에서 실패내용을 json으로 return)
  else if (responseData.message) {
    console.log('error', '서버 응답은 있지만 error발생')
    return {
      ...prevState,
      message: responseData.message,
    };
  }

  // 기대결과 return
  return {
    ...prevState,
    message: responseData,
  };
}
