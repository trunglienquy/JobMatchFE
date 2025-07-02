'use client';

import userApis from "@/apis/user";
import { REGEX } from "@/constants/common";
import { messageErrors } from "@/constants/messages";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";


import { routes } from "@/constants/routes";
import RegisterAlert from "./register-alert";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";

const registerFormRules = yup.object().shape({
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
    phoneNumber: yup
      .string()
      .trim()
      .required(messageErrors.FORM.AUTH.phoneNumberRequired)
      .matches(REGEX.phoneNumber, messageErrors.FORM.AUTH.phoneNumberInvalid),
    fullname: yup
      .string()
      .trim()
      .required(messageErrors.FORM.AUTH.fullnameRequired)
      .min(2, messageErrors.FORM.AUTH.fullnameInvalid)
      .max(50, messageErrors.FORM.AUTH.fullnameInvalid),
});

export type RegisterFormData = yup.InferType<typeof registerFormRules>  // Optional field for role, if needed

function RegisterForm() {
  const [errorFromServer, setErrorFromServer] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      phoneNumber: '',
      fullname: '',
    },
    resolver: yupResolver(registerFormRules),
  });

  const onSubmit = async (values: RegisterFormData) => {
    setErrorFromServer('');
    try {
      const response = await userApis.register({ ...values, role: 'CANDIDATE' });
      if (response.success) {
        window.location.href = routes.home;
      } else {
        setErrorFromServer(response.message || '');
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <form
      className="w-[30rem] space-y-6"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterAlert error={errorFromServer} />
      <div>
        <label htmlFor="fullname">Full Name</label>
        <Controller
          name="fullname"
          control={control}
          render={({ field: {name, value, onChange} }) => (
            <Input
              error={!!errors.fullname?.message}
              name={name}
              value={value}
              onChange={onChange}
              id='fullname'
              maxLength={191}
              autoComplete='off'
              autoFocus
            />
          )}
        />
        <p className='text-red-500 text-[1.2rem]'>{errors?.fullname?.message}</p>
      </div>
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
        <p className='text-red-500 text-[1.2rem]'>{errors?.email?.message}</p>
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: {name, value, onChange} }) => (
            <Input
              error={!!errors.phoneNumber?.message}
              name={name}
              value={value}
              onChange={onChange}
              id='phoneNumber'
              maxLength={191}
              autoComplete='off'
            />
          )}
        />
        <p className='text-red-500 text-[1.2rem]'>{errors?.phoneNumber?.message}</p>
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
        <p className='text-red-500 text-[1.2rem]'>{errors?.password?.message}</p>
      </div>
      <div className='mb-6'>
        <Button type='submit' disabled={isSubmitting} className='w-full bg-sky-500 text-white hover:bg-sky-600 focus:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'>
          {isSubmitting ? <Loading className='text-black' /> : 'Đăng ký'}
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;