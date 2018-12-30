class FetchData extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).innerHTML = `
      <div id="list"></div>
  `;
  }

  async connectedCallback() {
    const list = this.shadowRoot.querySelector("#list");

    const response = await fetch("http://localhost:3003/posts").then(res =>
      res.json()
    );

    response.forEach(({ title, body, image }) => {
      const item = document.createElement("item");
      item.innerHTML = `
      <div><img src=${image} /></div>
      <h3>${title}</h3>
      <p>${body}</p>
    `;
      list.appendChild(item);
    });
  }
}

customElements.define("fetch-data-list", FetchData);
