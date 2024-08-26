"use client";

import { createUser } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sendVerificationEmail } from "@/app/lib/userActions";
import {useForm, SubmitHandler} from "react-hook-form";
import { registerSchema } from "@/app/lib/schema";

export default function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState, getValues } = useForm<registerSchema>({
    mode: "onChange"
  });
  const onSubmit: SubmitHandler<registerSchema> = async (data: registerSchema) => {
    try {
      await createUser(
        data.name,
        data.email,
        data.password,
        data.passwordConfirm
      )
      await sendVerificationEmail(data.email)
     router.push("/register/success?email=" + data.email);
    } catch (error: any) {
      toast.error("登録に失敗しました")
    }
  }
  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   form.submitButton.disabled = true;
  //   try {
  //     await createUser(
  //       form.userName.value,
  //       form.email.value,
  //       form.password.value,
  //       form.passwordConfirm.value,
  //     );
  //     await sendVerificationEmail(form.email.value);
  //     router.push("/register/success?email=" + form.email.value);
  //   } catch (error: any) {
  //     toast.error("登録に失敗しました");
  //     form.submitButton.disabled = false;
  //   }
  // }
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-md bg-white p-6" onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-base font-bold mb-2" htmlFor="userName">
          名前
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="text"
          id="userName"
          {...register("name", { required: "名前を入力してください" , maxLength: {value: 8, message: "8文字以内で入力してください"}})}
        />
        <div className="text-red-500 text-xs italic mb-3">
          {formState.errors.name && formState.errors.name.message}
        </div>
        <label className="block text-base font-bold mb-2" htmlFor="email">
          メールアドレス
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="email"
          id="email"
          {...register("email", { required: "メールアドレスを入力してください" })}
        />
        {formState.errors.email && (
          <p className="text-red-500 text-xs italic mb-3">{formState.errors.email.message}</p>
        )}
        <label className="block text-base font-bold mb-2" htmlFor="password">
          パスワード
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="password"
          id="password"
          {...register("password", {required: "パスワードを入力してください", minLength: {value: 6, message: "パスワードは6文字以上で入力してください"}, maxLength: {value: 20, message: "パスワードは20文字以下で入力してください"}})}
        />
        {formState.errors.password && (
          <p className="text-red-500 text-xs italic mb-3">{formState.errors.password.message}</p>
        )}
        <label
          className="block text-base font-bold mb-2"
          htmlFor="passwordConfirm"
        >
          パスワード確認
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {required: "パスワードを入力してください", minLength: {value: 6, message: "パスワードは6文字以上で入力してください"}, maxLength: {value: 20, message: "パスワードは20文字以下で入力してください"}, 
            validate: (value) => {
              return (
                value === getValues("password") || "パスワードが一致しません"
              )
            }
          }, )}
        />
        {formState.errors.passwordConfirm && (
          <p className="text-red-500 text-xs italic mb-3">{formState.errors.passwordConfirm.message}</p>
        )}
        <button
          name="submitButton"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
          disabled={!formState.isValid}
        >
          登録
        </button>
      </form>
    </div>
  );
}
