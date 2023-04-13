export default function isValidUrl(str) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(str);
}
