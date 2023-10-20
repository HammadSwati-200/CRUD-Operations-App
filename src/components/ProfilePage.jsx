import React from "react";
import Profile from "./Profile";
import ProfileTable from "./ProfileTable";
import IconBreadcrumbs from "./BreadCrumbs";

const ProfilePage = () => {
  return (
    <div>
      <div className="mt-2 ms-2">
        <IconBreadcrumbs />
      </div>
      <div className="mt-5 d-flex justify-content-around mb-5">
        <Profile />
        <ProfileTable />
      </div>
    </div>
  );
};

export default ProfilePage;
