import { DownloadSimple, SpinnerGap } from "@phosphor-icons/react";
import { Video as VideoType } from "./@types/Video";
import { useState } from "react";
import axios from "axios";
import { ytparse } from "./ytparse";

export function Video({ video }: { video: VideoType }) {
	const [dlResult, setDlResult] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const handleDownload = async () => {
		setIsSearching(true);

		const options = {
			method: "GET",
			url: "https://youtube-mp36.p.rapidapi.com/dl",
			params: { id: ytparse(video.url || "") },
			headers: {
				"X-RapidAPI-Key":
					"3e82b4b5aemsh6e0735361837025p1e67a2jsne58c9bf1f8c8",
				"X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
			},
		};

		let url = "";

		await axios<{ link: string }>(options)
			.then((res) => {
				url = res.data.link;
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsSearching(false);
			});

		const link = document.createElement("a");
		link.target = "_blank";
		link.rel = "noreferrer";
		link.href = url;
		document.body.appendChild(link);
		link.click();
	};

	return (
		<li className="flex gap-2">
			{video.bestThumbnail && (
				<img
					src={video.bestThumbnail.url || ""}
					alt={`Imagem do video "${video.title || "Desconhecido"}"`}
					className="h-16 rounded-md"
				/>
			)}
			<div>
				<span className="line-clamp-1">{video.title}</span>
				<div className="flex gap-3">
					{video.author && (
						<span className="text-xs line-clamp-1 text-pink-300">
							{video.author?.name}
						</span>
					)}
					{!video.author && "Desconhecido"}
					<span className="text-xs text-pink-500">
						{video.duration}
					</span>
				</div>
				<button
					className="flex bg-green-300 text-green-950 rounded-md items-center px-2 py-1 mt-2"
					onClick={handleDownload}
				>
					{!isSearching && (
						<>
							<DownloadSimple size={24} weight="light" /> Baixar
						</>
					)}
					{isSearching && (
						<>
							<SpinnerGap
								size={24}
								weight="light"
								className="animate-spin"
							/>{" "}
							Baixando
						</>
					)}
				</button>
			</div>
		</li>
	);
}
