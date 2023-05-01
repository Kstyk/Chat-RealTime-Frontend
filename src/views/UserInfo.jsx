function UserInfo({ user }) {
  return (
    <div>
      <h1 className="text-4xl mb-2">Hello, {user.username}</h1>
    </div>
  );
}

export default UserInfo;
