const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) =>
  layout(html` <h3>Pages</h3>
    <hr />
    <form method="GET" action="/wiki/search">
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </form>
    <hr />
    <ul class="list-unstyled">
      <ul>
        ${pages.map(
          (page) => html`<li>
            <a href="/wiki/${page.dataValues.slug}">${page.dataValues.title}</a>
          </li>`
        )}
      </ul>
    </ul>`);

// ${posts.map(post => html`
//     <div class='news-item'>
//       <p>
//         <span class="news-position">${post.id}. ▲</span>
//         <a href="/posts/${post.id}">${post.title}</a>
//         <small>(by ${post.name})</small>
//       </p>
//       <small class="news-info">
//         ${post.upvotes} upvotes | ${timeAgo(post.date)}
//       </small>
//     </div>`
//   )}
