import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";

export function Clear() {

  localStorage.clear();

  return (
    <main className="gap-16">
      <div className="flex w-full justify-center px-12">
        <Logo />
        <h1>Clear</h1>
        <ActionButton url="/" text="Volver al inicio" />
      </div>
    </main>
  );
}
