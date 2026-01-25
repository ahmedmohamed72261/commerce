import { http } from "./http";

export type BannerType = "main" | "secondary";

const normalizeImages = (images: any): string[] => {
  if (!images) return [];
  if (Array.isArray(images)) {
    return images.map((img: any) => {
      if (typeof img === "string") return img.replace(/[`"']/g, "").trim();
      if (typeof img === "object" && img.imageUrl) return String(img.imageUrl).replace(/[`"']/g, "").trim();
      return "";
    }).filter(Boolean);
  }
  return [];
};

export const getBannersByType = async (bannerType: BannerType) => {
  const res = await http.get(`/banners`, { params: { bannerType } });
  const data = res.data?.data ?? res.data ?? [];
  return Array.isArray(data) ? data.map((b: any) => ({ ...b, images: normalizeImages(b.images) })) : [];
};

export const getBannerById = async (id: string) => {
  const res = await http.get(`/banners/${id}`);
  const data = res.data?.data ?? res.data;
  if (!data) return null;
  return { ...data, images: normalizeImages(data.images) };
};

export const createBanner = async (fd: FormData) => {
  const res = await http.post(`/banners/`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data?.data ?? res.data;
};

export const updateBanner = async (id: string, fd: FormData) => {
  const res = await http.put(`/banners/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data?.data ?? res.data;
};

export const addImageToBanner = async (id: string, file: File) => {
  const fd = new FormData();
  fd.append("images", file);
  const res = await http.put(`/banners/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data?.data ?? res.data;
};

export const deleteImageFromBanner = async (bannerId: string, imageId: string) => {
  const res = await http.delete(`/banners/${bannerId}/images/${imageId}`);
  return res.data?.data ?? res.data;
};

export const deleteBanner = async (id: string) => {
  try {
    const res = await http.delete(`/banners/${id}`);
    return res.data?.data ?? res.data;
  } catch (e) {
    // fallback for possible typo endpoint
    try {
      const res2 = await http.delete(`/banar/${id}`);
      return res2.data?.data ?? res2.data;
    } catch (e2) {
      throw e;
    }
  }
};
