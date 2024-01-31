/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import AutoComplete from "./components/AutoComplete";
import ListBox from "./components/ListBox";

function App() {
  return (
    <div className="wrapper">
      <AutoComplete
        label={"Enter Person Name"}
        placeholder={"Enter star wars character's name"}
        debounceWait={400}
        autocomplete
        renderList={(
          items: any[],
          activeIdx: number,
          setQuery: (args: string) => void,
          setActiveIdx: (args: number) => void,
          setData: (args: null | any[]) => void,
          setAutoComplete: (args: boolean) => void
        ) => (
          <ListBox
            items={items}
            activeIdx={activeIdx}
            setQuery={setQuery}
            setActiveIdx={setActiveIdx}
            setData={setData}
            setAutoComplete={setAutoComplete}
          />
        )}
        ErrorComp={() => <div>Something went wrong</div>}
        NoItemComp={() => <div>Sorry, no items found</div>}
      />
    </div>
  );
}

export default App;
