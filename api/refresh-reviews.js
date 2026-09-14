import { put } from '@vercel/blob';

const BLOB_PATHNAME = 'google-reviews.json';
const PLACES_FIELD_MASK = 'displayName,rating,userRatingCount,googleMapsUri,reviews';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error('refresh-reviews: missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID');
    return res.status(500).json({ error: 'Google Places API not configured' });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': PLACES_FIELD_MASK,
      },
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('refresh-reviews: Places API error', response.status, errBody);
      return res.status(502).json({ error: 'Places API request failed' });
    }

    const place = await response.json();

    const payload = {
      fetchedAt: new Date().toISOString(),
      rating: place.rating ?? null,
      userRatingCount: place.userRatingCount ?? null,
      googleMapsUri: place.googleMapsUri ?? null,
      reviews: (place.reviews ?? []).map((r) => ({
        author: r.authorAttribution?.displayName ?? '',
        authorPhoto: r.authorAttribution?.photoUri ?? null,
        rating: r.rating ?? null,
        text: r.text?.text ?? '',
        languageCode: r.text?.languageCode ?? null,
        relativeTime: r.relativePublishTimeDescription ?? '',
        publishTime: r.publishTime ?? null,
      })),
    };

    await put(BLOB_PATHNAME, JSON.stringify(payload), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return res.status(200).json({ success: true, count: payload.reviews.length });
  } catch (err) {
    console.error('refresh-reviews: unexpected error', err);
    return res.status(500).json({ error: 'Failed to refresh reviews' });
  }
}
