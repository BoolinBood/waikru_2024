export const Spinner: React.FC = () => (
    <div className="lds-spinner">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );