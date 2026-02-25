import { NextResponse } from "next/server";

async function getChannelId(): Promise<string | null> {
  try {
    const res = await fetch("https://www.youtube.com/@jemartob.", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 86400 }, // cache 24h
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/\/(UC[a-zA-Z0-9_-]{22})/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const channelId = await getChannelId();
    if (!channelId) return NextResponse.json({ videos: [] });

    const rss = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } } // cache 1h
    );
    if (!rss.ok) return NextResponse.json({ videos: [] });

    const xml = await rss.text();
    const videoIds = [
      ...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g),
    ]
      .map((m) => m[1])
      .slice(0, 8);

    const videos = videoIds.map((id) => ({
      id,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }));

    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}
