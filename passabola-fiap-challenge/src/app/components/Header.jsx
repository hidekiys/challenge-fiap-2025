import { Bell } from "lucide-react";

const Header = () => {
	return (
		<header className="w-full h-12 bg-gradient-to-r from-pink-400 to-pink-200 flex py-2 px-6 justify-between align-middle">
			<a href="/">
				<img src="/img/logo-branca.png" className="w-full h-full" alt="" />
			</a>
			<div className="rounded-lg bg-white w-8 h-8 p-2 flex justify-center align-middle">
				<Bell color="#EE4D9B" className="w-full  h-full" />
			</div>
		</header>
	);
};
export default Header;
