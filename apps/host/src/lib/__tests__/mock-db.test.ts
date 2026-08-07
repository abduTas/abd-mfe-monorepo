import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "@/lib/mock-db";

describe("mock-db", () => {
  it("lists seeded products", () => {
    const products = listProducts();
    expect(products.length).toBeGreaterThanOrEqual(3);
    expect(products[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
    });
  });

  it("gets a product by id", () => {
    const product = getProductById("p_1");
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Analytics Pro");
  });

  it("returns null for unknown product id", () => {
    expect(getProductById("missing")).toBeNull();
  });

  it("creates a product with generated id and updatedAt", () => {
    const created = createProduct({
      name: "Test Widget",
      price: 25,
      inventory: 10,
      category: "Hardware",
    });

    expect(created.id).toMatch(/^p_/);
    expect(created.updatedAt).toEqual(expect.any(String));
    expect(getProductById(created.id)).toEqual(created);
  });

  it("updates an existing product", () => {
    const updated = updateProduct("p_2", { price: 59, inventory: 99 });

    expect(updated).not.toBeNull();
    expect(updated?.price).toBe(59);
    expect(updated?.inventory).toBe(99);
    expect(getProductById("p_2")?.price).toBe(59);
  });

  it("returns null when updating unknown product", () => {
    expect(updateProduct("missing", { price: 1 })).toBeNull();
  });

  it("deletes an existing product", () => {
    const created = createProduct({
      name: "Disposable",
      price: 5,
      inventory: 1,
      category: "Temp",
    });

    expect(deleteProduct(created.id)).toBe(true);
    expect(getProductById(created.id)).toBeNull();
  });

  it("returns false when deleting unknown product", () => {
    expect(deleteProduct("missing")).toBe(false);
  });
});
