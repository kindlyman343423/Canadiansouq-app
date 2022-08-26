import Link from "next/link";
import React from "react";
import { IProduct } from "../types";
import Button from "./Button";
import { Bookmark } from "./icons";

interface Props {
  grid?: boolean;
  product: IProduct;
}

const Card = ({ grid, product }: Props) => (
  <div
    className={`bg-fff p-4 rounded-lg transition-shadow flex gap-4 shadow-black hover:shadow-2xl items-stretch snap-center
        ${grid ? "flex-row" : "flex-col w-[14rem]"}
      `}
  >
    <Link href={`/product/${product.id}`}>
      <div
        className={`flex items-center justify-center cursor-pointer ${
          !grid && "my-2"
        }`}
      >
        <img
          className="min-w-[6rem] w-48 h-48 object-cover"
          src={product.attributes.images![0]}
          alt={product.attributes.name}
        />
      </div>
    </Link>

    <div>
      <Link href={`/product/${product.id}`}>
        <div className="flex flex-col w-full cursor-pointer">
          <div
            className={`flex items-center justify-between ${
              grid ? "w-full" : "w-[12rem]"
            }`}
          >
            <div>
              <h2 className="text-base text-gray">
                {product.attributes.category}
              </h2>
            </div>
            <div className="flex items-center flex-col">
              {product.attributes.price !== product.attributes.cost && (
                <h4 className="text-sm text-gray line-through">
                  ${product.attributes.cost}
                </h4>
              )}
              <h3 className="text-black font-bold">
                ${product.attributes.price}
              </h3>
            </div>
          </div>

          <div className="flex-1">
            <h2
              className={`text-lg my-2 two-lines hover:underline ${
                grid && "font-semibold"
              }`}
            >
              {product.attributes.name}
            </h2>
            {grid && (
              <p className="text-gray text-base twolines">
                {product.attributes.description}
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="flex items-stretch justify-end gap-2 mt-2">
        <Button
          text="Add to Cart"
          pad={`p-2 ${grid ? "px-6" : "flex-1"}`}
          main
        />
        <Button text={<Bookmark />} sec pad="p-2" font="font-base" />
      </div>
    </div>
  </div>
);

export default Card;