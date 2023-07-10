export interface SearchResults {
	items: Video[];
}

export interface Video {
	type?: string;
	title?: string;
	id?: string;
	url?: string;
	bestThumbnail?: Thumbnail;
	thumbnails?: Thumbnail[];
	isUpcoming?: boolean;
	upcoming?: null;
	isLive?: boolean;
	badges?: string[];
	author?: Author;
	description?: null;
	views?: number;
	duration?: string;
	uploadedAt?: string;
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
