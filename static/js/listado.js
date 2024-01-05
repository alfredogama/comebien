document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const loadMoreButton = document.getElementById('loadMore');
    let page = 1;
    let loading = false;

    const fetchFoods = async (pageNumber) => {
        try {
            const response = await fetch(`/api/listado/?page=${pageNumber}`);
            const data = await response.json();

            data.results.forEach(food => {
                const foodItem = createFoodItem(food);
                container.appendChild(foodItem);
            });

            loading = false;
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    const createFoodItem = (food) => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');

        const image = document.createElement('img');
        image.src = food.photo_1;

        const foodName = document.createElement('div');
        foodName.classList.add('food-name');
        const fecha = new Date(food.created_at);
        foodName.textContent = fecha.getDate();

        foodItem.appendChild(image);
        foodItem.appendChild(foodName);

        return foodItem;
    };

    const loadMore = () => {
        if (!loading) {
            loading = true;
            page += 1;
            fetchFoods(page);
        }
    };

    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadMore();
        }
    });

    // Initial load
    fetchFoods(page);
});