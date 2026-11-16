import React, { useState } from "react";
import type { CoffeeProduct } from "../types";
import { formatRupiah } from "../utils/format";
import Button from "./Button";

export interface ProductCardProps {
  product: CoffeeProduct;
  onAddToCart: (product: CoffeeProduct) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  isFavorite: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleFavorite, onDelete, isFavorite }) => {
  const [showDetail, setShowDetail] = useState(false);

  const getThumbClass = () => {
    if (product.kategori === "Alat Seduh") return "kategori-alat";
    const sangrai = product.tingkatSangrai.toLowerCase();
    if (product.kategori === "Bubuk") {
      if (sangrai.includes("dark")) return "bubuk-dark";
      if (sangrai.includes("light")) return "bubuk-light";
      return "kategori-bubuk";
    }
    if (sangrai.includes("light")) return "roast-light";
    if (sangrai.includes("dark")) return "roast-dark";
    return "roast-medium";
  };

  const thumbClass = getThumbClass();
  const isOutOfStock = product.stok <= 0;
  const isTool = product.kategori === "Alat Seduh";

  return (
    <article className={`card coffee-card product-card d-flex flex-column ${thumbClass}`} aria-labelledby={`product-${product.id}`}>
      <div className={`coffee-visual-thumb ${thumbClass}`}>
        <div className="coffee-pattern-overlay" aria-hidden="true"></div>
        <div className="thumb-caption position-relative z-1">
          <span className="thumb-caption-label">{isTool ? "Perlengkapan" : "Tingkat sangrai"}</span>
          <span className="thumb-caption-value">{isTool ? "Peralatan seduh" : product.tingkatSangrai}</span>
        </div>
      </div>

      <div className="card-body p-3 p-md-4 d-flex flex-column flex-grow-1 product-card-body">
        <div className="d-flex justify-content-between align-items-center gap-2 mb-3 flex-wrap">
          <div className="d-flex flex-wrap gap-2 align-items-center product-tags">
            <span className="badge badge-coffee-origin">{product.asal}</span>
            <span className="badge badge-coffee-category">{product.kategori}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleFavorite(product.id)}
            ariaLabel={isFavorite ? `Hapus ${product.nama} dari favorit` : `Tambahkan ${product.nama} ke favorit`}
            className={`favorite-button px-2 text-nowrap coffee-tap-target ${isFavorite ? "is-favorite" : ""}`}
          >
            {isFavorite ? "★ Favorit" : "☆ Favorit"}
          </Button>
        </div>

        <h3 id={`product-${product.id}`} className="product-name mb-1">
          {product.nama}
        </h3>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-1 product-meta">
          <div className="product-price">{formatRupiah(product.harga)}</div>
          <div className="small">
            {isOutOfStock ? (
              <span className="badge bg-danger text-white">Stok Habis</span>
            ) : (
              <span className="coffee-text-muted">
                Stok: <strong>{product.stok}</strong>
              </span>
            )}
          </div>
        </div>

        {showDetail && (
          <div className="product-detail p-3 mb-3 rounded-2">
            <p className="coffee-text-secondary small mb-2">{product.deskripsi}</p>
            {product.catatanRasa && (
              <div className="small tasting-notes">
                <strong>Catatan rasa:</strong> {product.catatanRasa}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-2 border-top border-light-subtle d-flex flex-column gap-2">
          <div className="d-flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowDetail((prev) => !prev)} className="w-50 text-nowrap coffee-tap-target px-1" ariaLabel={showDetail ? `Tutup detail ${product.nama}` : `Lihat detail ${product.nama}`}>
              {showDetail ? "Tutup detail" : "Lihat detail"}
            </Button>

            <Button variant="danger" size="sm" onClick={() => onDelete(product.id)} className="w-50 text-nowrap coffee-tap-target px-1" ariaLabel={`Hapus produk ${product.nama}`}>
              Hapus
            </Button>
          </div>

          <Button variant="primary" size="md" onClick={() => onAddToCart(product)} disabled={isOutOfStock} className="w-100 fw-semibold text-nowrap coffee-tap-target px-2" ariaLabel={`Tambah ${product.nama} ke keranjang`}>
            {isOutOfStock ? "Stok Habis" : "+ Tambah ke Keranjang"}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
