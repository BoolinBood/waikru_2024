export const Spinner: React.FC = () => (
  <div
    className="lds-spinner"
    style={
      {
        "--spinner-width": "30px",
        "--spinner-height": "30px",
      } as React.CSSProperties
    }
  >
    {Array.from({ length: 12 }).map((_, index) => (
      <div key={index}></div>
    ))}
  </div>
);
