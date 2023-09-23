import React from "react";

const htmlDecode = (content) => {
  let e = document.createElement("div");
  e.innerHTML = content;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

export const ProductCard = ({ product }) => {
  console.log("product", product);
  //<img src={`https://bus-com.ru/image/${selectedOption.image}`}></img>
  return (
    <div>
      <div className="product_wrapper">
        {product.image && (
          <div className="img">
            <img src={`https://bus-com.ru/image/${product.image}`}></img>
          </div>
        )}
        <div className="info">
          <div className="title">{product.name}</div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: htmlDecode(product.description),
            }}
          />
        </div>
        <div className="price">{product.price}</div>
      </div>
    </div>
  );
};
