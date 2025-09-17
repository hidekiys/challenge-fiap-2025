const { Check, X, CircleMinus } = require("lucide-react");

const TabelaCampeonato = ({ campeonato }) => {
	return (
		<div className="overflow-x-auto rounded-xl shadow">
			<table className="w-full text-center table-auto ">
				<thead className="bg-principal-300 text-gray-600 uppercase text-sm leading-normal">
					<tr>
						<th className="py-3 px-6 text-left">Clube</th>
						<th className="py-3 px-6">Pts</th>
						<th className="py-3 px-6">PJ</th>
						<th className="py-3 px-6">VIT</th>
						<th className="py-3 px-6">E</th>
						<th className="py-3 px-6">DER</th>
						<th className="py-3 px-6">GM</th>
						<th className="py-3 px-6">GC</th>
						<th className="py-3 px-6">SG</th>
						<th className="py-3 px-6">Últimas 5</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-light">
					{campeonato.length > 0 ? (
						campeonato.map((c, index) => {
							return (
								<tr
									key={index}
									className={`border-b border-gray-200 hover:bg-principal-300`}
								>
									<td className="py-3 px-6 text-left">{c.clube}</td>
									<td className="py-3 px-6">{c.pts}</td>
									<td className="py-3 px-6">{c.pj}</td>
									<td className="py-3 px-6">{c.vitorias}</td>
									<td className="py-3 px-6">{c.empates}</td>
									<td className="py-3 px-6">{c.derrotas}</td>
									<td className="py-3 px-6">{c.gm}</td>
									<td className="py-3 px-6">{c.gc}</td>
									<td className="py-3 px-6">{c.sg}</td>
									<td className="py-3 px-6 flex justify-center items-center gap-1">
										{c.ultimas_5.map((t, i) => {
											if (t === "vitoria") {
												return <Check key={i} />;
											} else if (t === "derrota") {
												return <X key={i} />;
											} else {
												return <CircleMinus key={i} />;
											}
										})}
									</td>
								</tr>
							);
						})
					) : (
						<tr key={1}>
							<td colSpan="10">Nenhum dado disponível.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TabelaCampeonato;
