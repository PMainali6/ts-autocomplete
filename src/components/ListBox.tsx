/* eslint-disable @typescript-eslint/no-explicit-any */
import "./listbox.css";

type IListProps = {
  items: any[];
  activeIdx: number;
  setQuery: (args: string) => void;
  setActiveIdx: (args: number) => void;
  setData: (args: null | any[]) => void;
  setAutoComplete: (args: boolean) => void;
};
const ListBox = ({
  items,
  activeIdx,
  setQuery,
  setActiveIdx,
  setData,
  setAutoComplete,
}: IListProps) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    // const idx = e.currentTarget.dataset.idx;
    const item = e.currentTarget.dataset.item || "";
    setQuery(item);
    setActiveIdx(-1);
    setData(null);
    setAutoComplete(false);
  };
  return (
    <ul className="listContainer">
      {items.map((item, idx) => (
        <li
          data-idx={idx}
          data-item={item.name}
          onClick={handleClick}
          className={activeIdx === idx ? "item active" : "item"}
          key={idx}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListBox;
