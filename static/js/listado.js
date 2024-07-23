document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const loadMoreButton = document.getElementById('loadMore');
    let page = 1;
    let loading = false;
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const fetchFoods = async (pageNumber, year = '', month = '') => {
        try {
            let url = `/api/listado/?page=${pageNumber}`;
            if (year) {
                url += `&year=${year}`;
            }
            if (month) {
                url += `&month=${month}`;
            }

            const response = await fetch(url);
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
        image.src = food.foto_miniatura;

        const foodName = document.createElement('div');
        foodName.classList.add('food-name');

        var enlace = document.createElement("a");
        enlace.href = `/editar/?id=${food.id}`;
        const fecha = new Date(food.created_at);
        enlace.textContent = diasSemana[fecha.getDay()] + " - " + fecha.getDate();

        foodItem.appendChild(image);
        foodItem.appendChild(foodName);
        foodName.appendChild(enlace);

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

    document.getElementById('filterButton').addEventListener('click', function() {
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        page = 1;
        container.innerHTML = '';  // Limpiar el contenedor antes de cargar los datos filtrados
        fetchFoods(page, year, month);
    });
});
