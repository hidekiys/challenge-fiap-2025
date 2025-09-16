import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Navegacao from "./components/navegacao/Navegacao";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Passa a bola",
	description: "Site de comunidade para o futebol feminino",
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-br">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				<div className="flex w-full h-full sticky">
					<Navegacao />
					<div>{children}</div>
				</div>
			</body>
		</html>
	);
}
