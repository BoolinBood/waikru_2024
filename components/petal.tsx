import Image from "next/image";

const images = [
  "/assets/petal/desktop/1.svg",
  "/assets/petal/desktop/2.svg",
  "/assets/petal/desktop/3.svg",
  "/assets/petal/desktop/4.svg",
  "/assets/petal/desktop/5.svg",
  "/assets/petal/desktop/6.svg",
  "/assets/petal/desktop/7.svg",
  "/assets/petal/desktop/8.svg",
  "/assets/petal/desktop/9.svg",
  "/assets/petal/desktop/10.svg",
  "/assets/petal/desktop/11.svg",
  "/assets/petal/desktop/12.svg",
];

const Petal = () => {
  return (
    <div className="petal">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`petal-${index + 1}`}
          width={200}
          height={200}
        />
      ))}
    </div>
  );
};

export default React.memo(Petal);
