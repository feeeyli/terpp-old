export interface SearchResults {
	videos: Video[];
}

export interface Video {
	id?: string;
	title?: string;
	link?: string;
	thumbnail?: string;
	channel?: Channel;
	description?: string;
	views?: number;
	uploaded?: string;
	duration?: number;
	durationString?: string;
}

// {
// 	"id": "M0c04xfBtyc",
// 	"title": "Stray Kids 『Social Path (feat. LiSA)』 Music Video",
// 	"link": "https://youtu.be/M0c04xfBtyc",
// 	"thumbnail": "https://i.ytimg.com/vi/M0c04xfBtyc/hqdefault.jpg",
// 	"channel": {
// 			"id": "UCXhj2pPWvONXmvgHX5wllCA",
// 			"name": "Stray Kids Japan Official YouTube",
// 			"link": "https://www.youtube.com/@StrayKidsJapanOfficial",
// 			"handle": "@StrayKidsJapanOfficial",
// 			"verified": false,
// 			"thumbnail": "https://yt3.ggpht.com/NYNP9ohzzwoQwUfJF2RSkdJSyy1CjotudgwXQ4zJfCpEbfbZY5dHIZEEFgmyyaCSjSDCCbwe=s0?imgmax=0"
// 	},
// 	"description": "□2023年9月6日(水) Release JAPAN 1st EP『Social Path (feat. LiSA) / Super Bowl -Japanese ver.-』 初回生産限",
// 	"views": 17701171,
// 	"uploaded": "vor 1 Monat",
// 	"duration": 202,
// 	"durationString": "3:22"
// }

interface Channel {
	id?: string;
	name?: string;
	link?: string;
	handle?: string;
	verified?: boolean;
	thumbnail?: string;
}

interface Author {
	name?: string;
	channelID?: string;
	url?: string;
	bestAvatar?: Thumbnail;
	avatars?: Thumbnail[];
	ownerBadges?: string[];
	verified?: boolean;
}

interface Thumbnail {
	url?: string;
	width?: number;
	height?: number;
}
