import "./propertyFallback.css";

function PropertyFallback() {
  return (
    <div className="bg-black relative flex justify-end">
      <button
        popoverTarget="menu"
        className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-500 text-sm"
      >
        Open Menu
      </button>
      <div
        id="menu"
        popover="auto"
        className="bg-white/30 border border-white/30 w-max rounded-md text-sm *:px-3 *:py-1.5"
      >
        <div className="hover:bg-white/50 cursor-pointer">Menu 1</div>
        <div className="hover:bg-white/50 cursor-pointer">Menu Long 2</div>
        <div className="hover:bg-white/50 cursor-pointer">Menu Too Long3</div>
        <div className="hover:bg-white/50 cursor-pointer">
          Menu Toooooooo Much Looooooong 4
        </div>
      </div>
    </div>
  );
}

export default PropertyFallback;
