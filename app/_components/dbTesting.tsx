"use client";
import { createNewUser, scanTable } from "./useDB";

export default function TestButton() {
  return (
    <>
      <button onClick={() => createNewUser("123", "hello world")}>
        Click me!
      </button>
    </>
  );
}
