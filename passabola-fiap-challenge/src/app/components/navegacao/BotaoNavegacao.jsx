const { default: Link } = require("next/link");

const BotaoNavegacao = ({ logo, texto, diretorio }) => {
	return (
		<li className="hover:bg-principal-300 hover:cursor-pointer transition-all p-4 w-full">
			<Link href={diretorio} className="flex gap-2">
				<div>{logo}</div>
				<div>{texto}</div>
			</Link>
		</li>
	);
};

export default BotaoNavegacao;
