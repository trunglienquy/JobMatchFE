'use client';

import RegisterForm from "./register-form";

function RegisterView() {
  return (
    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterView;