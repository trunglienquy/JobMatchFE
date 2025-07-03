'use client';

import RegisterForm from "./register-form";

function RegisterView() {
  return (
    <div className="flex flex-col items-center justify-center mt-[0.4rem]">
      <h1 className="text-[2rem] font-bold mb-6">Register</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterView;