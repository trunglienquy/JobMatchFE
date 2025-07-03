'use client';

import LoginForm from "./login-form";

function LoginView() {
  return (
    <div className="flex flex-col items-center justify-center mt-[0.4rem]">
      <h1 className="text-[2rem] font-bold mb-6">Login</h1>
      <LoginForm />
    </div>
  );
}

export default LoginView;