// Select Dom El
const categoriesEl = document.getElementById("categories");
const articlesEl = document.getElementById("articles");
const categoryItemEl = document.getElementById("category-item");
const categoryNameEl = document.getElementById("category-name");
const modalEl = document.getElementById("modal");

// Get All Categories
const loadCategories = async () => {
  try {
    const categoriesUrl =
      "https://openapi.programming-hero.com/api/news/categories";

    const res = await fetch(categoriesUrl);
    const categories = await res.json();
    fetchCategories(categories);
  } catch (error) {
    alert("Failed to fetch Data");
    return;
  }
};

const fetchCategories = (categories) => {
  categories.data.news_category.sort((a, b) => b.category_id - a.category_id);
  categories.data.news_category.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<span onClick="handleCategoryFilter('${category.category_id}')" class="text-gray-600 cursor-pointer font-medium" href="#">
            ${category.category_name}
        </span>`;
    categoriesEl.appendChild(div);
  });
};

// Filter Data By Category
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
                                <i onclick="getDetails('${
                                  category._id
                                }')" class="fa-solid fa-arrow-right-long text-3xl text-indigo-900 cursor-pointer hidden md:block"></i>
                            </div>
                        </div>
                    </div>
    `;
    articlesEl.appendChild(div);
  });
};
const getDetails = async (newsId) => {
  const categoryUrl = `https://openapi.programming-hero.com/api/news/${newsId}`;

  const res = await fetch(categoryUrl);
  const category = await res.json();
  console.log(category.data[0]);
  const {
    thumbnail_url,
    title,
    details,
    author: { name, img, published_date },
    total_view
  } = category.data[0];
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full overflow-y-visible"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                <div class="px-4 py-3 text-right">
                  <div class="flex flex-row justify-between">
                                    <div class="flex flex-row">
                                      <div class="m-1 mr-2 w-12 h-12 flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
                                        <img class="rounded-full" src="${img}">
                                    </div>
                                    <div class="flex-col">
                                        <h2 class="text-base font-medium text-left">${name}</h2>
                                        <h3>${published_date.split(" ")[0]}</h3>
                                    </div>
                                    </div>
                                    <button type="button" class="px-4 py-0 bg-gray-500 text-white rounded hover:bg-gray-700"
                        onclick="toggleModal()"><i class="fas fa-times"></i></button>
                                </div>
                </div>
                    <div class="pt-4">
                        <div class="relative">
                        <img class="w-full h-60 mx-auto" src="${thumbnail_url}" alt="">
                        <span class="absolute views">${total_view}m views </span>
                        </div>
                        <h2 class="text-xl font-medium my-2">${title}</h2>
                        <p class="text-gray-700 font-normal mb-4">${details}</p>
                    </div>
                </div>
                
            </div>
        </div>`;

  modalEl.appendChild(div);
  toggleModal();
};
const toggleModal = () => {
  document.getElementById("modal").classList.toggle("hidden");
};
handleCategoryFilter("08");
loadCategories();
