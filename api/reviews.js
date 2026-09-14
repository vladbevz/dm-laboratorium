import { head } from '@vercel/blob';

const BLOB_PATHNAME = 'google-reviews.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const blob = await head(BLOB_PATHNAME, { token });

    const fileRes = await fetch(blob.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!fileRes.ok) throw new Error(`blob fetch failed: ${fileRes.status}`);

    const data = await fileRes.json();
    return res.status(200).json(data);
  } catch (err) {
    // Not yet populated (first deploy, before the first cron run) or read failed.
    return res.status(200).json({ fetchedAt: null, rating: null, userRatingCount: null, googleMapsUri: null, reviews: [] });
  }
}
