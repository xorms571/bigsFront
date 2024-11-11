type UserInfoProps = {
  handleLogout: () => void;
};
const UserInfo = ({ handleLogout }: UserInfoProps) => {
  return (
    <div className="bg-white w-full max-w-80 h-fit border border-black rounded-md p-4 text-end">
      <div className="text-start mb-5">
        <h2 className="mb-2">회원정보</h2>
        <p>어서오세요, {localStorage.getItem("username")}님</p>
        <p>{localStorage.getItem("email")}</p>
      </div>
      <button onClick={handleLogout} className="hover:shadow">
        로그아웃
      </button>
    </div>
  );
};

export default UserInfo;
