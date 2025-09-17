import Link from "next/link";

const Noticia = ({ titulo, lide, tipo, id }) => {
	return (
		<li>
			<Link
				href={`/noticias?id=${id}`}
				className="shadow p-3 rounded-2xl flex justify-between hover:scale-[101%] transition-all"
			>
				<div className="flex flex-col">
					<h1 className="text-xl font-bold">{titulo}</h1>
					<h2>{lide}</h2>
				</div>
				<p className="self-end text-principal-600">{tipo}</p>
			</Link>
		</li>
	);
};

export default Noticia;
