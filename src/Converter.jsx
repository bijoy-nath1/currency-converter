import { stringify } from "postcss";
import React, { useState, useEffect } from "react";

export default function Converter() {
  const [input1, setInput1] = useState(0);
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCountry1, setSelectedCountry1] = useState("AUD");
  const [selectedCountry2, setSelectedCountry2] = useState("");
  const [output, setoutput] = useState(null);

  async function fetchData() {
    try {
      const fetchedData = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_k6XcRKZzm1xhXxfnsNZDp9P7niIltyFJKf5mbxkG&base_currency=${selectedCountry1}`
      );
      const data = await fetchedData.json();
      setCurrencies(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedCountry1]);

  function handleClick() {
    setoutput(currencies.data[selectedCountry2] * input1);
  }
  console.log(selectedCountry1);

  return (
    <div className="h-screen w-full flex flex-wrap justify-center items-center">
      <div className="h-[60%] w-[25%]  border-2 border-solid border-black p-6">
        {loading ? (
          <p>Loading currencies...</p>
        ) : (
          <>
            <div className="h-[20%] w-full border-1 border-solid border-black flex my-3">
              <div className="h-full w-1/2">
                <label className="block m-3">from</label>
                <input
                  type="text"
                  placeholder="Give the amount"
                  className="border-2 border-solid border-black w-full pl-3 ml-2 py-2"
                  onChange={(e) => setInput1(e.target.value)}
                />
              </div>
              <div className="h-full w-1/2">
                <label className="mt-3">currency Type</label>
                <select
                  className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-2"
                  onChange={(e) => setSelectedCountry1(e.target.value)}
                >
                  {Object.keys(currencies.data).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="h-[20%] w-full border-1  border-solid border-black flex ">
              <div className="h-full w-1/2">
                <label className="block m-3">to</label>
                <input
                  type="text"
                  placeholder={output}
                  className="border-2 border-solid border-black w-full pl-3 ml-2 py-2"
                />
              </div>
              <div className="h-full w-1/2">
                <label className="mt-7">currency Type</label>
                <select
                  className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-2"
                  onChange={(e) => setSelectedCountry2(e.target.value)}
                >
                  {Object.keys(currencies.data).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="w-[100%] h-[8%] border-2 border-solid border-black mt-8"
              onClick={handleClick}
            >
              Convert
            </button>
          </>
        )}
      </div>
    </div>
  );
}
