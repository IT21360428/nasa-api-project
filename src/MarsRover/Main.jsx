import { useState } from "react";
import Footer from "./Footer";

export default function Main(props) {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  function handleToggleModal(data) {
    setCurrentData(data);
    setShowModal(!showModal);
  }

  const displayedData = data.slice(0, 9); // Only take the first 9 photos

  return (
    <div className="imgGrid">
      {displayedData.map((item, index) => (
        <div key={index} className="imgBox">
          <img
            src={item.img_src}
            alt={item.earth_date || 'bg-img'}
            className="bgImage"
          />
          <Footer data={item} handleToggleModal={() => handleToggleModal(item)} />
          
        </div>
      ))}
    </div>
  );
}
