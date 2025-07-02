type Props = {
  error: string;
};

function RegisterAlert({ error }: Props) {
  if (!error) return null;
  return (
    <div className='mb-8 rounded-lg bg-red-50 border border-red-500 py-6 px-4'>
      <p className='mb-3 last:mb-0 font-noto text-[1.2rem] text-red-600'>{error}</p>
    </div>
  );
}

export default RegisterAlert;
