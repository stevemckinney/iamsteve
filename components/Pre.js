const Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"];
  return (
    <pre {...props} className={"p-0"}>
      <div
        className={'code-header'}>
        {lang}
      </div>
      {children}
    </pre>
  );
}

export default Pre
