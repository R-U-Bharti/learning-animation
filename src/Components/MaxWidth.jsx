const MaxWidth = ({
  children,
  style = null,
  className = "",
  ref = null,
  id = "",
}) => {
  return (
    <>
      <div
        id={id}
        ref={ref}
        style={style}
        className={`flex justify-center w-screen ${className} p-5 lg:p-10`}
      >
        <div className="max-w-[1366px] w-full relative">{children}</div>
      </div>
    </>
  );
};

export default MaxWidth;
