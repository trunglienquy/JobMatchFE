type Props = {
  className?: string;
  size?: number;
};

function Loading({ className = 'text-primary', size = 18 }: Props) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='currentColor'
      viewBox='0 0 50 50'
      xmlSpace='preserve'
    >
      <path d='M43.935 25.145c0-10.318-8.364-18.683-18.683-18.683S6.569 14.827 6.569 25.145h4.068c0-8.071 6.543-14.615 14.615-14.615s14.615 6.543 14.615 14.615z'>
        <animateTransform
          attributeType='xml'
          attributeName='transform'
          type='rotate'
          from='0 25 25'
          to='360 25 25'
          dur='0.6s'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  );
}

export default Loading;
