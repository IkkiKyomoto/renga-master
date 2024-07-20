import UserInfo from "@/app/ui/my-page/userInfo";
import DisplayMyRengas from "@/app/ui/my-page/displayMyRengas";

export default function Page({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  return (
    <div>
      <h1>マイ連歌</h1>
      <div>
        <UserInfo userId={params.userId} />
      </div>
      <div>
        <DisplayMyRengas />
      </div>
    </div>
  );
}
