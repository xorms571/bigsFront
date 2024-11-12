import Button from "./Button";

type UserInfoProps = {
  handleLogout: () => void;
};
const UserInfo = ({ handleLogout }: UserInfoProps) => {
  let username;
  let email;
  if (typeof window !== "undefined") {
    username = localStorage.getItem("username");
    email = localStorage.getItem("email");
  }
  return (
    <div className="bg-white userInfo w-full max-w-80 h-fit border border-black rounded-md p-4 text-end">
      <div className="text-start mb-2 flex justify-between items-start">
        <h2>회원정보</h2>
        <Button text="로그아웃" onClick={handleLogout} />
      </div>
      <p>어서오세요, {username}님</p>
      <p>{email}</p>
    </div>
  );
};

export default UserInfo;
