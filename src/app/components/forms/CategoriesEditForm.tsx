"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../custom/SubmitButton";
import { useEffect, useState, } from "react";
import { AddCategoryAction } from "@/app/actions/AddCategoryAction";
import { ReadlgCategoryService } from "@/app/service/CategoryService";

const INITIAL_STATE = {
  data: null,
};

export function CategoriesEditForm() {


    /** 카테고리 대분류 불러오기 */
    const [categoryList, setCategoryList] = useState<any>(null);

    useEffect(() => {
        async function fetchCategory() {
          try {
            const categoryResult = await ReadlgCategoryService();

            if (typeof categoryResult === 'string') {
              alert(categoryResult);
              window.location.href = "/signin";
              return;
          }
            else {
              setCategoryList(categoryResult);
          }
          } catch (error) {
              console.error("Error fetching user data:", error);
              alert("정보를 불러오지 못했습니다. 다시 로그인해주세요.");
              window.location.href = "/signin";
            }
        }   
        fetchCategory();
    }, []);
    //

    const [formState, formAction] = useFormState(AddCategoryAction,INITIAL_STATE);
  
    return(
    <form action={formAction} className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">카테고리 등록</h2>
      <div className="mb-4">
        <div className="block text-xs font-medium text-gray-400 mb-2">
            ※ 등록하려는 카테고리가 대분류일 경우, 대분류 선택을 하지마세요.
        </div>
        <label 
          className="block text-sm font-bold text-gray-700 mb-2"
          htmlFor="lgCategory"
          >
          대분류 선택
        </label>
        <select
          name="lgCategory"
          id="lgCategory"
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="미선택">미선택</option>
          {categoryList && categoryList.map((List: any)=> (
            <option key={List.code} value={List.lgcategory}>
              {List.lgcategory}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="categoryName" className="block text-sm font-bold text-gray-700 mb-2">
          카테고리명
        </label>
        <input
          type="text"
          name="categoryName"
          id="categoryName"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="카테고리명을 입력하세요"
        />
      </div>
      <SubmitButton 
      className="w-full rounded-md p-2 font-bold" 
      text={"저장"} 
      loadingText={"처리 중입니다."}/>
    </form>
  );
};
