"use client";

import { authenticate } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { status } from "@/app/lib/definitions";
import {useForm, SubmitHandler} from "react-hook-form";
import { loginSchema } from "@/app/lib/schema";

export default function LoginForm() {
  const router = useRouter();
  var status: status;
  const {register, handleSubmit, formState} = useForm<loginSchema>({
    mode: "onChange"
  })
  const onSubmit: SubmitHandler<loginSchema> = async (data: loginSchema) => {

    const email = data.email
    const password = data.password
    try {
      status = await authenticate(email, password);
      if (status === "success") {
        toast.success("ログインしました");
        router.push("/");
      } else if (status === "emailNotVerified") {
        toast.warning("メールアドレスが認証されていません");
        router.push("/login/not-verified?email=" + email);
      } else {
        toast.error("ログインに失敗しました");
      }
    } catch (error: any) {
      toast.error("ログインに失敗しました");
    }
  }
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-6">
        <label htmlFor="email" className="block text-base font-bold mb-2">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "メールアドレスを入力してください" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        {formState.errors.email && (
          <p className="text-red-500 text-xs italic mb-3">{formState.errors.email.message}</p>
        )}
        <label htmlFor="password" className="block text-base font-bold mb-2">
          パスワード
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", { required: "パスワードを入力してください" })}
        />
        {formState.errors.password && (
          <p className="text-red-500 text-xs italic mb-3">{formState.errors.password.message}</p>
        )}
        <button
          name="submitButton"
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          disabled={!formState.isValid}
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
