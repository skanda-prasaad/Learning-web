import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counterAtom";
export const App5 = () => {
  return (
    <>
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </>
  );
};

function Counter() {
  return (
    <>
      <CurentValue />
      <Increase />
      <Decrease />
    </>
  );
}

function CurentValue() {
  const count = useRecoilValue(counterAtom);
  return <div>{count}</div>;
}

function Increase() {
  const setCount = useRecoilState(counterAtom);
  function increase() {
    setCount((c) => c + 1);
  }
  return (
    <div>
      <button onClick={increase}>Increase</button>
    </div>
  );
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);
  function decrease() {
    setCount((c) => c - 1);
  }
  return (
    <div>
      <button onClick={decrease}>decrease</button>
    </div>
  );
}
