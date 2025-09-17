import { Home, Joystick, LoaderPinwheel, Shirt } from "lucide-react";
import BotaoNavegacao from "./BotaoNavegacao";

const Navegacao = () => {
	const btnClass = "w-full h-full";
	const paginas = [
		{
			elemento: <Home className={btnClass} />,
			texto: "página inicial",
			diretorio: "/",
		},
		{
			elemento: <LoaderPinwheel className={btnClass} />,
			texto: "jogos",
			diretorio: "/jogos",
		},
		{
			elemento: <Shirt className={btnClass} />,
			texto: "meu time",
			diretorio: "/meu-time",
		},
	];

	return (
		<nav className="flex w-[12%] h-screen pt-5 shadow">
			<ul className="w-full">
				{paginas.map((e, index) => {
					return (
						<BotaoNavegacao
							key={index}
							logo={e.elemento}
							diretorio={e.diretorio}
							texto={e.texto}
						/>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navegacao;
