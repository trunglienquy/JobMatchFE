type Props = {
  error: string;
};

function LoginAlert({ error }: Props) {
  if (!error) return null;
  return (
    <div className='mb-8 rounded-lg bg-red-50 border border-red-500 py-1 px-4'>
      <p className='mb-3 last:mb-0 text-[1.2rem] text-red-600'>{error}</p>
    </div>
  );
}

export default LoginAlert;
