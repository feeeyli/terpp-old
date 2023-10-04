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
import { SearchResults } from "./@types/Video";
import { Video } from "./Video";

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
	const [activeTab, setActiveTab] = useState<"search" | "link">("link");
	const [searchResult, setSearchResult] = useState<SearchResults>();

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

	const basic = (
		<>
			<div className="w-full">
				<input
					type="text"
					className="mb-4 w-full sm:w-96 border-2 border-zinc-200 outline-none bg-zinc-100 px-3 py-2 rounded-md ring-pink-400 ring-offset-2 focus:ring-2 placeholder:text-zinc-400"
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
		</>
	);

	const handleSearch = () => {
		if (!urlInputRef.current?.value) return;

		setIsSearching(true);

		const options = {
			method: "GET",
			url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
			params: { q: urlInputRef.current.value },
			headers: {
				"X-RapidAPI-Key":
					"3e82b4b5aemsh6e0735361837025p1e67a2jsne58c9bf1f8c8",
				"X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
			},
		};

		axios<SearchResults>(options)
			.then((res) => {
				// console.log(
				// 	res.data.items.map((vi) => ({
				// 		title: vi.title,
				// 		author: vi.author.name,
				// 		duration: vi.duration,
				// 		url: vi.url,
				// 	}))
				// );
				console.log(res.data);
				setSearchResult(res.data);
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsSearching(false);
			});
	};

	const withSearch = (
		<>
			<div className="w-full">
				<input
					type="text"
					className="mb-4 w-full sm:w-96 border-2 border-zinc-200 outline-none bg-zinc-100 px-3 py-2 rounded-md ring-pink-400 ring-offset-2 focus:ring-2 placeholder:text-zinc-400"
					placeholder="Busque pela musica."
					ref={urlInputRef}
				/>
				<div className="flex gap-2 flex-1">
					<button
						className="px-3 py-2 rounded-md bg-amber-300 text-amber-950 flex-1 flex justify-center gap-2"
						onClick={handleSearch}
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
				{searchResult && (
					<ul className="sm:h-96 h-full overflow-y-scroll mt-8 space-y-6">
						<h2 className="text-center text-lg">
							Resultado da busca
						</h2>
						{searchResult.videos.map((video, i) => {
							if (i > 25) return;

							return <Video key={i} video={video} />;
						})}
						{/* <pre>{JSON.stringify(searchResult, null, 2)}</pre> */}
					</ul>
				)}
			</div>
		</>
	);

	const tabActiveClass = "border-b";

	return (
		<div className="font-normal w-screen h-screen grid sm:place-content-center bg-gradient-to-tl from-pink-300 via-rose-300 to-purple-300">
			<main className="overflow-auto p-4 py-8 sm:p-12 bg-zinc-50 max-h-screen h-screen sm:h-min flex flex-col items-center sm:rounded-md w-screen sm:w-min">
				<h1 className="font-light text-3xl tracking-widest mb-10 flex items-center gap-2">
					TERPP <MusicNotes size={32} weight="thin" />
				</h1>
				<div className="flex w-full mb-6">
					<button
						className={`flex-1 border-b-pink-300 ${
							activeTab === "search" ? tabActiveClass : ""
						}`}
						onClick={() => setActiveTab("search")}
					>
						Via Busca
					</button>
					<button
						className={`flex-1 border-b-pink-300 ${
							activeTab === "link" ? tabActiveClass : ""
						}`}
						onClick={() => setActiveTab("link")}
					>
						Via Link
					</button>
				</div>
				{activeTab === "link" && basic}
				{activeTab === "search" && withSearch}
			</main>
		</div>
	);
}

export default App;
