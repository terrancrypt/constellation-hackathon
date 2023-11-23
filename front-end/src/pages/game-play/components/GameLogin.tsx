import {
  checkOwner,
  getTokenUri,
} from "@/services/contract-services/AccountNftServ";
import { message } from "antd";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { getAccount } from "wagmi/actions";

const GameLogin = () => {
  const [tokenId, setTokenId] = useState("");
  const { address } = getAccount();

  const handleTokenIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTokenId(event.target.value);
  };

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tokenId === "") {
      message.error("TokenId invalid!");
      return;
    }

    try {
      const owner = await checkOwner(tokenId);
      if (owner != address) {
        message.error("You are not the owner of this account!");
        return;
      }

      const tokenURI = await getTokenUri(tokenId);
    } catch (error) {}
  };

  return (
    <div className="absolute top-[20%] left-[10%] text-black bg-white bg-opacity-90 border-2 border-black">
      <div className="p-6">
        <h2 className="font-semibold text-xl">Welcome to Ether Echelon</h2>
        <span>Please login to play the game</span>
        <div>
          <form
            className="flex flex-col gap-2 mt-6"
            onSubmit={handleLoginSubmit}
          >
            <label htmlFor="tokenId">Your TokenId</label>
            <input
              className="border border-black"
              type="text"
              name="tokenId"
              value={tokenId}
              onChange={handleTokenIdChange}
            />
            <button type="submit" className="bg-orange-500 text-white rounded">
              Login
            </button>
          </form>
          <div className="mt-4 pt-2 border-t">
            <p>
              If you dont have an account, create one on the{" "}
              <Link href="/create-account" className="underline">
                create account page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLogin;