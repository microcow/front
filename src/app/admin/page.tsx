"use client"

import CheckAuthAction from "../actions/CheckAuthAction"

export default async function AdminPage() {
  
  const CheckAuth = await CheckAuthAction();

  function nothaveauth() {
    alert("권한이 없습니다.");
    window.location.href = "/"; 
  }

    if (CheckAuth === "권한이 확인되었습니다."){
      return
    }

    else if (CheckAuth === "권한이 없습니다."){
    return nothaveauth;
  }
}