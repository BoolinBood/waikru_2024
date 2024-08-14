import dynamic from "next/dynamic";
import React from "react";

const BadWordPage = dynamic(() => import("@/src/components/admin/BadwordPage"));

const page = () => {
  return <BadWordPage />;
};

export default page;
