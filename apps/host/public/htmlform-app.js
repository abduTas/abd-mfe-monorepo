(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setStatus(el, message, kind) {
    if (!el) return;
    el.textContent = message;
    el.className = "htmlform-status " + (kind || "");
  }

  async function loadProducts() {
    var tbody = qs("#products-table-body");
    var status = qs("#htmlform-status");
    if (!tbody) return;

    setStatus(status, "Loading table…", "is-loading");
    try {
      var res = await fetch("/api/products", { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("GET failed (" + res.status + ")");
      var products = await res.json();
      tbody.innerHTML = "";

      if (!Array.isArray(products) || products.length === 0) {
        var empty = document.createElement("tr");
        var td = document.createElement("td");
        td.colSpan = 6;
        td.className = "htmlform-empty";
        td.textContent = "No products yet. Create one with the form.";
        empty.appendChild(td);
        tbody.appendChild(empty);
      } else {
        products.forEach(function (p) {
          var tr = document.createElement("tr");
          tr.innerHTML =
            "<td>" +
            escapeHtml(p.id) +
            "</td><td>" +
            escapeHtml(p.name) +
            "</td><td>" +
            escapeHtml(String(p.price)) +
            "</td><td>" +
            escapeHtml(String(p.inventory)) +
            "</td><td>" +
            escapeHtml(p.category) +
            "</td><td>" +
            escapeHtml(p.updatedAt || "") +
            "</td>";
          tbody.appendChild(tr);
        });
      }

      setStatus(status, "Loaded " + products.length + " row(s).", "is-ok");
    } catch (e) {
      tbody.innerHTML = "";
      var errRow = document.createElement("tr");
      var errCell = document.createElement("td");
      errCell.colSpan = 6;
      errCell.className = "htmlform-empty";
      errCell.textContent = "Could not load products.";
      errRow.appendChild(errCell);
      tbody.appendChild(errRow);
      setStatus(status, "Load error: " + (e && e.message ? e.message : "unknown"), "is-error");
    }
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    var status = qs("#htmlform-status");
    var form = ev.target;
    var fd = new FormData(form);

    var payload = {
      name: String(fd.get("name") || "").trim(),
      price: Number(fd.get("price")),
      inventory: Number(fd.get("inventory")),
      category: String(fd.get("category") || "").trim(),
    };

    if (!payload.name) {
      setStatus(status, "Name is required.", "is-error");
      return;
    }

    setStatus(status, "Creating product…", "is-loading");

    try {
      var res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        var errBody = await res.text();
        throw new Error(errBody || "POST failed (" + res.status + ")");
      }
      form.reset();
      setStatus(status, "Created successfully.", "is-ok");
      await loadProducts();
    } catch (e) {
      setStatus(status, "Create error: " + (e && e.message ? e.message : "unknown"), "is-error");
    }
  }

  function init() {
    var form = qs("#product-html-form");
    if (form) form.addEventListener("submit", onSubmit);

    var refresh = qs("#htmlform-refresh");
    if (refresh)
      refresh.addEventListener("click", function () {
        loadProducts();
      });

    loadProducts();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
