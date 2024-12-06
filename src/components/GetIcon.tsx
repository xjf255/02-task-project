import { CLASSNAME_STATUS } from "../const";
import { Close, Done, Timer } from "../Icons";

interface Props {
  state: typeof CLASSNAME_STATUS[number]
}

export default function GetIcon({state}:Props) {
  return (
    <figure className="item__status ">
      {state === CLASSNAME_STATUS[0] && <Timer />}
      {state === CLASSNAME_STATUS[1] && <Done />}
      {state === CLASSNAME_STATUS[2] && <Close />}
    </figure>
  )
}