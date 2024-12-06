import { Edit, Logo } from "../Icons";

export default function Header() {
  return (
    <header>
      <figure id='logo'>
        <Logo />
      </figure>
      <div className="title">
        <h1 contentEditable suppressContentEditableWarning={true}>My Task Board</h1>
        <p>Tasks to keep organised</p>
      </div>
      <figure id='editable'>
        <Edit />
      </figure>
    </header>
  )
}