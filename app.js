// Select Dom El
const categoriesEl = document.getElementById("categories");
const articlesEl = document.getElementById("articles");
const categoryItemEl = document.getElementById("category-item");
const categoryNameEl = document.getElementById("category-name");

// Get All Categories
const loadCategories = async () => {
  try {
    const categoriesUrl =
      "https://openapi.programming-hero.com/api/news/categories";

    const res = await fetch(categoriesUrl);
    const categories = await res.json();
    fetchCategories(categories);
  } catch (error) {
    alert("Failed to fetch Data")
    return
  }
};

const fetchCategories = (categories) => {
  categories.data.news_category.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<span onClick="handleCategoryFilter('${category.category_id}')" class="text-gray-600 cursor-pointer font-medium" href="#">
            ${category.category_name}
        </span>`;
    categoriesEl.appendChild(div);
  });
};

const handleCategoryFilter = async (categoryId) => {
  categoryNameEl.innerText = totalCategoryItem(categoryId);
  const categoriesUrl = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;

  const res = await fetch(categoriesUrl);
  const categories = await res.json();
  fetchBlogs(categories);
};

// Initial Blog Lists
const totalCategoryItem = (categoryId = "08") => {
  switch (categoryId) {
    case "01":
      return "Breaking News";
    case "02":
      return "Regular News";
    case "03":
      return "International News";
    case "04":
      return "Sports";
    case "05":
      return "Entertainment";
    case "06":
      return "Culture";
    case "07":
      return "Arts";
    case "08":
      return "All News";
    default:
      return "All News";
  }
};

const fetchBlogs = (categories) => {
  articlesEl.innerHTML = "";
  categoryItemEl.innerText = categories.data.length;
  totalCategoryItem(categories.data);

  if (categories.data.length <= 0) {
    articlesEl.innerHTML = `<div
    class="w-1/2 mt-32 mx-auto text-red-200 shadow-inner rounded p-3 bg-indigo-600"
  >
    <p class="text-center"><strong>Not Found! </strong>There is no blog founded.</p>
  </div>`;
    return;
  }
  categories.data.sort((a, b) => b.total_view - a.total_view);
  categories.data.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add("py-8", "px-8", "bg-gray-100", "w-full");
    div.innerHTML = `
      <div class="bg-white flex flex-col md:flex-row rounded-lg shadow-lg">
                        <img class="h-80 object-cover	 w-80" src="${
                          category.thumbnail_url
                        }"
                            alt=${category.title} class="rounded-t-lg w-1/3">
                        <div class="p-6 w-full md:w-2/3 flex flex-col justify-between">
                            <div>
                                <h2 class="font-bold mb-2 text-2xl text-purple-800">${
                                  category.title
                                }
                                </h2>
                                <p class="text-purple-700 mb-2">${category.details.slice(
                                  0,
                                  350
                                )}...
                                </p>
                            </div>
                            <div class="flex flex-row justify-between items-center">
                                <div class="flex flex-row">
                                    <div class="m-1 mr-2 w-12 h-12 flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
                                        <img class="rounded-full" src="${
                                          category?.author?.img
                                        }">
                                    </div>
                                    <div class="flex-col">
                                        <h2 class="text-base font-medium">${
                                          category?.author?.name || "No Name"
                                        }</h2>
                                        <h3>${
                                          category?.author?.published_date.split(
                                            " "
                                          )[0] || "No Date"
                                        }</h3>
                                    </div>
                                </div>
                                <div class="flex flex-row items-center">
                                    <i class="fa-solid fa-eye text-gray-600"></i>
                                    <p class="ml-2 text-gray-600 text-xl font-medium">${
                                      category?.total_view || 0
                                    }M</p>
                                </div>
                                <i class="fa-solid fa-arrow-right-long text-3xl text-indigo-900 cursor-pointer hidden md:block"></i>
                            </div>
                        </div>
                    </div>
    `;
    articlesEl.appendChild(div);
  });
};
handleCategoryFilter("08");
loadCategories();

// const items = [
//   { name: "Edward", value: 21 },
//   { name: "Sharpe", value: 37 },
//   { name: "And", value: 45 },
//   { name: "The", value: -12 },
//   { name: "Magnetic", value: 13 },
//   { name: "Zeros", value: 37 },
// ];

// // sort by value
// items.sort((a, b) => a.value - b.value);
// console.log(items);
