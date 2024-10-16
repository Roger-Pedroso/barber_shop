import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo à Barbearia</h1>
      <nav>
        <ul>
          <li>
            <Link href="/barbers">Ver Barbeiros</Link>
          </li>
          <li>
            <Link href="/services">Ver Serviços</Link>
          </li>
          <li>
            <Link href="/appointments">Agendar Serviço</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
