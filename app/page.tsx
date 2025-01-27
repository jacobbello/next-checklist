import Image from "next/image";
import Checklist from "./components/Checklist";

export default function Home() {
  return (
    <main className="p-24">
      <p>Checklist</p>
      <Checklist/>
    </main>
  );
}
