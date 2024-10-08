import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../adminStore/authApi/authApiSlices";
import userReducer from "../adminStore/userApi/userApiSlice";
import userSellPropertyReducer  from "../userStore/sellPopertyApi/addPropertySlice";
import userBuyPropertyReducer  from "../userStore/buyPropertyApi/buyPropertySlices";
import listingTypeReducer  from "../adminStore/typesApi/listingTypes/listTypeApiSlices";
import propertyTypeReducer  from "../adminStore/typesApi/propertyTypes/propertyTypeSlices";
import propertySubTypeReducer  from "../adminStore/typesApi/propertySubTypes/propSubTypeSlices";
import propertyReducer from "../adminStore/propertyApi/propertyApiSlices";
import userAuthReducer from "../userStore/authApi/userAuthSlices";
import dashboardReducer from "../userStore/dashboardApi/dashboardSlices";
import adminDashReducer  from "../adminStore/dashboardApi/dashboardSlices";

export const store = configureStore({
  reducer: {
//Admin
    auth: authReducer,
    authUser: userAuthReducer,
    user: userReducer,
    propertyAdd : userSellPropertyReducer,
    propertyBuy: userBuyPropertyReducer,
    listingTypes: listingTypeReducer,
    propertyTypes: propertyTypeReducer,
    propertySubTypes: propertySubTypeReducer,
    property: propertyReducer,
    userDashBoard: dashboardReducer,
    adminDashboard:adminDashReducer
  },
});

