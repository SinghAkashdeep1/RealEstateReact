import React from 'react'
import { Route, Routes } from "react-router-dom";
import List from '../pages/Admin/user/List'
import Add from '../pages/Admin/user/Add'
import Edit from '../pages/Admin/user/Edit'
import ListingTypes from '../pages/Admin/types/ListingTypes';
import PropertyTypes from '../pages/Admin/types/PropertyTypes';
import PropertySubTypes from '../pages/Admin/types/PropertySubTypes';
import PropList from '../pages/Admin/property/List';
import PropDetail from '../pages/Admin/property/Detail';

const Routing = () => {
  return (
   <>
    <Routes>
      {/* user */}
    <Route path="/admin/user/list" element={<List />} />
    <Route path="/admin/user/add" element={<Add />} />
    <Route path="/admin/user/edit/:id" element={<Edit />} />

      {/* Types */}
      <Route path="/admin/property/listing-types" element={<ListingTypes/>} />
      <Route path="/admin/property/property-types" element={<PropertyTypes/>} />
      <Route path="/admin/property/property-sub-types" element={<PropertySubTypes/>} />

       {/* Property */}
      <Route path="/admin/property/list" element={<PropList/>} />
      <Route path="/admin/property/detail/:id" element={<PropDetail/>} />
    </Routes>
   </>
  )
}

export default Routing