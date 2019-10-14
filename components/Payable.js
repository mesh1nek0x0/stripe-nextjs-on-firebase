import { useState, useEffect } from "react";

function Payable(props) {
  // use hooks
  const [source, setSource] = useState({ key: "card", last4: "0000" });
  const [sources, setSources] = useState([
    { key: "dummy", last4: "choose payment card" }
  ]);

  // useEffect like componetDidMount
  useEffect(() => {
    const result = [
      { key: "card1", last4: "4242" },
      { key: "card2", last4: "5252" }
    ];
    // 読み込み終わったら、選択肢に反映
    setSources(result);
    // 取得できた最初の支払い方法をデフォルトに
    setSource(result[0]);
  }, []);

  const handleCharge = event => {
    event.preventDefault();
    alert(`${source.last4}(${source.key})で${props.amount}円はらいます`);
  };

  const handleChange = event => {
    const currentSource = sources.find(
      source => source.key === event.target.value
    );
    setSource(currentSource);
  };
  return (
    <>
      <form onSubmit={handleCharge}>
        <select value={source.key} onChange={handleChange}>
          {sources.map(value => {
            return (
              <option key={value.key} value={value.key}>
                {value.last4}
              </option>
            );
          })}
        </select>
        <button type="submit">Buy Now</button>
      </form>
    </>
  );
}

export default Payable;
