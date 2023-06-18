export default function Close(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <line
        x1="4"
        y1="4"
        x2="12"
        y2="12"
        strokeWidth="2"
        stroke="currentColor"
      />
      <line
        x1="4"
        y1="12"
        x2="12"
        y2="4"
        strokeWidth="2"
        stroke="currentColor"
      />
    </svg>
  );
}
