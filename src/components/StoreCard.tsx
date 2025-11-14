interface Props {
  name: string;
  image: string;
}

const StoreCard = ({ name, image }: Props) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
      <img className="w-full h-24 object-contain" src={image} alt={name} />
      <h3 className="text-center mt-3 font-semibold">{name}</h3>
    </div>
  );
};

export default StoreCard;
