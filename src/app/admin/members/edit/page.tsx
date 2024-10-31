"use client"

import { UserEditForm } from "@/app/components/forms/UserEditForm";
import { useSearchParams } from "next/navigation";

export default function userEditPage() {

    const searchParams = useSearchParams();
    const username = searchParams.get("id") ?? ""; // url 쿼리에서 id값 가져오기

    if (username !== "") {
    return <UserEditForm username={username} />;
    }

    else if (username === ""){
        alert("정보를 불러오지 못했습니다. 다시 시도해주세요.")
        window.location.href = "/admin/members";
    }
}