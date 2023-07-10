import {
	ClipboardText,
	DownloadSimple,
	MagnifyingGlass,
	MusicNotes,
	SpinnerGap,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { ytparse } from "./ytparse";
import axios from "axios";

type DlResultData = {
	link: string;
	title: string;
	progress: number;
	duration: number;
	status: string;
	msg: string;
};

function App() {
	const [dlResult, setDlResult] = useState<DlResultData>();
	const [isSearching, setIsSearching] = useState(false);

	const urlInputRef = useRef<HTMLInputElement>(null);

	const handleDownload = () => {
		if (!urlInputRef.current?.value) return;

		setIsSearching(true);

		const options = {
			method: "GET",
			url: "https://youtube-mp36.p.rapidapi.com/dl",
			params: { id: ytparse(urlInputRef.current?.value) },
			headers: {
				"X-RapidAPI-Key":
					"3e82b4b5aemsh6e0735361837025p1e67a2jsne58c9bf1f8c8",
				"X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
			},
		};

		axios(options)
			.then((res) => {
				setDlResult(res.data);
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsSearching(false);
			});
	};

	const handlePaste = async () => {
		const toPaste = await navigator.clipboard.readText();

		urlInputRef.current!.value = toPaste;
	};

	return (
		<div className="font-normal w-screen h-screen grid place-content-center bg-gradient-to-tl from-pink-300 via-rose-300 to-purple-300">
			<main className="p-12 bg-zinc-50 flex flex-col items-center rounded-md">
				<h1 className="font-light text-3xl tracking-widest mb-10 flex items-center gap-2">
					TERPP <MusicNotes size={32} weight="thin" />
				</h1>
				<div>
					<input
						type="text"
						className="mb-4 w-96 border-2 border-zinc-200 outline-none bg-zinc-100 px-3 py-2 rounded-md ring-pink-400 ring-offset-2 focus:ring-2 placeholder:text-zinc-400"
						placeholder="Insira o URL da musica."
						ref={urlInputRef}
					/>
					<div className="flex gap-2 flex-1">
						<button
							className="px-3 py-2 rounded-md bg-pink-300 text-pink-950 flex-1 flex justify-center gap-2"
							onClick={handlePaste}
						>
							<ClipboardText size={24} weight="light" />
							Colar
						</button>
						<button
							className="px-3 py-2 rounded-md bg-amber-300 text-amber-950 flex-1 flex justify-center gap-2"
							onClick={handleDownload}
						>
							{!isSearching && (
								<>
									<MagnifyingGlass size={24} weight="light" />{" "}
									Buscar
								</>
							)}
							{isSearching && (
								<>
									<SpinnerGap
										size={24}
										weight="light"
										className="animate-spin"
									/>{" "}
									Buscando
								</>
							)}
						</button>
					</div>
				</div>
				{dlResult?.link && (
					<a
						href={dlResult?.link}
						target="_blank"
						rel="noreferrer"
						className="w-full mt-4 px-3 py-2 rounded-md bg-green-300 text-green-950 flex-1 flex justify-center gap-2 max-w-96"
					>
						<DownloadSimple size={24} weight="light" />
						<span className="break-words">
							Baixar "{dlResult.title}"
						</span>
					</a>
				)}
			</main>
		</div>
	);
}

export default App;
