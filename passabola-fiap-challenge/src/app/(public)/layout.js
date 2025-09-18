import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

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
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full overflow-hidden`}
			>
				<div className="flex w-full flex-1">{children}</div>
			</body>
		</html>
	);
}
