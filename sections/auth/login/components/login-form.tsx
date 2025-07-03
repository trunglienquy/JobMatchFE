'use client';

import userApis from "@/apis/user";
import { REGEX } from "@/constants/common";
import { messageErrors } from "@/constants/messages";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Cookies from 'js-cookie';


import { routes } from "@/constants/routes";
import LoginAlert from "./login-alert";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { toast } from "sonner";

import { STORAGE_KEY } from "@/constants/common";

const LoginFormRules = yup.object().shape({
  email: yup
      .string()
      .trim()
      .required(messageErrors.FORM.AUTH.emailRequired)
      .matches(REGEX.email, messageErrors.FORM.AUTH.emailAndPasswordIncorrect),
    password: yup
      .string()
      .trim()
      .required(messageErrors.FORM.AUTH.passwordRequired)
      .min(8, messageErrors.FORM.AUTH.passwordInvalid),
});

export type LoginFormData = yup.InferType<typeof LoginFormRules>  // Optional field for role, if needed

function LoginForm() {
  const [errorFromServer, setErrorFromServer] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginFormRules),
  });

  const onSubmit = async (values: LoginFormData) => {
    setErrorFromServer('');
    try {
      const response = await userApis.login(values);
      if (response.payload.success) {
        Cookies.set(STORAGE_KEY.EC_TOKEN, response.payload.data?.token,{
          secure: true,
          expires: 1/24,
          sameSite: 'Strict',
        })
        window.location.href = routes.home;
      } else {
        setErrorFromServer(response.payload.message || '');
      }
    } catch (error: any) {
      const errorMessage = error?.payload?.message || error?.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.';
      setErrorFromServer(errorMessage);
      toast.error(errorMessage);
    }
  }

  return (
    <form
      className="w-[50rem] space-y-3 h-screen]"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginAlert error={errorFromServer} />
      <div>
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field: {name, value, onChange} }) => (
            <Input
              error={!!errors.email?.message}
              name={name}
              value={value}
              onChange={onChange}
              id='email'
              maxLength={191}
              autoComplete='off'
            />
          )}
        />
        <p className='text-red-500 text-[1.5rem]'>{errors?.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field: {name, value, onChange} }) => (
            <Input
              type="password"
              error={!!errors.password?.message}
              name={name}
              value={value}
              onChange={onChange}
              id='password'
              maxLength={191}
              autoComplete='off'
            />
          )}
        />
        <p className='text-red-500 text-[1.5rem]'>{errors?.password?.message}</p>
      </div>
      <div className='mb-6'>
        <Button type='submit' disabled={isSubmitting} className='w-full bg-sky-500 text-white hover:bg-sky-600 focus:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 text-[1.5rem] mt-5 cursor-pointer'>
          {isSubmitting ? <Loading className='text-black' /> : 'Đăng ký'}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;