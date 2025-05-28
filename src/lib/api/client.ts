export const fetcher = async <T>(path: string): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_API;

  if (!baseUrl) {
    throw new Error("Terjadi Kesalahan");
  }

  const res = await fetch(`${baseUrl}/${path}.json`);

  if (!res.ok) {
    const message = `Masalah: ${res.status}`;
    throw new Error(message);
  }

  return res.json();
};
