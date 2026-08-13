import React from 'react';
import AuthImage from '@pages/AdministrationSystem/FunctionManagement/components/CmsModule/shimImage';


export const Image = ({ src }) => (
  <div style={{ padding: 10, textAlign: "center" }}>
    <AuthImage src={src || "https://via.placeholder.com/300x150"} alt="Block" customStyle={{ maxWidth: "100%", borderRadius: 4 }} />
  </div>
);