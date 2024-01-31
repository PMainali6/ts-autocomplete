/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./autocomplete.css";
import { useFetch } from "../hooks/useFetch";

type IProps = {
  label: string;
  placeholder: string;
  debounceWait: number;
  autocomplete: boolean;
  renderList: (
    args: any,
    activeIdx: number,
    setQuery: (args: string) => void,
    setActiveIdx: (args: number) => void,
    setData: (args: null | any[]) => void,
    setAutoComplete: (args: boolean) => void
  ) => React.ReactNode;
  ErrorComp: () => React.ReactNode;
  NoItemComp: () => React.ReactNode;
};

const AutoComplete = ({
  label,
  placeholder,
  ErrorComp,
  NoItemComp,
  renderList,
  debounceWait,
  autocomplete,
}: IProps) => {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isAutoComplete, setAutoComplete] = useState(() => autocomplete);
  const [data, setData, error] = useFetch(query, debounceWait, isAutoComplete);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key;
    setAutoComplete(true);
    if (data === null || data.length === 0) {
      return;
    }

    if (key === "Enter") {
      if (activeIdx === -1) return;

      const name = data[activeIdx].name;
      setQuery(name);
      setData(null);
      setActiveIdx(-1);
      setAutoComplete(false);
      return;
    }

    if (key === "ArrowDown") {
      if (activeIdx === data.length - 1) {
        setActiveIdx(0);
      } else {
        setActiveIdx((prev) => prev + 1);
      }
    } else if (key === "ArrowUp") {
      if (activeIdx === 0) {
        setActiveIdx(data?.length - 1);
      } else {
        setActiveIdx((prev) => prev - 1);
      }
    }
  };
  return (
    <>
      <label className="label" htmlFor="personName">
        {label}
      </label>
      <input
        className="input"
        id="personName"
        name="personName"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      />

      {data &&
        data.length > 0 &&
        renderList(
          data,
          activeIdx,
          setQuery,
          setActiveIdx,
          setData,
          setAutoComplete
        )}
      {error && ErrorComp()}
      {data && data.length === 0 && NoItemComp()}
    </>
  );
};

export default AutoComplete;
