import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // get user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {/* Only render username if available */}
        {user.username && (
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        )}
        {user.role && (
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
