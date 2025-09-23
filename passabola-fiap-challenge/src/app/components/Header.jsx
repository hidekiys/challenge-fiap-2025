import { Bell } from "lucide-react";
import Notificacoes from "./navegacao/Notificacoes";

const Header = () => {
	return (
		<header className="sticky top-0 w-full h-12 bg-gradient-to-r from-pink-400 to-pink-200 flex py-2 px-6 justify-between align-middle">
			<a href="/">
				<img src="/img/logo-branca.png" className="w-full h-full" alt="" />
			</a>
			<Notificacoes />
		</header>
	);
};
export default Header;
