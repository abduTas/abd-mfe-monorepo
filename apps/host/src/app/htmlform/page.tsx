import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "HTML form + vanilla JS",
  description: "Plain HTML form, responsive card layout, and client-side fetch to /api/products.",
};

const HTMLFORM_CSS = `
  .htmlform-demo {
    --htmlform-card: #ffffff;
    --htmlform-border: #e2e8f0;
    --htmlform-muted: #64748b;
    --htmlform-accent: #0f172a;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (prefers-color-scheme: dark) {
    .htmlform-demo {
      --htmlform-card: #0f172a;
      --htmlform-border: #334155;
      --htmlform-muted: #94a3b8;
      --htmlform-accent: #f8fafc;
    }
  }

  .htmlform-demo h1 {
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 600;
    margin: 0 0 0.5rem;
    letter-spacing: -0.02em;
  }

  .htmlform-demo .htmlform-lead {
    margin: 0 0 1.5rem;
    font-size: 0.9rem;
    color: var(--htmlform-muted);
    max-width: 60ch;
  }

  .htmlform-demo .htmlform-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 900px) {
    .htmlform-demo .htmlform-grid {
      grid-template-columns: minmax(0, 22rem) minmax(0, 1fr);
      align-items: start;
    }
  }

  .htmlform-demo .htmlform-card {
    background: var(--htmlform-card);
    border: 1px solid var(--htmlform-border);
    border-radius: 0.75rem;
    padding: clamp(1rem, 3vw, 1.35rem);
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  }

  .htmlform-demo .htmlform-card h2 {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    font-weight: 600;
  }

  .htmlform-demo fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  .htmlform-demo legend {
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }

  .htmlform-demo .htmlform-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.85rem;
  }

  .htmlform-demo label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--htmlform-muted);
  }

  .htmlform-demo input,
  .htmlform-demo select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--htmlform-border);
    border-radius: 0.5rem;
    padding: 0.55rem 0.65rem;
    font-size: 0.9rem;
    background: transparent;
    color: inherit;
  }

  .htmlform-demo input:focus,
  .htmlform-demo select:focus {
    outline: 2px solid var(--htmlform-accent);
    outline-offset: 1px;
  }

  .htmlform-demo .htmlform-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  .htmlform-demo button {
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.55rem 0.9rem;
    border: 1px solid var(--htmlform-border);
    background: var(--htmlform-card);
    color: inherit;
  }

  .htmlform-demo button[type="submit"] {
    background: var(--htmlform-accent);
    color: var(--htmlform-card);
    border-color: var(--htmlform-accent);
  }

  .htmlform-demo .htmlform-status {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    min-height: 1.25em;
  }

  .htmlform-demo .htmlform-status.is-ok { color: #15803d; }
  .htmlform-demo .htmlform-status.is-error { color: #b91c1c; }
  .htmlform-demo .htmlform-status.is-loading { color: var(--htmlform-muted); }

  @media (prefers-color-scheme: dark) {
    .htmlform-demo .htmlform-status.is-ok { color: #4ade80; }
    .htmlform-demo .htmlform-status.is-error { color: #f87171; }
  }

  .htmlform-demo .htmlform-table-wrap {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid var(--htmlform-border);
    border-radius: 0.5rem;
  }

  .htmlform-demo table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;
    min-width: 520px;
  }

  .htmlform-demo th,
  .htmlform-demo td {
    text-align: left;
    padding: 0.55rem 0.65rem;
    border-bottom: 1px solid var(--htmlform-border);
    vertical-align: top;
  }

  .htmlform-demo thead th {
    font-weight: 600;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--htmlform-muted);
    background: color-mix(in srgb, var(--htmlform-card) 92%, var(--htmlform-border));
  }

  .htmlform-demo tbody tr:last-child td {
    border-bottom: 0;
  }

  .htmlform-demo td.htmlform-empty {
    text-align: center;
    color: var(--htmlform-muted);
    font-style: italic;
  }
`;

export default function HtmlFormPage() {
  return (
    <div className="htmlform-demo">
      <style dangerouslySetInnerHTML={{ __html: HTMLFORM_CSS }} />

      <h1>HTML form + vanilla JavaScript</h1>
      <p className="htmlform-lead">
        This page uses semantic HTML only (no React state for the form). A small script in{" "}
        <code>public/htmlform-app.js</code> calls <code>GET /api/products</code> to fill the table
        and <code>POST /api/products</code> on submit.
      </p>

      <div className="htmlform-grid">
        <article role="form" className="htmlform-card" aria-labelledby="product-form-label">
          <h2>Create product</h2>
          <form id="product-html-form" action="#" method="post">
            <fieldset>
              <legend>Product details</legend>

              <div className="htmlform-field">
                <label htmlFor="pf-name">Name</label>
                <input id="pf-name" name="name" type="text" required autoComplete="off" />
              </div>

              <div className="htmlform-field">
                <label htmlFor="pf-price">Price (USD)</label>
                <input
                  id="pf-price"
                  name="price"
                  type="number"
                  min="1"
                  step="1"
                  defaultValue="49"
                  required
                />
              </div>

              <div className="htmlform-field">
                <label htmlFor="pf-inventory">Inventory</label>
                <input
                  id="pf-inventory"
                  name="inventory"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="10"
                  required
                />
              </div>

              <div className="htmlform-field">
                <label htmlFor="pf-category">Category</label>
                <select id="pf-category" name="category" defaultValue="SaaS" required>
                  <option value="SaaS">SaaS</option>
                  <option value="Software">Software</option>
                  <option value="Data">Data</option>
                </select>
              </div>

              <div className="htmlform-actions">
                <button type="submit">Submit</button>
                <button id="htmlform-refresh" type="button">
                  Refresh table
                </button>
              </div>
            </fieldset>
          </form>

          <p id="htmlform-status" className="htmlform-status" aria-live="polite" />
        </article>

        <article className="htmlform-card">
          <h2>Products from API</h2>
          <div className="htmlform-table-wrap">
            <table id="products-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Inventory</th>
                  <th scope="col">Category</th>
                  <th scope="col">Updated</th>
                </tr>
              </thead>
              <tbody id="products-table-body" />
            </table>
          </div>
        </article>
      </div>

      <Script src="/htmlform-app.js" strategy="afterInteractive" />
    </div>
  );
}
