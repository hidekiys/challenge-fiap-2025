import { Home, Joystick, LoaderPinwheel, Shirt, User } from "lucide-react";
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
		{
			elemento: <User className={btnClass} />,
			texto: "perfil",
			diretorio: "/perfil",
		},
	];

	return (
		<nav className="fixed h-screen left-0 top-12 flex w-48 pt-5 shadow">
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
