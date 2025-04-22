import tick from "../../assets/bi-arrow-red.svg";

export const FilterPage = ({ title, items }) => (
  <div className="mb-4">
    <h3 className="text-base font-semibold mb-2">{title}</h3>
    <ul className="grid grid-cols-2 gap-y-2 text-sm">
      {items.map((item, index) => (
        <li key={index}>
          <a href={"#"} className="text-black-600 hover:underline transition">
            <img
              src={tick}
              alt=""
              className="w-4 h-4 mr-1 inline-block -rotate-90"
            />
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
