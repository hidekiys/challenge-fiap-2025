"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Navegacao from "./navegacao/Navegacao";

export default function AppLayout({ children, geistMono, geistSans }) {
	const pathname = usePathname();
	const showLayout = pathname !== "/login" && pathname !== "/registro";

	return (
		<>
			{showLayout ? (
				<>
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
					>
						<Header />
						<div className="w-full flex-1">
							<Navegacao />
							<div className="overflow-auto ml-48">{children}</div>
						</div>
					</body>
				</>
			) : (
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full overflow-hidden`}
				>
					<div className="flex w-full flex-1">{children}</div>
				</body>
			)}
		</>
	);
}
